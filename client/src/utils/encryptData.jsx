import CryptoJS from "crypto-js";

const secretKey = "dadasdnasndbkjsdkmxmndbnm"; // Replace with your secret key

export const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

export const decryptData = (encryptedData) => {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedData);
    } catch (error) {
        console.error("Error decrypting data:", error);
        return null;
    }
    
};
