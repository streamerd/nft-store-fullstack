import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import {
  MediaRenderer,
  useActiveListings,
  useMarketplace,
} from "@thirdweb-dev/react";
import ImageBox from "../components/ImageBox";
import FeaturedNftsGrid from "../components/FeaturedNftsGrid";
import bg from "../public/images/shapes_bg.png";
import { AuctionListing, DirectListing } from "@thirdweb-dev/sdk";
import { useState } from "react";
import LightBox from "../components/LightBox";

const enum ImageDimensions {
  width = 368,
  height = 368,
}

const Home: NextPage = () => {
  // Connect your marketplace smart contract here (replace this address)
  const marketplace = useMarketplace(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS // Your marketplace contract address here
  );

  const {
    data: listings,
    isLoading: loadingListings,
    isFetchedAfterMount,
    isRefetching,
  } = useActiveListings(marketplace, {
    // limits amount of nfts to 9 in the featured artists grid
    count: 9,
  });

  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<
    AuctionListing | DirectListing
  >();

  const handleImageTypes = (listing: AuctionListing | DirectListing) =>
    listing.asset.image?.endsWith(".png") ||
    listing.asset.image?.endsWith(".jpeg") ||
    listing.asset.image?.endsWith(".jpg");

  const handleGetListingMediaType = (
    listing: AuctionListing | DirectListing
  ): JSX.Element => {
    if (listing.asset.animation_url?.endsWith(".mp4")) {
      return (
        <video
          poster={listing?.asset?.image as string}
          width={ImageDimensions.width.toString() + "px"}
          height={ImageDimensions.height.toString() + "px"}
          src={listing?.asset?.animation_url as string}
          controls={true}
        />
      );
    } else if (handleImageTypes(listing)) {
      return (
        <ImageBox
          width={ImageDimensions.width.toString() + "px"}
          height={ImageDimensions.height.toString() + "px"}
          src={listing?.asset?.image as string}
          id={listing.id}
          backgroundColor={"#111111FF"}
          alt={listing.asset.name || "Art"}
        />
      );
    } else return <span>media not supported</span>;
  };

  const handleClickImageGridItem = (
    listing: AuctionListing | DirectListing
  ) => {
    setIsLightBoxOpen(() => {
      setSelectedListing(listing);
      return true;
    });
  };

  const imageGridItems = listings?.map((listing) => {
    return (
      <>
        <div
          key={listing.id}
          className={"fmbs-gallery-grid-item"}
          onClick={() => handleClickImageGridItem(listing)}
        >
          {handleGetListingMediaType(listing)}
          <h4>{listing.asset.name}</h4>
        </div>
      </>
    );
  });

  return (
    <>
      <div className="fmbs-bg-wrapper">
        <div
          className="fmbs-bg"
          style={{
            backgroundImage: `url(${bg.src})`,
            backgroundSize: `100% auto`,
          }}
        ></div>
        <div className="fmbs-gallery fmbs-page-content">
          <>
            {loadingListings ? (
              <div>Loading listings...</div>
            ) : (
              <FeaturedNftsGrid>{imageGridItems}</FeaturedNftsGrid>
            )}
          </>
        </div>
      </div>
      {isLightBoxOpen && (
        <LightBox
          alt={selectedListing?.asset.name as string}
          backgroundColor="blue"
          height={ImageDimensions.height + "px"}
          width={ImageDimensions.width + "px"}
          id="lightbox-dialog"
          listing={selectedListing}
          onClose={() => setIsLightBoxOpen(false)}
        />
      )}
    </>
  );
};

export default Home;
