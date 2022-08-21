import { Nft } from '@alch/alchemy-sdk'
import { getTokenMetadata } from '../scripts/Metadata'
import afuturemodern from './LaunchArtists/afuturemodern.json'
import andraesteed from './LaunchArtists/andraesteed.json'
import digitalpurity from './LaunchArtists/digitalpurity.json'
import Hvdson from './LaunchArtists/Hvdson.json'

const artistData: Nft[] = [];

export const handleGetNftData = async () => {

    const artist = {
        afuturemodern,
        andraesteed,
        digitalpurity,
        Hvdson
    }
    
    for (let nft in artist) {

        const data = await getTokenMetadata(((artist as any)[nft][nft]).address, ((artist as any)[nft][nft]).artworks[0].token_id)
        artistData.push(data)
    }
    return artistData

}



