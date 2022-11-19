import {
  MediaRenderer,
  useMarketplace,
  useNetwork,
  useNetworkMismatch,
} from "@thirdweb-dev/react";

import {
  AuctionListing,
  ChainId,
  DirectListing,
  ListingType,
  NATIVE_TOKENS,
} from "@thirdweb-dev/sdk";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ListingPage: NextPage = () => {
  // Next JS Router hook to redirect to other pages and to grab the query from the URL (listingId)
  const router = useRouter();

  // De-construct listingId out of the router.query.
  // This means that if the user visits /listing/0 then the listingId will be 0.
  // If the user visits /listing/1 then the listingId will be 1.
  const { listingId } = router.query as { listingId: string };

  // Loading flag for the UI, so we can show a loading state while we wait for the data to load.
  const [loadingListing, setLoadingListing] = useState<boolean>(true);

  // Store the bid amount the user entered into the bidding textbox
  const [bidAmount, setBidAmount] = useState<string>("");

  // Storing this listing in a state variable so we can use it in the UI once it's fetched.
  const [listing, setListing] = useState<
    undefined | DirectListing | AuctionListing
  >(undefined);

  // Initialize the marketplace contract
  const marketplace = useMarketplace(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS
  );

  // Hooks to detect user is on the right network and switch them if they are not
  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();

  const enum ImageDimensions {
    width = 368,
    height = 368,
  }

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // When the component mounts, ask the marketplace for the listing with the given listingId
  // Using the listingid from the URL (via router.query)
  useEffect(() => {
    if (!listingId || !marketplace) {
      return;
    }
    (async () => {
      // Pass the listingId into the getListing function to get the listing with the given listingId
      const l = await marketplace.getListing(listingId);

      // Update state accordingly
      setLoadingListing(false);
      setListing(l);
    })();
  }, [listingId, marketplace]);

  if (loadingListing) {
    return <div className={styles.loadingOrError}>Loading...</div>;
  }

  if (!listing) {
    return <div className={styles.loadingOrError}>Listing not found</div>;
  }

  async function createBidOrOffer() {
    try {
      // Ensure user is on the correct network
      if (networkMismatch) {
        switchNetwork && switchNetwork(5);
        return;
      }

      // If the listing type is a direct listing, then we can create an offer.
      if (listing?.type === ListingType.Direct) {
        await marketplace?.direct.makeOffer(
          listingId, // The listingId of the listing we want to make an offer for
          1, // Quantity = 1
          NATIVE_TOKENS[ChainId.Goerli].wrapped.address, // Wrapped Ether address on Rinkeby
          bidAmount // The offer amount the user entered
        );
      }

      // If the listing type is an auction listing, then we can create a bid.
      if (listing?.type === ListingType.Auction) {
        await marketplace?.auction.makeBid(listingId, bidAmount);
      }

      alert(
        `${
          listing?.type === ListingType.Auction ? "Bid" : "Offer"
        } created successfully!`
      );
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  async function buyNft() {
    try {
      // Ensure user is on the correct network
      if (networkMismatch) {
        switchNetwork && switchNetwork(5);
        return;
      }

      // Simple one-liner for buying the NFT
      await marketplace?.buyoutListing(listingId, 1);
      alert("NFT bought successfully!");
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    // <div className={styles.container} style={{}}>
    //   <div className={styles.listingContainer}>

    //     <div className={styles.leftListing}>
    //       {/* <MediaRenderer
    //         src={listing.asset.image}
    //         className={styles.mainNftImage}
    //       /> */}

    //       <video
    //         poster={listing?.asset?.image as string}
    //         width={ImageDimensions.width.toString() + "px"}
    //         height={ImageDimensions.height.toString() + "px"}
    //         src={listing?.asset?.animation_url as string}
    //         controls={true}
    //       />
    //     </div>

    //     <div className={styles.rightListing}>
    //       <h1>{listing.asset.name}</h1>
    //       <p>
    //         Owned by{" "}
    //         <b>
    //           {listing.sellerAddress?.slice(0, 6) +
    //             "..." +
    //             listing.sellerAddress?.slice(36, 40)}
    //         </b>
    //       </p>

    //       <h2>
    //         <b>{listing.buyoutCurrencyValuePerToken.displayValue}</b>{" "}
    //         {listing.buyoutCurrencyValuePerToken.symbol}
    //       </h2>

    //       <div
    //         style={{
    //           display: "flex",
    //           flexDirection: "row",
    //           gap: 20,
    //           alignItems: "center",
    //         }}
    //       >
    //         <button
    //           style={{ borderStyle: "none" }}
    //           className={styles.mainButton}
    //           onClick={buyNft}
    //         >
    //           Buy
    //         </button>
    //         <p style={{ color: "grey" }}>|</p>
    //         <div
    //           style={{
    //             display: "flex",
    //             flexDirection: "row",
    //             alignItems: "center",
    //             gap: 8,
    //           }}
    //         >
    //           <input
    //             type="text"
    //             name="bidAmount"
    //             className={styles.textInput}
    //             onChange={(e) => setBidAmount(e.target.value)}
    //             placeholder="Amount"
    //             style={{ marginTop: 0, marginLeft: 0, width: 128 }}
    //           />
    //           <button
    //             className={styles.mainButton}
    //             onClick={createBidOrOffer}
    //             style={{
    //               borderStyle: "none",
    //               background: "transparent",
    //               width: "fit-content",
    //             }}
    //           >
    //             Make Offer
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className={styles.container} style={{}}>
      <div className={styles.listingContainer}>
        <div className={styles.leftListing}>
          {/* https://mui.com/material-ui/react-card/ */}
          <Card
            sx={{
              maxWidth: "480px",
              marginTop: "62px",
              marginLeft: "36%",
              marginRight: "32%",
            }}
          >
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  DP
                </Avatar>
              }
              // action={
              //   <IconButton aria-label="settings">
              //     <MoreVertIcon />
              //   </IconButton>
              // }
              title={listing.asset.name}
              subheader={
                listing.sellerAddress?.slice(0, 6) +
                "..." +
                listing.sellerAddress?.slice(36, 40)
              }
            />
            <CardMedia
              component="img"
              height="100%"
              width="100%"
              image={listing.asset.image}
              alt={listing.asset.name}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {listing.asset.description}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="buy">
                <ShoppingCartIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Story:</Typography>
                <Typography paragraph>
                  Some story paragraph here Some story paragraph here Some story
                  paragraph here Some story paragraph here Some story paragraph
                  here Some story paragraph here Some story paragraph here Some
                  story paragraph here Some story paragraph here
                </Typography>

                <Typography>finish with some good message to folks</Typography>
              </CardContent>
            </Collapse>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ListingPage;
