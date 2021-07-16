let mapAccount = (func: any, account: any, encryptionKey: string) =>
{
    if(account.CNPJ)
    account.CNPJ = func(account.CNPJ, encryptionKey)

    if(account.phone)
    account.phone = func(account.phone, encryptionKey)

    if(account.whatsapp)
    account.whatsapp = func(account.whatsapp, encryptionKey)

    if(account.address.CEP)
    account.address.CEP = func(account.address.CEP, encryptionKey)

    if(account.address.state)
    account.address.state = func(account.address.state, encryptionKey)

    if(account.address.city)
    account.address.city = func(account.address.city, encryptionKey)

    if(account.address.district)
    account.address.district = func(account.address.district, encryptionKey)

    if(account.address.street)
    account.address.street = func(account.address.street, encryptionKey)

    if(account.address.number)
    account.address.number = func(account.address.number, encryptionKey)

    if(account.address.optional)
    account.address.optional = func(account.address.optional, encryptionKey)

    return account
}

export default mapAccount


