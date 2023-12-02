contract;

use std::{constants::ZERO_B256, context::*, token::*};
use ownership::{
    require_msg_sender,
    log_ownership_transferred,
    Ownable,
};
abi NativeAssetToken {
    #[storage(read,write)]
    fn initialize(new_owner: Option<Identity>);
    fn name ()->str;
    fn symbol ()->str;
    fn decimal ()->u64;
      #[storage(read, write)]
    fn mint(mint_amount: u64);
      #[storage(read, write)]
    fn burn(burn_amount: u64);
      #[storage(read, write)]
    fn transfer(coins: u64, asset_id: AssetId, target: ContractId);
     #[storage(read, write)]
    fn transfer_from(coins: u64, asset_id: AssetId, recipient: Address);
    fn deposit();
      #[storage(read)]
    fn balance_of(target: ContractId, asset_id: AssetId) -> u64;
    
    fn buy_token(amount: u64, destination: ContractId);
    fn buy_token_for(amount: u64, recipient: Address);
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
impl NativeAssetToken for Contract {
    /// Initialize the contract.
    /// Reverts if the contract is already initialized.
    #[storage(read,write)]
    fn initialize(new_owner: Option<Identity>) {
        assert(!storage.initialized.read());
        storage.initialized.write( true);
        storage.owner.write(new_owner);
    }
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
        18
    }


    /// Mint an amount of this contracts native asset to the contracts balance.
   #[storage(read, write)]
    fn mint(mint_amount: u64) {
        mint(ZERO_B256, mint_amount);
    }

    /// Burn an amount of this contracts native asset.
     #[storage(read, write)]
    fn burn(burn_amount: u64) {
        burn(ZERO_B256, burn_amount);
    }

    /// Transfer coins to a target contract.
     #[storage(read, write)]
    fn transfer(coins: u64, asset_id: AssetId, target: ContractId) {
        force_transfer_to_contract(target, asset_id, coins);
    }

    /// Transfer coins to a transaction output to be spent later.
     #[storage(read, write)]
    fn transfer_from(coins: u64, asset_id: AssetId, recipient: Address) {
        transfer_to_address(recipient, asset_id, coins);
    }

    /// Get the internal balance of a specific coin at a specific contract.
      #[storage(read)]
    fn balance_of(target: ContractId, asset_id: AssetId) -> u64 {
        balance_of(target, asset_id)
    }

    /// Deposit tokens back into the contract.
    fn deposit() {
        assert(msg_amount() > 0);
    }

    /// Mint and send this contracts native token to a destination contract.
    fn buy_token(amount: u64, destination: ContractId) {
        mint_to_contract(destination, ZERO_B256, amount);
    }

    /// Mind and send this contracts native token to a destination address.
    fn buy_token_for(amount: u64, recipient: Address) {
        mint_to_address(recipient, ZERO_B256, amount);
    }
}
