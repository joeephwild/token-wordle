//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IGameContract{
    function winners(address) external view returns(uint);
    function updateWinners(address, uint) external;
}