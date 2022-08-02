import { NextPage } from "next";
import Image from "next/image";
import {getTokenMetadata} from "../scripts/Metadata.js"
import {useEffect, useState} from "react";

import afututuremodern from "../data/LaunchArtists/afuturemodern.json"
import { Nft } from "@alch/alchemy-sdk";

// (getTokenMetadata(address, id)) ==> data from the token?


const NewHome: NextPage = () => {
  
  const [tokenMetaData, setTokenMetaData] = useState<Nft | null>(null)


  useEffect(() => { 
    const run = async () => {
      const result: Nft = await getTokenMetadata(afututuremodern.afuturemodern.artworks[0].token_address, afututuremodern.afuturemodern.artworks[0].token_id)
      setTokenMetaData(result)
    }
    run()
  }, [])

  return (
      <div className="fmbs-bg-wrapper">
        <div className="fmbs-bg fmbs-bg--shapes"></div>
        <div className="fmbs-gallery fmbs-page-content">
          <h1 className="fmbs-gallery__header">Featured NFTs</h1>
          <>
          { tokenMetaData ? tokenMetaData?.description : <div className="fmbs-gallery-grid fmbs-gallery--loading"></div>}
          </>
          <div className="fmbs-gallery__button-wrapper">
            <a className="fmbs-gallery__button" href="javascript://">
              [See all items]
            </a>
          </div>
        </div>
      </div>
  );
};

export default NewHome
