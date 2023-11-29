contract;

use std::{constants::ZERO_B256, context::*, token::*};

abi NativeAssetToken {
    // fn name ()->str;
    // fn symbol ()->str;
    // fn decimal ()->u64;
    fn mint(mint_amount: u64);
    fn burn(burn_amount: u64);
    fn transfer(coins: u64, asset_id: AssetId, target: ContractId);
    fn transfer_from(coins: u64, asset_id: AssetId, recipient: Address);
    fn deposit();
    fn balance_of(target: ContractId, asset_id: AssetId) -> u64;
    fn buy_token(amount: u64, destination: ContractId);
    fn buy_token_for(amount: u64, recipient: Address);
}

impl NativeAssetToken for Contract {
    /// Mint an amount of this contracts native asset to the contracts balance.
    fn mint(mint_amount: u64) {
        mint(ZERO_B256, mint_amount);
    }

    /// Burn an amount of this contracts native asset.
    fn burn(burn_amount: u64) {
        burn(ZERO_B256, burn_amount);
    }

    /// Transfer coins to a target contract.
    fn transfer(coins: u64, asset_id: AssetId, target: ContractId) {
        force_transfer_to_contract(target, asset_id, coins);
    }

    /// Transfer coins to a transaction output to be spent later.
    fn transfer_from(coins: u64, asset_id: AssetId, recipient: Address) {
        transfer_to_address(recipient, asset_id, coins);
    }

    /// Get the internal balance of a specific coin at a specific contract.
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
