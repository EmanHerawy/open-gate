// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

 import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


import "./DAOToken.sol";
import "./Registration.sol";

/// This contract should handle the relation between open source project creator and open source project contributors.
/// personas : 
    //// 1- Open source project contributors , looking for open source project to contribute to and get paid for thier work . with each contribution DAO token is minted 
    //// 2- Open source project creator , look for contributors to thier open source project and pay them for thier work . They have to be DAO token holder to be able to list thier project and they have to deposit bug bounty amount in the contract to be able to pay contributors
/// The core functionality is to enable  Creators to list thier github repos, set how the deposit that they will be paid , once the contributor create PR and close the issue , the contract release the payment to the contributor and mint DAO token to the contributor
contract ContributionPool  is  Ownable{
     uint256 assignedReqId;
     uint256 counter;
    Registration registration;
    DAOToken token;
    mapping (address=>Listing) CreatorListings;
    mapping (string=>address) public githubToCreatorAddress;
    struct Listing{
        uint256 listingId;
        string githubRepo;
        uint256 currentDeposit;
        uint256 payableAmount;
            }         
  mapping(uint256 => address) internal runningClaims;
  mapping(uint256 => address) internal requestIdToCreator;
  mapping(uint256 => string) internal requestIdToprUrl;
  mapping(uint256 => uint256) internal requestIdToListingId;
 
  mapping (string=>bool) public usedRequests;


   event Claimed(uint amount, address by);
   event Requested(uint amount, address by, string prUrl);

  constructor( address _registration, address _token )  {
     registration = Registration(_registration);
    token = DAOToken(_token);
     
  }
    function listRepo (string memory githubRepo, uint256 payableAmount) public payable {
        // require(Registration(msg.sender).IsProjectCreatorRegistered(msg.sender),"not registered as project creator");
        // require(CreatorListings[msg.sender].listingId==0,"already listed");
        counter++;
        githubToCreatorAddress[githubRepo] = msg.sender;
        CreatorListings[msg.sender] = Listing(counter,githubRepo,msg.value,payableAmount);
    }


  /// @notice Can be called by maintainers to claim donations made to their repositories
  function claim(string calldata repo, string  calldata prUrl ) public {
    ///  check balance to make sure that project creators don't sepend more than the deposit
    require(CreatorListings[githubToCreatorAddress[repo]].currentDeposit >= CreatorListings[githubToCreatorAddress[repo]].payableAmount,"not enough balance to pay");
    require(!usedRequests[prUrl],"request already used");  
    assignedReqId++;
     requestIdToCreator[assignedReqId] = githubToCreatorAddress[repo];
     runningClaims[assignedReqId] = githubToCreatorAddress[repo];
    requestIdToprUrl[assignedReqId] = prUrl;
    requestIdToListingId[assignedReqId] = CreatorListings[githubToCreatorAddress[repo]].listingId;
  }

  
     /// @notice Finalizes the claim process after Chainlink Functions has finished the authentication
  function finalizeClaim(string memory _login, string memory githubIssue, uint256 bountyAmount ) internal {
// get address of github handle
    address devAddress= registration.getDeveloperAddress(_login);
    usedRequests[githubIssue] = true;
// make the github issue as done 
 CreatorListings[msg.sender].currentDeposit -= bountyAmount;
// mint token 

    token.mint(devAddress,1);
    // emit event

    emit Claimed(bountyAmount, devAddress);
    // release payment 
    payable(msg.sender).transfer(bountyAmount);
  }

 





    event ListingCreated(uint256 listingId, string githubRepo, uint256 deposit, uint256 payableAmount);

    
}