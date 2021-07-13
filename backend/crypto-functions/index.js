let crypto = require('crypto')
let iv = Buffer.from('89aba9e0f9bf19283534fa20d2f28408', 'hex')

let genRandomKey = () =>
{
    return crypto.randomBytes(24).toString('hex')
}

let derivateKey = (email, password) =>
{
    let derivatedKey = crypto.pbkdf2Sync(password, email, 10, 24, 'sha256').toString('hex')

    console.log('derivateKey: ',
        {
            email,
            password,
            derivatedKey
        }
    )
    return derivatedKey
}

let encrypt = (str, key) =>
{
    const cipher = crypto.createCipheriv('aes-192-cbc', Buffer.from(key, 'hex'), iv);
    let encrypted = cipher.update(str)
    encrypted = Buffer.concat([encrypted, cipher.final()]);
/* 
    console.log('encrypt: ',
        {
            str,
            key,
            encrypted
        }
    )
     */
    return encrypted.toString('hex')
}

let decrypt = (str, key) =>
{
    let decipher = crypto.createDecipheriv('aes-192-cbc', Buffer.from(key, 'hex'), iv)
    let decrypted = decipher.update(Buffer.from(str, 'hex'))
    decrypted = Buffer.concat([decrypted, decipher.final()]).toString()
    /* 
    console.log('decrypt: ',
        {
            str,
            key,
            decrypted
        }
    )
     */
    return decrypted
    
}

module.exports = 
{
    genRandomKey,
    derivateKey,
    encrypt,
    decrypt
}