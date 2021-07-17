import express from 'express'
import fs from 'fs'
let errorMsg = 'An error occurred :c'

const router = express.Router()

router.get('/', (req: any, res: any) =>
{
    fs.readFile(`${__dirname}/index.html`, (err: any, data: any) =>
    {
        try
        {
            if(err)
                throw err
        }
        catch(err)
        {
            console.error(err)
            res.status(500).end(errorMsg)
        }
        res.status(200).end(data)
    })
})

router.get('/bundle.js', (req: any, res: any) =>
{
    fs.readFile(`${__dirname}/bundle.js`, (err: any, data: any) =>
    {
        try
        {
            if(err)
                throw err
        }
        catch(err)
        {
            console.error(err)
            res.status(500).end(errorMsg)
        }
        res.status(200).end(data)
    })
})

export default router