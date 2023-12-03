library;

abi TokenABI {
    #[storage(read, write)]
    fn constructor(_owner: Option<Identity>);
    /// Return the amount of governance tokens in this contract.
    ///
    /// # Returns
    ///
    /// * [u64] - the amount of  tokens issued
    #[storage(read)]
    fn total_supply() -> u64;
    /// Return the amount of governance tokens a user has in this contract.
    ///
    /// # Arguments
    ///
    /// * `user`: [Identity] - Identity to look up governance token balance in this contract.
    ///
    /// # Returns
    ///
    /// * [u64] - the amount of governance tokens a user has in this contract.
    #[storage(read)]
    fn user_balance(user: Identity) -> u64;

    #[payable]
    #[storage(read, write)]
    fn buy_token();

    fn name() -> str;
    fn symbol() -> str;
    fn decimal() -> u64;

    #[storage(read, write)]
    fn transfer(to: Identity, amount: u64, token_id: AssetId);
    #[storage(read, write)]
    fn mint_token(to: Identity, amount: u64);
    #[storage(read, write)]
    fn set_minter(minter: Identity);
}
