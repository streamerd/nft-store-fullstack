import { NextPage } from "next";
import Button from "./Button";

const FeaturedNftsGrid: NextPage<{}> = ({ children }) => {
  return (
    <div className="fmbs-gallery fmbs-page-content">
      <h1 className="fmbs-gallery__header">Featured Artists</h1>
      <div className="fmbs-gallery-grid">{children}</div>
      <Button href="javascript://" value="See all artists" />
    </div>
  );
};

export default FeaturedNftsGrid;
