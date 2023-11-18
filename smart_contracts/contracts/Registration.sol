// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/security/Pausable.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// the contract should manage user registration , for creator and contributors

contract Registration is Pausable, Ownable {

    mapping (string=>address) public  githubToAddress;
    mapping (address=>string) public addressToGithub;
    mapping (address=>uint256) public creatorRegistratedTime;
    IERC20 daoToken;
    uint256 public blanceToJoin;
    constructor(address token , uint256 _blanceToJoin)  {
        daoToken = IERC20(token);
        require(_blanceToJoin>10,"balance must be greater than 10");
        blanceToJoin = _blanceToJoin;
    }
    function updateBlanceToJoin(uint256 _blanceToJoin) public onlyOwner{
        require(_blanceToJoin>10,"balance must be greater than 10");
        blanceToJoin = _blanceToJoin;
    }

        // register as contributor

    function joinAsContributor(string memory githubUsername) public  whenNotPaused{
        require(githubToAddress[githubUsername] == address(0), "github username already registered");
        githubToAddress[githubUsername] = msg.sender;
        addressToGithub[msg.sender] = githubUsername;
        emit ContributorRegistered(msg.sender, githubUsername);
    }


    // join as open-source-project-creator
    // later we need to handle case of creator manipulating the contract by selling the token after joining 

    function joinAsOpenSourceProjectCreator() public  whenNotPaused{
        require(creatorRegistratedTime[msg.sender]!=0, "already registered as open source project creator");
      /// make sure creator is qualified to join
        require(daoToken.balanceOf(msg.sender) >= blanceToJoin, "not enough balance to join");
        creatorRegistratedTime[msg.sender] = block.timestamp;
        emit CreatorRegistered(msg.sender);
    }

 function IsProjectCreatorRegistered(address creatorAddress) public view returns(bool){
     return creatorRegistratedTime[creatorAddress]!=0;}
     
    // leave 


    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    event CreatorRegistered(address indexed creatorAddress);
    event ContributorRegistered(address indexed contributorAddress, string indexed githubUsername);
     

}

