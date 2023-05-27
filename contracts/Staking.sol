// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./RewardToken.sol";

import "./interfaces/IGameContract.sol";

error Staking__TransferFailed();
error Withdraw__TransferFailed();
error Staking__NeedsMoreThanZero();
error Error__NotWonGame();

contract Staking is ReentrancyGuard, RewardItem{
    IERC20 public s_stakingToken;
    IGameContract public s_gameContract;
    uint256 public constant REWARD_PERCENTAGE = 1;


    /** @dev Mapping from address to the amount the user has staked */
    mapping(address => uint256) public s_balances;
    uint256 s_totalSupply;
    
    

    modifier moreThanZero(uint256 amount) {
        if (amount == 0) {
            revert Staking__NeedsMoreThanZero();
        }
        _;
    }

    constructor(address stakingToken, address _gameContract) {
        s_stakingToken = IERC20(stakingToken);
        s_gameContract = IGameContract(_gameContract);
    }

   

    function stake(uint256 amount) external moreThanZero(amount) {
        // keep track of how much this user has staked
        // keep track of how much token we have total
        // transfer the tokens to this contract
        /** @notice Be mindful of reentrancy attack here */
        s_balances[msg.sender] += amount;
        s_totalSupply += amount;
        //emit event
        bool success = s_stakingToken.transferFrom(msg.sender, address(this), amount);
        // require(success, "Failed"); Save gas fees here
        if (!success) {
            revert Staking__TransferFailed();
        }
    }

    function withdraw(uint256 amount) external moreThanZero(amount) {
        s_balances[msg.sender] -= amount;
        s_totalSupply -= amount;
        // emit event
        bool success = s_stakingToken.transfer(msg.sender, amount);
        if (!success) {
            revert Withdraw__TransferFailed();
        }
    }

    function claimReward(string memory _tokenURI) external {
        //update logic to check if user won
        if(s_gameContract.winners(msg.sender) == 0){
            revert Error__NotWonGame();
        }
        uint itemId = awardItem(msg.sender, _tokenURI);
        s_gameContract.updateWinners(msg.sender, 0);
        if (itemId<=0) {
            revert Staking__TransferFailed();
        }

    }

    // Getter for UI
    function getStaked(address account) public view returns (uint256) {
        return s_balances[account];
    }
}