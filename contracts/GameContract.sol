//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract EncryptionContract {
    error Error__NotPlayed();
    error Error__NotWon();

    bytes32 private immutable playedSecretKey;
    bytes32 private immutable wonSecretKey;

    constructor(bytes32 _playedSecretKey, bytes32 _wonSecretKey) {
        playedSecretKey = _playedSecretKey;
        wonSecretKey = _wonSecretKey;
    }

    function checkData(string memory encryptedData) public view returns (bool) {
        string memory decryptedBytes = _decryptData(encryptedData);
        return _isDataDecryptedCorrectly(encryptedData, decryptedBytes);
    }

    function _decryptData(string memory encryptedData)
        private
        view
        returns (string memory)
    {
        bytes memory encryptedBytes = bytes(encryptedData);
        bytes memory decryptedBytes = new bytes(encryptedBytes.length);

        for (uint256 i = 0; i < encryptedBytes.length; i++) {
            decryptedBytes[i] =
                encryptedBytes[i] ^
                playedSecretKey[i % playedSecretKey.length];
        }

        return string(decryptedBytes);
    }

    function _isDataDecryptedCorrectly(
        string memory encryptedData,
        string memory decryptedData
    ) private view returns (bool) {
        bytes memory encryptedBytes = bytes(encryptedData);
        bytes memory decryptedBytes = bytes(decryptedData);

        // Check that the length of the decrypted data is the same as the length of the encrypted data
        if (decryptedBytes.length != encryptedBytes.length) {
            return false;
        }

        // Decrypt the encrypted data using the secret key
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
    function checkDataW(string memory encryptedData)
        public
        view
        returns (bool)
    {
        string memory decryptedBytes = _decryptDataW(encryptedData);
        return _isDataDecryptedCorrectlyW(encryptedData, decryptedBytes);
    }

    function _decryptDataW(string memory encryptedData)
        private
        view
        returns (string memory)
    {
        bytes memory encryptedBytes = bytes(encryptedData);
        bytes memory decryptedBytes = new bytes(encryptedBytes.length);

        for (uint256 i = 0; i < encryptedBytes.length; i++) {
            decryptedBytes[i] =
                encryptedBytes[i] ^
                wonSecretKey[i % wonSecretKey.length];
        }

        return string(decryptedBytes);
    }

    function _isDataDecryptedCorrectlyW(
        string memory encryptedData,
        string memory decryptedData
    ) private view returns (bool) {
        bytes memory encryptedBytes = bytes(encryptedData);
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
        bytes32 _playedSecretKey,
        bytes32 _wonSecretKey
    ) EncryptionContract(_playedSecretKey, _wonSecretKey) {
        REWARD_AMOUNT = _percent;
        s_stakingToken = IERC20(_stakingToken);
    }

    //mapping that stores winners
    mapping(address => uint256) public winners;

    function playedGame(string memory _encryptedData) public {
        if (!(checkData(_encryptedData))) {
            revert Error__NotPlayed();
        }
        s_stakingToken.transfer(msg.sender, REWARD_AMOUNT);
    }

    function wonGame(string memory _encryptedData) public {
        if ((checkDataW(_encryptedData))) {
            winners[msg.sender] += 1;
        } else {
            revert Error__NotWon();
        }
    }
    
}
