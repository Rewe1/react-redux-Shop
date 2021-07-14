import cryptoF from '../../crypto-functions/index'

let mapAccount = (func: any, account: any, encryptionKey: string) =>
{
   account.CNPJ = func(account.CNPJ, encryptionKey)
   account.phone = func(account.phone, encryptionKey)
   account.whatsapp = func(account.whatsapp, encryptionKey)
   account.address.CEP = func(account.address.CEP, encryptionKey)
   account.address.state = func(account.address.state, encryptionKey)
   account.address.city = func(account.address.city, encryptionKey)
   account.address.district = func(account.address.district, encryptionKey)
   account.address.optional = func(account.address.optional, encryptionKey)

    return account
}

export default mapAccount


