import crypto from 'crypto'
let iv = Buffer.from('89aba9e0f9bf19283534fa20d2f28408', 'hex')

let genRandomKey = () =>
{
    return crypto.randomBytes(24).toString('hex')
}

let derivateKey = (email: string, password: string) =>
{
    let derivatedKey = crypto.pbkdf2Sync(password, email, 10, 24, 'sha256').toString('hex')
/* 
    console.log('derivateKey: ',
        {
            email,
            password,
            derivatedKey
        }
    )
     */
    return derivatedKey
}

let encrypt = (str: string, key: string) =>
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

let decrypt = (str: string, key: string) =>
{
    let decipher = crypto.createDecipheriv('aes-192-cbc', Buffer.from(key, 'hex'), iv)
    let decrypted = Buffer.concat([decipher.update(Buffer.from(str, 'hex')), decipher.final()]).toString()
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

export default
{
    genRandomKey,
    derivateKey,
    encrypt,
    decrypt
}