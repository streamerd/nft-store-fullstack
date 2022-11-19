import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { getTokenMetadata } from "../scripts/Metadata.js";

import Link from "next/link.js";
import { AuctionListing, DirectListing } from "@thirdweb-dev/sdk";
import { SetStateAction } from "react";

interface LightBoxProps {
  width: string;
  height: string;
  backgroundColor: string;
  id: string;
  alt: string;
  listing?: AuctionListing | DirectListing;
  onClose: () => void;
}

const LightBox: NextPage<LightBoxProps> = ({
  width,
  height,
  backgroundColor,
  id,
  alt,
  listing,
  onClose,
}) => {
  return (
    <div className="dialog-overlay">
      <div className="lightbox-container">
        <div
          id={id}
          style={{
            background: backgroundColor,
            height,
            width,
            cursor: "pointer",
          }}
          className="lightbox-image"
        >
          <Image
            src={listing?.asset.image as string}
            width={width}
            height={height}
            placeholder="empty"
            alt={alt}
          />
        </div>
        <div className="lightbox-details">
          <input
            className="button-close"
            type="button"
            value={"close"}
            onClick={() => onClose()}
          />
          <div className="lightbox-info">
            <h2>{listing?.asset.name}</h2>
            <h4>{listing?.sellerAddress}</h4>
            <p>{listing?.asset.description}</p>
          </div>
          <div className="lightbox-buttons">
            <input type="button" value={"[Sold]"} />
            <input type="button" value={"Available on [Secondary]"} />
          </div>
          <div className="lightbox-tags">
            <span>tag 1</span>
            <span>tag 2</span>
            <span>tag 3</span>
          </div>
          <div className="lightbox-footer- buttons">
            <input type="button" value={"[More Info]"} />
            <input type="button" value={"Activity]"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LightBox;
