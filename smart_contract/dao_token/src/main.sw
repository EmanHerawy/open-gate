contract;
mod data_structures;
mod interface;
mod errors;

use std::{constants::{ZERO_B256,BASE_ASSET_ID}, context::*, token::*, hash::*,    call_frames::msg_asset_id,
};
use ownership::{
    require_msg_sender,
    log_ownership_transferred,
    Ownable,
};
use ::data_structures::{ State};
use :: interface::{TokenABI};
use ::errors::{ InitializationError,UserError};

storage {
    owner: Option<Identity> = Some(Identity::Address(Address::from(ZERO_B256))),
   balances: StorageMap<Identity, u64> = StorageMap {},
   state: State = State::NotInitialized,
    total_supply: u64 = 0,

 
}
impl Ownable for Contract {
    /// Gets the current owner.
    #[storage(read)]
    fn owner() -> Option<Identity> {
        storage.owner.read()
    }

    /// Transfers ownership to `new_owner`.
    /// Reverts if the msg_sender is not the current owner.
    #[storage(read, write)]
    fn transfer_ownership(new_owner: Option<Identity>) {
         let old_owner = storage.owner.read();
         require_msg_sender(old_owner);

         storage.owner.write( new_owner);
         log_ownership_transferred(old_owner, new_owner);
    }
}
impl TokenABI for Contract{
        #[storage(read, write)]
    fn constructor(_owner: Option<Identity>) {
        require(storage.state.read() == State::NotInitialized, InitializationError::CannotReinitialize);
        // Start the next message to be signed
          storage.state.write( State::Initialized);
        storage.owner.write(_owner);
    }
     

    #[storage(read)]
    fn total_supply() -> u64 {
        storage.total_supply.read()
    }

      #[payable]
    #[storage(read, write)]
    fn buy_token() {
        require(storage.state.read() == State::Initialized, InitializationError::ContractNotInitialized);
        require(BASE_ASSET_ID == msg_asset_id(), UserError::IncorrectAssetSent);
        require(0 < msg_amount(), UserError::AmountCannotBeZero);
        let user = msg_sender().unwrap();
           match user {
            Identity::Address(address) => mint_to_address(address, ZERO_B256, msg_amount()),
            Identity::ContractId(contract_id) => mint_to_contract(contract_id, ZERO_B256, msg_amount()),
        };

        storage.balances.insert(user, msg_amount() + storage.balances.get(user).try_read().unwrap_or(0));
        storage.total_supply.write(storage.total_supply.read() + msg_amount());
    
    }

    #[storage(read)]
    fn user_balance(user: Identity) -> u64 {
        storage.balances.get(user).try_read().unwrap_or(0)
    }




    ///// ***********************/////
      /// @dev @notice , for some reason, the compiler is not allowing me to set as storage variable 
    /// Get the name of this token.
    fn name() -> str {
        "Native Asset Token"
    }
    /// Get the symbol of this token.
    fn symbol() -> str {
        "NAT"
    }
    /// Get the decimal of this token.
    fn decimal() -> u64 {
        // Those tokens are 9 decimals because Fuel’s native asset system works on a 64-bit word size, that word size means you can’t do an 18 decimal token, it has to be about half that for native assets on Fuel.
        // ref: https://forum.fuel.network/t/is-there-any-article-about-token-in-fuel-network/1121/7

        9
    }
 

    /// transfer token 
    #[storage(read, write)]
    fn transfer(to: Identity, amount: u64,token_id: AssetId) {
        require(storage.state.read() == State::Initialized, InitializationError::ContractNotInitialized);
        require(0 < amount, UserError::AmountCannotBeZero);
        let from = msg_sender().unwrap();
        let from_balance = storage.balances.get(from).try_read().unwrap_or(0);
        require(amount <= from_balance, UserError::InsufficientBalance);
        storage.balances.insert(from, from_balance - amount);
        storage.balances.insert(to, amount + storage.balances.get(to).try_read().unwrap_or(0));
        match to {
            Identity::Address(address) => transfer_to_address(address, token_id, amount),
            Identity::ContractId(contract_id) => force_transfer_to_contract(contract_id, token_id, amount),
        };

    }

}
