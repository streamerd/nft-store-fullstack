import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { getTokenMetadata } from "../scripts/Metadata.js";
import { useEffect, useState } from "react";
import Link from "next/link";

import afututuremodern from "../data/LaunchArtists/afuturemodern.json";
// import paris from "../data/LaunchArtists/ParisOG.json"
import { Nft } from "@alch/alchemy-sdk";
interface NewHomeProps {
  nftData: Nft;
}
import {
  useActiveListings,
  useMarketplace,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";



export const getStaticProps: GetServerSideProps<NewHomeProps> = async (
  context
) => {
  // Call an external API endpoint to get posts.


  
  const nftData =
    (await getTokenMetadata(
      afututuremodern.afuturemodern.artworks[0].token_address,
      afututuremodern.afuturemodern.artworks[0].token_id
    )) || null;

  console.log(JSON.stringify(nftData));
  return {
    props: {
      nftData: JSON.parse(JSON.stringify(nftData)),
    },
  };
};

const NewHome: NextPage<NewHomeProps> = ({ nftData }) => {
  const enum ImageDimensions {
    width = 368,
    height = 368,
  }
    // process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS
  const marketplace = useMarketplace(
    "0x93bFDdcAC61259831e5Fd5362b49dd35d16eFd18" 
  );
  const { data: listings, isLoading: loadingListings } =
  useActiveListings(marketplace);
  
  // console.log("marketplace addr:", JSON.stringify(process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS))

  
  console.log("listings:", JSON.stringify(listings))



  return (
    <div className="fmbs-bg-wrapper">
      <div className="fmbs-bg fmbs-bg--shapes"></div>
      <div className="fmbs-gallery fmbs-page-content">
        <h1 className="fmbs-gallery__header">Featured NFTs</h1>

        <>
          {/* {nftData ? (
            <>
              <h2>{nftData?.rawMetadata?.name}</h2>
              <p>{nftData?.description}</p>
              {
                // <ImageBox
                //   id="ImageComponent"
                //   backgroundColor="#C4C4C4"
                //   height={ImageDimensions.height.toString() + "px"}
                //   width={ImageDimensions.width.toString() + "px"}
                //   alt="featured"
                //   src={nftData?.media[0].gateway as string}
                // />
            
                <video
                width={ImageDimensions.width.toString() + "px"}
                height={ImageDimensions.height.toString() + "px"}
                src={nftData?.media[0].gateway as string}
                controls={true}
              />
              }
            </>
          ) : (
            <div className="fmbs-gallery-grid fmbs-gallery--loading"></div>
          )} */}

{
            // If the listings are loading, show a loading message
            loadingListings ? (
              <div>Loading listings...</div>
            ) : (
              // Otherwise, show the listings
              <div >
                {listings?.map((listing) => (
                  <div
                    key={listing.id}
                    // className={styles.listingShortView}
                    // onClick={() => router.push(`/listing/${listing.id}`)}
                  >
                   <>
              {/* <h2>{nftData?.rawMetadata?.name}</h2> */}
              {/* <h2>{listing?.asset?.name}</h2> */}

              <h2>
                      <Link href={`/listing/${listing.id}`}>
                        <a>{listing.asset.name}</a>
                      </Link>
                    </h2>

              <p>{listing?.asset?.description}</p>
              {
          
            
               
                <video
                poster={listing?.asset?.image as string}
                width={ImageDimensions.width.toString() + "px"}
                height={ImageDimensions.height.toString() + "px"}
                src={listing?.asset?.animation_url as string}
                controls={true}
              />
              }
            </>
                 

                    <p>
                      <b>{listing.buyoutCurrencyValuePerToken.displayValue}</b>{" "}
                      {listing.buyoutCurrencyValuePerToken.symbol}
                    </p>
                  </div>
                ))}
              </div>
            )
          }

          <div className="fmbs-gallery__button-wrapper">
            <a className="fmbs-gallery__button" href="javascript://">
              Browse
            </a>
          </div>
        </>
      </div>
    </div>
  );
};

export default NewHome;
