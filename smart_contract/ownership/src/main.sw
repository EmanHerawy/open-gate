library;

use std::{auth::msg_sender, logging::log, storage::*};
/// Intended to be logged when ownership is transferred from
/// `previous_owner` to `new_owner`.
pub struct OwnershipTransferredEvent {
    previous_owner: Option<Identity>,
    new_owner: Option<Identity>,
}

/// An Ownable contract.
abi Ownable {
    /// Gets the current owner.
    #[storage(read)]
    fn owner() -> Option<Identity>;

    /// Transfers ownership to `new_owner`.
    /// Must revert if the msg_sender is not the current owner
    /// and log OwnershipTransferredEvent.
    #[storage(read, write)]
    fn transfer_ownership(new_owner: Option<Identity>);
}
/// Reverts if `owner` is None, or if the inner value is not equal to
/// the msg_sender.
pub fn require_msg_sender(owner: Option<Identity>) {
    // To still revert with the string "!owner", owner.is_some() is checked
    // instead of reverting with owner.unwrap() if owner is None.
    require(owner.is_some() && owner.unwrap() == msg_sender().unwrap(), "!owner");
}

/// Logs an OwnershipTransferredEvent indicating ownership was transferred from `previous_owner`
/// to `new_owner`.
pub fn log_ownership_transferred(
    previous_owner: Option<Identity>,
    new_owner: Option<Identity>,
) {
    log(OwnershipTransferredEvent {
        previous_owner,
        new_owner,
    });
}
