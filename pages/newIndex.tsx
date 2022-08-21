import { GetServerSideProps, NextPage } from "next";
import { getTokenMetadata } from "../scripts/Metadata.js";

import fmLogo from '../public/images/fm_logo.png'

import afututuremodern from "../data/LaunchArtists/afuturemodern.json";
// import paris from "../data/LaunchArtists/ParisOG.json"
import { Nft } from "@alch/alchemy-sdk";
import ImageBox from "../components/ImageBox";
import Button from "../components/Button";
import { handleGetNftData } from "../data/handleGetNftData";
import FeaturedNftsGrid from "../components/FeaturedNftsGrid";

interface NewHomeProps {
  nftData: Nft;
  imageGalleryData: Nft[];
}

const enum ImageDimensions {
  width = 368,
  height = 368,
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

  const imageGalleryData = await handleGetNftData();
  
  return {
    props: {
      nftData: JSON.parse(JSON.stringify(nftData)),
      imageGalleryData: JSON.parse(JSON.stringify(imageGalleryData)),
    },
  };
};

const NewHome: NextPage<NewHomeProps> = ({ nftData, imageGalleryData }) => {
  const imageGridItems = imageGalleryData?.map((igd, i) => (
    <>
      <ImageBox
        key={i}
        width="300px"
        height="300px"
        alt={igd.title}
        backgroundColor="#C4C4C4"
        id={igd.title}
        src={igd?.rawMetadata?.external_url as string || fmLogo.src}
      />
      <h3>{igd.rawMetadata?.name || 'not found'}</h3>
      <p>{igd.rawMetadata?.description || 'not found'}</p>
    </>
  ));

  return (
    <div className="fmbs-bg-wrapper">
      <div className="fmbs-bg fmbs-bg--shapes"></div>
      <div className="fmbs-gallery fmbs-page-content">
        <h1 className="fmbs-gallery__header">Featured NFTs</h1>

        <>
          {nftData ? (
            <>
              <h2>{nftData?.rawMetadata?.name}</h2>
              <p>{nftData?.description}</p>
              {
                <ImageBox
                  id="ImageComponent"
                  backgroundColor="#C4C4C4"
                  height={ImageDimensions.height.toString() + "px"}
                  width={ImageDimensions.width.toString() + "px"}
                  alt="featured"
                  src={nftData?.rawMetadata?.image as string}
                />
              }
            </>
          ) : (
            <div className="fmbs-gallery-grid fmbs-gallery--loading"></div>
          )}
          <Button href="javascript://" value="Browse" />
        </>
      </div>
      <FeaturedNftsGrid >
      {imageGridItems}
      </FeaturedNftsGrid>
    </div>
  );
};

export default NewHome;
