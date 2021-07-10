let CryptoJS = require('Crypto-js')
let iv = CryptoJS.enc.Hex.parse('lw9YQ8lRpTeR0HOhJgiXiDXJIytmCzsx')

let genKey = (email, password) =>
{
    return CryptoJS.PBKDF2(password, email, {
        keySize: 128 / 32
    });
}

let encrypt = (str, key) =>
{
    return CryptoJS.AES.encrypt(str, key, {iv}).toString()
}

let decrypt = (str, key) =>
{
    return CryptoJS.AES.decrypt(str, key, {iv}).toString(CryptoJS.enc.Utf8)
}

module.exports = 
{
    genKey,
    encrypt,
    decrypt
}