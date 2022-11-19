import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { getTokenMetadata } from "../scripts/Metadata.js";

import afututuremodern from "../data/LaunchArtists/afuturemodern.json";
// import paris from "../data/LaunchArtists/ParisOG.json"
import { Nft } from "@alch/alchemy-sdk";
import Link from "next/link.js";

interface ImageBoxProps {
  width: string;
  height: string;
  backgroundColor: string;
  id: string;
  alt: string;
  src: string;
  className?: string | undefined;
}

const ImageBox: NextPage<ImageBoxProps> = ({
  width,
  height,
  backgroundColor,
  id,
  alt,
  src,
  className,
}) => {
  return (
    <div
      id={id}
      style={{
        background: backgroundColor,
        height,
        width,
        cursor: "pointer",
      }}
      className={className}
    >
      <Image
        src={src}
        width={width}
        height={height}
        placeholder="empty"
        alt={alt}
      />
    </div>
  );
};

export default ImageBox;
