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

pub struct TokenInitializeConfig {
    name: str[32],
    symbol: str[8],
    decimals: u8,
}

pub struct Listing {
    listing_id: u64,
    github_repo: str[1],
    current_deposit: u64,
    payable_amount: u64,
}
impl Listing {
    pub fn new(
        listing_id: u64,
        github_repo: str[1],
        current_deposit: u64,
        payable_amount: u64,
    ) -> Self {
        Self {
            listing_id,
            github_repo,
            current_deposit,
            payable_amount,
        }
    }
    // pub fn default() -> Self {
    //     Self {
    //         listing_id: 0,
    //         github_repo: [''],
    //         current_deposit: 0,
    //         payable_amount: 0,
    //     }
    // }
}
