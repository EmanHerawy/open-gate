library;

/// Event for Claiming fund.
pub struct ClaimedEvent {
    /// The amount Claiming fund.
    amount: u64,
    /// The user who Claimed.
    by: Identity,
}

/// Event for a Request.
pub struct RequestedEvent {
    /// The amount Request.
    amount: u64,
    /// The user who Request.
    by: Identity,
}

/// Event for initialization of the contract.
pub struct InitializeEvent {
    /// User who initialized the contract.
    author: Identity,
    /// Contract Id of the token used for DAO governance.
    token: ContractId,
}
