contract;

use std::{constants::ZERO_B256, context::* };
use ownership::{
    require_msg_sender,
    log_ownership_transferred,
    Ownable,
};
abi Registration {
    #[storage(read,write)]
    fn initialize(new_owner: Option<Identity>);
   
}
storage {
//   allowlist: StorageMap<Identity, bool> = StorageMap{},
  initialized: bool = false,
//    owner: Address = Address::from(ZERO_B256),
   owner: Option<Identity> = Some(Identity::Address(Address::from(ZERO_B256))),
      

 
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
impl Registration for Contract {
    /// Initialize the contract.
    /// Reverts if the contract is already initialized.
    #[storage(read,write)]
    fn initialize(new_owner: Option<Identity>) {
        assert(!storage.initialized.read());
        storage.initialized.write( true);
        storage.owner.write(new_owner);
    }
  
}
