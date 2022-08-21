
import { NextPage } from "next";
import Button from "./Button";




const FeaturedNftsGrid: NextPage<{}> = ({
  children
}) => {
  return (
    <div className="fmbs-gallery fmbs-page-content">
        <h1 className="fmbs-gallery__header">Featured NFTs</h1>
        {children}
        <Button href="javascript://" value="See all artists" />
      </div>
  );
};

export default FeaturedNftsGrid;

