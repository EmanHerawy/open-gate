contract;
mod data_structures;
mod interface;
mod events;
mod errors;

use std::{
    call_frames::msg_asset_id,
    constants::{
        BASE_ASSET_ID,
        ZERO_B256,
    },
    context::*,
    hash::*,
    token::*,
};

use ::data_structures::{Listing, State};
use ::interface::{ContractABI,CalleeTokenContract,RegistrationAbi};
use ::events::{ClaimedEvent,RequestedEvent};
use ::errors::{InitializationError, UserError};

// This contract should handle the relation between open source project creator and open source project contributors.
/// personas :
/// The core functionality is to enable  Creators to list thier github repos, set how the deposit that they will be paid , once the contributor create PR and close the issue , the contract release the payment to the contributor and mint DAO token to the contributor
storage {
    registration: ContractId = ContractId::from(ZERO_B256),
    token: ContractId = ContractId::from(ZERO_B256),
    state: State = State::NotInitialized,
    assigned_req_id: u64 = 0,
    counter: u64 = 0,
    creator_listings: StorageMap<Identity, Listing> = StorageMap {},
    //  github_to_creator_address: StorageMap<str,Identity>= StorageMap {},
    running_claims: StorageMap<u64, Identity> = StorageMap {},
    request_id_to_creator: StorageMap<u64, Identity> = StorageMap {},
    //   request_id_to_pr_url: StorageMap<u64,str>= StorageMap {},
    request_id_to_listing_id: StorageMap<u64, u64> = StorageMap {},
    used_requests: StorageMap<u64,bool>= StorageMap {},
    listing_id_to_creator: StorageMap<u64,Identity>= StorageMap {},
}

impl ContractABI for Contract{
    #[storage(read, write)]
    fn constructor(token: ContractId, registration: ContractId) {
  require(storage.state.read() == State::NotInitialized, InitializationError::CannotReinitialize);
        // Start the next message to be signed
        storage.state.write(State::Initialized);
        storage.token.write(token);
        storage.registration.write(registration);

    }
    #[storage(read, write), payable]
    fn list_repo(github_repo:str[1], payable_amount:u64){
        require(storage.state.read() == State::Initialized,InitializationError::CannotReinitialize);
        require(payable_amount > 0, UserError::AmountCannotBeZero);
       require(BASE_ASSET_ID == msg_asset_id(), UserError::IncorrectAssetSent);
        // sould join first 
        // call registration contract to check if the user is registered
        let registration = abi(RegistrationAbi, storage.registration.read().into());
        let is_registered = registration.is_project_creator_registered(msg_sender().unwrap());
        require(is_registered == true, UserError::NotRegistered);
        storage.counter.write(storage.counter.read() + 1);
        let new_listing = Listing{
           listing_id: storage.counter.read(),
            github_repo: github_repo,
            current_deposit: msg_amount(),
            payable_amount:payable_amount
        };

        storage.creator_listings.insert(msg_sender().unwrap(), new_listing);
        storage.listing_id_to_creator.insert(storage.counter.read(), msg_sender().unwrap());
        // storage.github_to_creator_address.insert(github_repo, msg_sender().unwrap());
      }
    #[storage(read, write)]
    fn claim(listing_id:u64, pr_num:u64){
        let creator = storage.listing_id_to_creator.get(listing_id).read();
        let listing=storage.creator_listings.get(creator).read();
        let remaining_fund = listing.current_deposit;
        let payable_amount = listing.payable_amount;
        require(remaining_fund >= payable_amount, UserError::InsufficientBalance);
        storage.assigned_req_id.write(storage.assigned_req_id.read() + 1);
        let request_id = storage.assigned_req_id.read();
        storage.running_claims.insert(request_id, msg_sender().unwrap());
        storage.request_id_to_creator.insert(request_id, creator);
        storage.request_id_to_listing_id.insert(request_id, listing_id);
        log(RequestedEvent {
            amount: payable_amount,
             by: msg_sender().unwrap(),
        })
 
    }
    #[storage(read, write)]
    fn finalize_claim(request_id:u64, pr_num:u64){
        require(storage.used_requests.get(pr_num).read() == false, UserError::RequestAlreadyUsed);
        let dev_address = storage.running_claims.get(request_id).read();
        let creator = storage.request_id_to_creator.get(request_id).read();
        let listing_id = storage.request_id_to_listing_id.get(request_id).read();
        let listing = storage.creator_listings.get(creator).read();
        let remaining_fund = listing.current_deposit;
        let payable_amount = listing.payable_amount;
        require(remaining_fund >= payable_amount, UserError::InsufficientBalance);
        let token =abi(CalleeTokenContract, storage.token.read().into());
        token.mint_token(dev_address, 1);
     
        storage.used_requests.insert(pr_num, true);
        match dev_address {
            Identity::Address(address) => transfer_to_address(address, BASE_ASSET_ID, payable_amount),
            Identity::ContractId(contract_id) => force_transfer_to_contract(contract_id, BASE_ASSET_ID, payable_amount),
        };
          log(ClaimedEvent {
            amount: payable_amount,
            by:creator,
        });
    }
}
