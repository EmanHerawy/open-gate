contract;

use std::{block::timestamp, constants::ZERO_B256, context::*, hash::*};
use ownership::{log_ownership_transferred, Ownable, require_msg_sender};
abi CalleeTokenContract {
    #[storage(read)]
    fn user_balance(user: Identity) -> u64;
}

abi Registration {
    #[storage(read, write)]
    fn initialize(new_owner: Option<Identity>, treasury_: Option<Identity>, blance_to_join: u64, dao_token: ContractId);
    // #[storage(read)]
    // fn get_developer_address(github_username: str) -> Address;
    // #[storage(read)]
    // fn get_developer_github(dev: Address) -> str;
    #[storage(read)]
    fn is_project_creator_registered(creator_address: Identity) -> bool;
    #[storage(read, write)]
    fn join_as_contributor(github_username: str);
    #[storage(read, write), payable]
    fn join_as_open_source_project_creator();
}

storage {
    //   allowlist: StorageMap<Identity, bool> = StorageMap{},
    initialized: bool = false,
    dao_token: ContractId = ContractId::from(ZERO_B256),
    blance_to_join: u64 = 0,
    treasury_wallet: Option<Identity> = Option::None,
    owner: Option<Identity> = Some(Identity::Address(Address::from(ZERO_B256))),
    /// @dev @notice : can't use str due to  `str` or a type containing `str` on `configurables` is not allowed. referance : https://github.com/FuelLabs/sway/issues/5307
    //github_to_Address: StorageMap<str, Address> = StorageMap{},
    // address_to_Github : StorageMap<Identity, str> = StorageMap{},
    creator_Registrated_Time: StorageMap<Identity, u64> = StorageMap {},
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

        storage.owner.write(new_owner);
        log_ownership_transferred(old_owner, new_owner);
    }
}
impl Registration for Contract {
    /// Initialize the contract.
    /// Reverts if the contract is already initialized.
    #[storage(read, write)]
    fn initialize(
        new_owner: Option<Identity>,
        treasury_: Option<Identity>,
        blance_to_join: u64,
        dao_token: ContractId,
    ) {
        assert(!storage.initialized.read());
        storage.initialized.write(true);
        storage.treasury_wallet.write(treasury_);
        storage.blance_to_join.write(blance_to_join);
        storage.dao_token.write(dao_token);
        storage.owner.write(new_owner);
    }
    // #[storage(read)]
    // fn get_developer_address(github_username: str) -> Address {
    //     storage.github_to_Address.get(github_username).read()

    // }

    // #[storage(read)]
    // fn get_developer_github(dev: Address) -> str {
    //     storage.address_to_Github.get(dev).read()
    // }
    #[storage(read)]
    fn is_project_creator_registered(creator_address: Identity) -> bool {
        storage.creator_Registrated_Time.get(creator_address).try_read().is_some()
    }
    #[storage(read, write)]
    fn join_as_contributor(github_username: str) {
        // assert(storage.initialized.read());
        // assert(storage.address_to_Github.get(msg_sender()).try_read().is_none());
        // assert(storage.github_to_Address.get(github_username).try_read().is_none());
        // storage.address_to_Github.insert(msg_sender(), github_username);
        // storage.github_to_Address.insert(github_username, msg_sender());
    }
    // project creator should put some money in the contract to be able to register as a project creator
    #[storage(read, write), payable]
    fn join_as_open_source_project_creator() {
        assert(storage.initialized.read());
        assert(storage.creator_Registrated_Time.get(msg_sender().unwrap()).try_read().is_none());
        //check the balance of the msg_sender 
        let dao_token = abi(CalleeTokenContract, storage.dao_token.read().into());
        let balance = dao_token.user_balance(msg_sender().unwrap());
        assert(balance >= storage.blance_to_join.read());
        storage.creator_Registrated_Time.insert(msg_sender().unwrap(), timestamp());
    }
}
