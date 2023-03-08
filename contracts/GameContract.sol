//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract EncryptionContract {
  bytes32 private immutable secretKey;

  constructor(bytes32 _secretKey) {
    secretKey = _secretKey;
  }


  function checkData(string memory encryptedData) external view returns(bool){
    string memory decryptedBytes = _decryptData(encryptedData);
    return _isDataDecryptedCorrectly(encryptedData, decryptedBytes);
  }

  function _decryptData(string memory encryptedData) private view returns (string memory) {
    bytes memory encryptedBytes = bytes(encryptedData);
    bytes memory decryptedBytes = new bytes(encryptedBytes.length);

    for (uint i = 0; i < encryptedBytes.length; i++) {
      decryptedBytes[i] = encryptedBytes[i] ^ secretKey[i % secretKey.length];
    }

    return string(decryptedBytes);
  }

  function _isDataDecryptedCorrectly(string memory encryptedData, string memory decryptedData) private view returns (bool) {
    bytes memory encryptedBytes = bytes(encryptedData);
    bytes memory decryptedBytes = bytes(decryptedData);

    // Check that the length of the decrypted data is the same as the length of the encrypted data
    if (decryptedBytes.length != encryptedBytes.length) {
      return false;
    }

    // Decrypt the encrypted data using the secret key
    for (uint i = 0; i < encryptedBytes.length; i++) {
      decryptedBytes[i] = encryptedBytes[i] ^ secretKey[i % secretKey.length];
    }

    // Compare the decrypted data with the original data
    if (keccak256(decryptedBytes) == keccak256(bytes(decryptedData))) {
      return true;
    } else {
      return false;
    }
  }
}

contract GameContract is EncryptionContract{

    IERC20 public immutable s_stakingToken;
    uint256 public immutable REWARD_PERCENTAGE;

    constructor(uint256 _percent, address _stakingToken, bytes32 _secretKey) EncryptionContract(_secretKey){
        REWARD_PERCENTAGE = _percent;
        s_stakingToken = IERC20(_stakingToken);
    }

    
}
