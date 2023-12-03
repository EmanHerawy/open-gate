library;

abi ContractABI {
    #[storage(read, write)]
    fn constructor(token: ContractId, registration: ContractId) ;
    #[storage(read, write), payable]
    fn list_repo(github_repo:str[1], payable_amount:u64);
    #[storage(read, write)]
    fn claim(listing_id:u64, pr_num:u64);
    #[storage(read, write)]
    fn finalize_claim(request_id:u64, pr_num:u64);

  
}
abi CalleeTokenContract {
    #[storage(read)]
    fn user_balance(user: Identity) -> u64;
      #[storage(read, write)]
    fn mint_token(to: Identity, amount: u64);
}
