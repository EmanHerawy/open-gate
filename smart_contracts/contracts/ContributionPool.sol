// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./Registration.sol";

/// This contract should handle the relation between open source project creator and open source project contributors.
/// personas : 
    //// 1- Open source project contributors , looking for open source project to contribute to and get paid for thier work . with each contribution DAO token is minted 
    //// 2- Open source project creator , look for contributors to thier open source project and pay them for thier work . They have to be DAO token holder to be able to list thier project and they have to deposit bug bounty amount in the contract to be able to pay contributors
/// The core functionality is to enable  Creators to list thier github repos, set how the deposit that they will be paid , once the contributor create PR and close the issue , the contract release the payment to the contributor and mint DAO token to the contributor
contract ContributionPool {


    mapping (address=>Listing) CreatorListings;

    struct Listing{
        uint256 listingId;
        string githubRepo;
        uint256 currentDeposit;
        uint256 payableAmount;
            }
    function listRepo (string memory githubRepo, uint256 payableAmount) public payable {
        require(Registration(msg.sender).IsProjectCreatorRegistered(msg.sender),"not registered as project creator");
        require(CreatorListings[msg.sender].listingId==0,"already listed");
        CreatorListings[msg.sender] = Listing(block.timestamp,githubRepo,msg.value,payableAmount);
    }



    event ListingCreated(uint256 listingId, string githubRepo, uint256 deposit, uint256 payableAmount);

    
}