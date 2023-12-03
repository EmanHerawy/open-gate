library;

use std::block::height;
use core::ops::Eq;


 
/// Represents whether the contract has been initialized.
pub enum State {
    /// The contract has not been initialized.
    NotInitialized: (),
    /// The contract has been initialized.
    Initialized: (),
}

impl Eq for State {
    fn eq(self, other: Self) -> bool {
        match (self, other) {
            (State::Initialized, State::Initialized) => true,
            (State::NotInitialized, State::NotInitialized) => true,
            _ => false,
        }
    }
}


 
