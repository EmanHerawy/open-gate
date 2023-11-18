// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/security/Pausable.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

/// the contract should manage user registration , for creator and contributors

contract Registration is Pausable, Ownable {

    mapping (string=>address) public  githubToAddress;
    mapping (address=>string) public addressToGithub;
    mapping (address=>bool) public isOpenSourceProjectCreator;

    constructor() {}

        // register as contributor

    function joinAsContributor(string memory githubUsername) public  whenNotPaused{
        require(githubToAddress[githubUsername] == address(0), "github username already registered");
        githubToAddress[githubUsername] = msg.sender;
        addressToGithub[msg.sender] = githubUsername;
        emit ContributorRegistered(msg.sender, githubUsername);
    }


    // join as open-source-project-creator

    function joinAsOpenSourceProjectCreator() public  whenNotPaused{
        require(! isOpenSourceProjectCreator[msg.sender], "already registered as open source project creator");
        isOpenSourceProjectCreator[msg.sender] = true;
        emit CreatorRegistered(msg.sender);
    }


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

