import { useAddress, useMetamask, useDisconnect } from "@thirdweb-dev/react";
import React from "react";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import fmLogo from "../public/images/fm_logo.png";
import logoText from "../public/images/fm_logo_text.png";
import { Orbis } from "@orbisclub/orbis-sdk";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

const settings = ["Profile", "Account", "Dashboard"];

export default function Header() {
  // Helpful thirdweb hooks to connect and manage the wallet from metamask.
  // const connectWithMetamask = useMetamask();
  // const disconnectWallet = useDisconnect();
  let [address, setAddress] = useState(null);
  let [did, setDid] = useState(null);
  let orbis = new Orbis();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  async function connectToOrbis() {
    let res = await orbis.connect();
    console.log("result from connect >>> ", res);
    setAddress(res.details.metadata.address);
    setDid(res.details.did);
  }

  async function getProfile() {
    let { data, error } = await orbis.getProfile(did);
    data
      ? console.log("profile data >> ", data)
      : console.log("error >> ", error);
  }

  async function walletConnected() {
    let isConnected = await orbis.isConnected();
    return isConnected;
  }

  async function disconnectWallet() {
    let isConnected = await walletConnected();

    if (isConnected) {
      await orbis.logout();
      setAddress(null);
    }
  }

  // async function updateProfile() {
  //   let res = await orbis.updateProfile({
  //     pfp: "https://i.seadn.io/gae/WtwW8sgq8dmeMH_hk5VSE7QK4NnIEHa3L796hQwSJzFnI0E8okltHJ4gsV9pexWmM2N-Rdva7q2HcR4KPaXWmPAHTKbsITVeGogz1w?auto=format&w=1080",
  //     username: "streamerd",
  //     description: "Peacemaker, techie artist",
  //     timestamp: "1666656225",
  //   });

  //   console.log("result from updateProfile >>> ", res);
  // }

  return (
    <div className={`fmbs-header fmbs-bg-wrapper`}>
      <div className={"fmbs-bg fmbs-bg--purple"}></div>
      <div className={"fmbs-header-wrapper fmbs-page-content"}>
        <span className={"fmbs-page-content"}>
          <div className={"fmbs-header__logo-icon"}>
            <Image src={fmLogo} alt="logo" />
          </div>
          <div className={"fmbs-header__logo-text"}>
            <Image src={logoText} alt="logo text" />
          </div>
        </span>

        <nav className={"fmbs-header-nav"}>
          <ul className={"fmbs-header-nav__list"} role="menubar">
            <li className={"fmbs-header-nav__list-item"}>
              <a className={"fmbs-header-nav__list-link"}>[Launches]</a>
              <div className={"fmbs-header-sub-menu"}>
                <div
                  className={"fmbs-header-sub-menu-wrapper fmbs-page-content"}
                >
                  <ul className={"fmbs-header-subnav"} role="menu">
                    <li className={"fmbs-header-subnav__list-item"}>
                      <a className={"fmbs-header-subnav__link"}>[Artists]</a>
                    </li>
                    <li className={"fmbs-header-subnav__list-item"}>
                      <a className={"fmbs-header-subnav__link"}>[Auctions]</a>
                    </li>
                    <li className={"fmbs-header-subnav__list-item"}>
                      <a className={"fmbs-header-subnav__link"}>[Collabs]</a>
                    </li>
                    <li className={"fmbs-header-subnav__list-item"}>
                      <a className={"fmbs-header-subnav__link"}>[Events]</a>
                    </li>
                  </ul>
                  <div className={"fmbs-header-sub-menu-display"}>
                    <div className={"fmbs-header-sub-menu-display__text"}>
                      <h2>[Auction #5]</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </p>
                      <a>[see all]</a>
                    </div>
                    <Image
                      className={"fmbs-header-sub-menu__img"}
                      src="https://www.macmillandictionary.com/external/slideshow/thumb/Grey_thumb.png"
                      alt="grey thumb"
                      height={"160px"}
                      width={"160px"}
                    />
                  </div>
                </div>
              </div>
            </li>
            <li className={"fmbs-header-nav__list-item"}>
              <a
                className={"fmbs-header-nav__list-link"}
                href="https://nft-store-fullstack-thirdweb.vercel.app"
              >
                Marketplace
              </a>
            </li>
            <li className={"fmbs-header-nav__list-item"}>
              <a className={"fmbs-header-nav__list-link"}>About</a>
            </li>
          </ul>
        </nav>
        <div className={"fmbs-header__search-wrapper"}>
          <input
            className={"fmbs-header__search-input"}
            placeholder="Search item here"
          />
        </div>

        {/* todo add disconnect css style for  button */}
        {address ? (
          <>
            <Toolbar disableGutters>
              <Box
                sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
              ></Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="https://i.seadn.io/gae/WtwW8sgq8dmeMH_hk5VSE7QK4NnIEHa3L796hQwSJzFnI0E8okltHJ4gsV9pexWmM2N-Rdva7q2HcR4KPaXWmPAHTKbsITVeGogz1w?auto=format&w=1080"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                  <button
                    className={"fmbs-header__disconnect"}
                    type="button"
                    id="walletButton"
                    onClick={() => disconnectWallet()}
                  >
                    disconnect
                  </button>
                </Menu>
              </Box>
            </Toolbar>
          </>
        ) : (
          <button
            className={"fmbs-header__connect"}
            type="button"
            id="walletButton"
            onClick={() => connectToOrbis()}
          >
            Connect
          </button>
        )}
      </div>
    </div>
  );
}
