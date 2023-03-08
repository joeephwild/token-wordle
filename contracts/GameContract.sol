// SPDX-License-Identifier: MIT
// This is a Solidity smart contract for a simple game where players can play and win rewards
// The contract uses encryption to verify the data provided by the players

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract EncryptionContract {
    // Declare errors for player and winner verification
    error Error__NotPlayed();
    error Error__NotWon();
    // Declare private immutable variables to store secret keys
    bytes32 private immutable playedSecretKey;
    bytes32 private immutable wonSecretKey;

    // Constructor to initialize the secret keys
    constructor(bytes memory _playedSecretKey, bytes memory _wonSecretKey) {
        playedSecretKey = bytes32(_playedSecretKey);
        wonSecretKey = bytes32(_wonSecretKey);
    }

    // Function to check if encrypted data is decrypted correctly for players
    function checkData(bytes memory encryptedData) public view returns (bool) {
        // Ensure that encrypted data is not empty
        require(encryptedData.length > 0, "Encrypted data must not be empty");

        // Decrypt the encrypted data using the playedSecretKey
        string memory decryptedBytes = _decryptData(encryptedData);

        // If decryption fails, revert with an error message
        if (bytes(decryptedBytes).length == 0) {
            revert("Failed to decrypt data");
        }

        // Return true if decrypted data is correct, false otherwise
        return _isDataDecryptedCorrectly(encryptedData, decryptedBytes);
    }

    // Function to decrypt encrypted data using the playedSecretKey
    function _decryptData(bytes memory encryptedData)
        private
        view
        returns (string memory)
    {
        bytes memory decryptedBytes = new bytes(encryptedData.length);

        for (uint256 i = 0; i < encryptedData.length; i++) {
            decryptedBytes[i] =
                encryptedData[i] ^
                playedSecretKey[i % playedSecretKey.length];
        }

        return string(decryptedBytes);
    }

    // Function to check if decrypted data is correct for players
    function _isDataDecryptedCorrectly(
        bytes memory encryptedData,
        string memory decryptedData
    ) private view returns (bool) {
        bytes memory encryptedBytes = encryptedData;
        bytes memory decryptedBytes = bytes(decryptedData);

        // Check that the length of the decrypted data is the same as the length of the encrypted data
        if (decryptedBytes.length != encryptedBytes.length) {
            return false;
        }

        // Decrypt the encrypted data using the playedSecretKey
        for (uint256 i = 0; i < encryptedBytes.length; i++) {
            decryptedBytes[i] =
                encryptedBytes[i] ^
                playedSecretKey[i % playedSecretKey.length];
        }

        // Compare the decrypted data with the original data
        if (keccak256(decryptedBytes) == keccak256(bytes(decryptedData))) {
            return true;
        } else {
            return false;
        }
    }

    //FOR WINNERS CHECKS
    function checkDataW(bytes memory encryptedData) public view returns (bool) {
        require(encryptedData.length > 0, "Encrypted data must not be empty");

        string memory decryptedBytes = _decryptData(encryptedData);
        if (bytes(decryptedBytes).length == 0) {
            revert("Failed to decrypt data");
        }
        return _isDataDecryptedCorrectly(encryptedData, decryptedBytes);
    }

    function _decryptDataW(bytes memory encryptedData)
        private
        view
        returns (string memory)
    {
        bytes memory decryptedBytes = new bytes(encryptedData.length);

        for (uint256 i = 0; i < encryptedData.length; i++) {
            decryptedBytes[i] =
                encryptedData[i] ^
                wonSecretKey[i % wonSecretKey.length];
        }

        return string(decryptedBytes);
    }

    function _isDataDecryptedCorrectlyW(
        bytes memory encryptedData,
        string memory decryptedData
    ) private view returns (bool) {
        bytes memory encryptedBytes = encryptedData;
        bytes memory decryptedBytes = bytes(decryptedData);

        // Check that the length of the decrypted data is the same as the length of the encrypted data
        if (decryptedBytes.length != encryptedBytes.length) {
            return false;
        }

        // Decrypt the encrypted data using the secret key
        for (uint256 i = 0; i < encryptedBytes.length; i++) {
            decryptedBytes[i] =
                encryptedBytes[i] ^
                wonSecretKey[i % wonSecretKey.length];
        }

        // Compare the decrypted data with the original data
        if (keccak256(decryptedBytes) == keccak256(bytes(decryptedData))) {
            return true;
        } else {
            return false;
        }
    }
}

contract GameContract is EncryptionContract {
    IERC20 public immutable s_stakingToken;
    uint256 public immutable REWARD_AMOUNT;

    constructor(
        uint256 _percent,
        address _stakingToken,
        bytes memory _playedSecretKey,
        bytes memory _wonSecretKey
    ) EncryptionContract(_playedSecretKey, _wonSecretKey) {
        REWARD_AMOUNT = _percent;
        s_stakingToken = IERC20(_stakingToken);
    }

    //mapping that stores winners
    mapping(address => uint256) public winners;

    function playedGame(bytes memory _encryptedData) public {
        if (!(checkData(_encryptedData))) {
            revert Error__NotPlayed();
        }
        s_stakingToken.transfer(msg.sender, REWARD_AMOUNT);
    }

    function wonGame(bytes memory _encryptedData) public {
        if ((checkDataW(_encryptedData))) {
            winners[msg.sender] += 1;
        } else {
            revert Error__NotWon();
        }
    }

    function updateWinners(address _sender, uint256 _amount) external {
        winners[_sender] = _amount;
    }
}
