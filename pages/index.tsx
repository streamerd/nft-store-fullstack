import type { GetServerSideProps, NextPage } from "next";
import { getTokenMetadata } from "../scripts/Metadata.js";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import {
  MediaRenderer,
  useActiveListings,
  useMarketplace,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import ImageBox from "../components/ImageBox";
import Button from "../components/Button";
import { handleGetNftData } from "../data/handleGetNftData";
import FeaturedNftsGrid from "../components/FeaturedNftsGrid";
import fmLogo from "../public/images/fm_logo.png";
import { Nft } from "@alch/alchemy-sdk";
import afututuremodern from "../data/LaunchArtists/afuturemodern.json";

const enum ImageDimensions {
  width = 368,
  height = 368,
}

interface NewHomeProps {
  nftData: Nft;
  imageGalleryData: Nft[];
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

const Home: NextPage<NewHomeProps> = ({ imageGalleryData, nftData }) => {
  const router = useRouter();

  // Connect your marketplace smart contract here (replace this address)
  const marketplace = useMarketplace(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS // Your marketplace contract address here
  );

  const { data: listings, isLoading: loadingListings } =
    useActiveListings(marketplace);

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

  return (
    <div className="fmbs-bg-wrapper">
      <div className="fmbs-bg fmbs-bg--shapes"></div>
      <div className="fmbs-gallery fmbs-page-content">
        <>
          {loadingListings ? (
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
          )}
          <Button href="javascript://" value="Browse" />
        </>
      </div>
      <FeaturedNftsGrid>{imageGridItems}</FeaturedNftsGrid>
    </div>
  );
};

export default Home;
