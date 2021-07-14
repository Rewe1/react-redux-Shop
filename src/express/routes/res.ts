import express from 'express'
import fs from 'fs'
let errorMsg = 'An error occurred :c'
const router = express.Router()

let resPath = `${__dirname}/../dist/res`

router.get('/ca97dffa3bf757477c786488adc0ae31.png', (req: any, res: any) =>
{
    fs.readFile(`${resPath}/ca97dffa3bf757477c786488adc0ae31.png`, (err: Error, data: any) =>
    {
        try
        {
            if(err)
                throw err
        }
        catch(exc)
        {
            console.error(exc)
            res.status(500).end(errorMsg)
        }
        res.status(200).end(data)
    })
})

router.get('/abc69b88d253da8e14b36becb0e6a6df.png', (req: any, res: any) =>
{
    fs.readFile(`${resPath}/abc69b88d253da8e14b36becb0e6a6df.png`, (err: Error, data: any) =>
    {
        try
        {
            if(err)
                throw err
        }
        catch(exc)
        {
            console.error(exc)
            res.status(500).end(errorMsg)
        }
        res.status(200).end(data)
    })
})

export default router