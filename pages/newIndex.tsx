import { GetServerSideProps, NextPage } from "next";
import { getTokenMetadata } from "../scripts/Metadata.js";

import fmLogo from "../public/images/fm_logo.png";
import Link from "next/link";

import afututuremodern from "../data/LaunchArtists/afuturemodern.json";
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
import { useActiveListings, useMarketplace } from "@thirdweb-dev/react";

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
        src={(igd?.rawMetadata?.external_url as string) || fmLogo.src}
      />
      <h3>{igd.rawMetadata?.name || "not found"}</h3>
      <p>{igd.rawMetadata?.description || "not found"}</p>
    </>
  ));

  const enum ImageDimensions {
    width = 368,
    height = 368,
  }
  
  const marketplace = useMarketplace(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS
  );
  const { data: listings, isLoading: loadingListings } =
    useActiveListings(marketplace);

  return (
    <div className="fmbs-bg-wrapper">
      <div className="fmbs-bg fmbs-bg--shapes"></div>
      <div className="fmbs-gallery fmbs-page-content">
        <h1 className="fmbs-gallery__header">Featured NFTs</h1>

        <>
          {
            loadingListings ? (
              <div>Loading listings...</div>
            ) : (
              <div>
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

      <FeaturedNftsGrid>{imageGridItems}</FeaturedNftsGrid>
    </div>
  );
};

export default NewHome;
