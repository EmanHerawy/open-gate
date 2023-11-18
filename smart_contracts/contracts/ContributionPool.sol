// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

 import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import {Functions, FunctionsClient} from "./dev/functions/FunctionsClient.sol";

import "./DAOToken.sol";
import "./Registration.sol";

/// This contract should handle the relation between open source project creator and open source project contributors.
/// personas : 
    //// 1- Open source project contributors , looking for open source project to contribute to and get paid for thier work . with each contribution DAO token is minted 
    //// 2- Open source project creator , look for contributors to thier open source project and pay them for thier work . They have to be DAO token holder to be able to list thier project and they have to deposit bug bounty amount in the contract to be able to pay contributors
/// The core functionality is to enable  Creators to list thier github repos, set how the deposit that they will be paid , once the contributor create PR and close the issue , the contract release the payment to the contributor and mint DAO token to the contributor
contract ContributionPool  is  Ownable, FunctionsClient{
     using Functions for Functions.Request;
    uint256 counter;
    Registration registration;
    uint64 subscriptionId;
    DAOToken token;
    mapping (address=>Listing) CreatorListings;
    mapping (string=>address) public githubToCreatorAddress;
    struct Listing{
        uint256 listingId;
        string githubRepo;
        uint256 currentDeposit;
        uint256 payableAmount;
            }         
  mapping(bytes32 => address) internal runningClaims;
  mapping(bytes32 => address) internal requestIdToCreator;
  mapping(bytes32 => string) internal requestIdToprUrl;
  mapping(bytes32 => uint256) internal requestIdToListingId;
  string internal checkLogic;

  mapping (string=>bool) public usedRequests;


  event OCRResponse(bytes32 indexed requestId, bytes result, bytes err);
  event Claimed(uint amount, address by);

  constructor(address oracle, address _registration, address _token,uint64 _subscriptionId,  string memory _checkLogic) FunctionsClient(oracle) {
        setOracle(oracle);
    checkLogic = _checkLogic;
    registration = Registration(_registration);
    token = DAOToken(_token);
    subscriptionId = _subscriptionId;
    
  }
    function listRepo (string memory githubRepo, uint256 payableAmount) public payable {
        require(Registration(msg.sender).IsProjectCreatorRegistered(msg.sender),"not registered as project creator");
        require(CreatorListings[msg.sender].listingId==0,"already listed");
        counter++;
        githubToCreatorAddress[githubRepo] = msg.sender;
        CreatorListings[msg.sender] = Listing(counter,githubRepo,msg.value,payableAmount);
    }


  /// @notice Can be called by maintainers to claim donations made to their repositories
  function claim(string calldata repo, string  calldata prUrl ) public {
    ///  check balance to make sure that project creators don't sepend more than the deposit
    require(CreatorListings[githubToCreatorAddress[repo]].currentDeposit >= CreatorListings[githubToCreatorAddress[repo]].payableAmount,"not enough balance to pay");
    require(!usedRequests[prUrl],"request already used");
    Functions.Request memory req;
    req.initializeRequest(Functions.Location.Inline, Functions.CodeLanguage.JavaScript, checkLogic);

    string[] memory args = new string[](1);
    args[0] = prUrl;
 
    req.addArgs(args);
    
   
    bytes32 assignedReqID = sendRequest(req, subscriptionId, 300000);
     requestIdToCreator[assignedReqID] = githubToCreatorAddress[repo];
     runningClaims[assignedReqID] = githubToCreatorAddress[repo];
    requestIdToprUrl[assignedReqID] = prUrl;
    requestIdToListingId[assignedReqID] = CreatorListings[githubToCreatorAddress[repo]].listingId;
  }

     /// @notice Finalizes the claim process after Chainlink Functions has finished the authentication
  function finalizeClaim(address creator,string memory _login, string memory githubIssue, uint256 bountyAmount ) internal {
// get address of github handle
    address devAddress= registration.getDeveloperAddress(_login);
    usedRequests[githubIssue] = true;
// make the github issue as done 
 CreatorListings[creator].currentDeposit -= bountyAmount;
// mint token 

    token.mint(devAddress,1);
    // emit event

    emit Claimed(bountyAmount, devAddress);
    // release payment 
    payable(msg.sender).transfer(bountyAmount);
  }

 

  /// @notice Callback that is invoked once the DON has resolved the request or hit an error
  ///
  /// @param requestId The request ID, returned by sendRequest()
  /// @param response Aggregated response from the user code
  /// @param err Aggregated error from the user code or from the execution pipeline
  /// Either response or error parameter will be set, but never both
  function fulfillRequest(bytes32 requestId, bytes memory response, bytes memory err) internal override {
    emit OCRResponse(requestId, response, err);

    if (response.length > 0 && runningClaims[requestId] != address(0)) {
      string memory githubHandle = string(response);

        finalizeClaim(requestIdToCreator[requestId],githubHandle, requestIdToprUrl[requestId], requestIdToListingId[requestId]);
       
    }
  }

  /// @notice Allows the Functions oracle address to be updated
  ///
  /// @param oracle New oracle address
  function updateOracleAddress(address oracle) public onlyOwner {
    setOracle(oracle);
  }



    event ListingCreated(uint256 listingId, string githubRepo, uint256 deposit, uint256 payableAmount);

    
}