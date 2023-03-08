import CryptoJS from 'crypto-js';

// Encryption function
function encryptData(data, key) {
  const encrypted = CryptoJS.AES.encrypt(data, key);
  return encrypted.toString();
}

// Decryption function
function decryptData(data, key) {
  const decrypted = CryptoJS.AES.decrypt(data, key);
  return decrypted.toString(CryptoJS.enc.Utf8);
}

// Usage example
const dataToEncrypt = 'Hello, World!';
const secretKey = 'ThisIsASecretKey';

const encryptedData = encryptData(dataToEncrypt, secretKey);
console.log('Encrypted data:', encryptedData);

const decryptedData = decryptData(encryptedData, secretKey);
console.log('Decrypted data:', decryptedData);
