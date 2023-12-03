library;

enum Error {
    AddressAlreadyMint: (),
    CannotReinitialize: (),
    MintIsClosed: (),
    NotOwner: (),
}
/// Errors related to initialization of the contract.
pub enum InitializationError {
    /// The contract has already been initialized.
    CannotReinitialize: (),
    /// The contract has not been initialized.
    ContractNotInitialized: (),
}

/// Errors related to user actions.
pub enum UserError {
    /// Deposit or withdrawal amounts cannot be zero.
    AmountCannotBeZero: (),
    /// The incorrect asset type was sent.
    IncorrectAssetSent: (),
    /// The user does not have enough balance to perform the action.
    InsufficientBalance: (),
 
}