import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { getTokenMetadata } from "../scripts/Metadata.js";
import { useEffect, useState } from "react";

import afututuremodern from "../data/LaunchArtists/afuturemodern.json";
// import paris from "../data/LaunchArtists/ParisOG.json"
import { Nft } from "@alch/alchemy-sdk";

interface NewHomeProps {
  nftData: Nft;
}

export const getStaticProps: GetServerSideProps<NewHomeProps> = async (
  context
) => {
  // Call an external API endpoint to get posts.
  const nftData =
    (await getTokenMetadata(
      afututuremodern.afuturemodern.artworks[0].token_address,
      afututuremodern.afuturemodern.artworks[0].token_id
    )) || null;

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

  return (
    <div className="fmbs-bg-wrapper">
      <div className="fmbs-bg fmbs-bg--shapes"></div>
      <div className="fmbs-gallery fmbs-page-content">
        {/* <h1 className="fmbs-gallery__header">Featured NFTs</h1> */}

        <>
          {nftData ? (
            <>
              <h2>{nftData?.rawMetadata?.name}</h2>
              <p>{nftData?.description}</p>
              {
                <div
                  id='ImageComponent'
                  style={{
                    background: "#C4C4C4",
                    height: ImageDimensions.height.toString() + "px",
                    width: ImageDimensions.width.toString() + "px",
                  }}
                >
                  <Image
                    src={nftData?.rawMetadata?.image as string}
                    width={ImageDimensions.width + "px"}
                    height={ImageDimensions.height + "px"}
                    color="#C4C4C4"
                    placeholder="empty"
                    alt="featured"
                  />
                </div>
              }
            </>
          ) : (
            <div className="fmbs-gallery-grid fmbs-gallery--loading"></div>
          )}
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
