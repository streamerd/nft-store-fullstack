import { NextApiRequest, NextApiResponse } from "next";
import * as fs from 'fs'
import afutureModern from '../../data/LaunchArtists/afuturemodern.json'
// import * as path from 'path';

const artists = (req: NextApiRequest, res: NextApiResponse) => {
    // const artist = fs.readFileSync('../../data/LaunchArtists/afuturemodern.json', 'utf-8')
    return res.status(200).json(afutureModern)
}

export default artists