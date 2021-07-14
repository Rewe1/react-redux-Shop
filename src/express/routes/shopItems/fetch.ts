import express from 'express'
const router = express.Router();
import {items} from '../../mongoDB'

router.get('/', (req: any, res: any) =>
{
    items.find((err: Error, data: any) =>
    {
        try
        {
            if(err)
                throw err
        }
        catch(exc)
        {
            console.error(exc);
            if(res)
                res.status(500).end();
        }
            res.status(200).end(JSON.stringify(data));
    })
});

export default router;