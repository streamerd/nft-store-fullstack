import { useAddress, useMetamask, useDisconnect } from "@thirdweb-dev/react";
import React from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import fmLogo from '../public/images/fm_logo.png'
import logoText from '../public/images/fm_logo_text.png'
import { disconnect } from "process";

export default function Header() {
  // Helpful thirdweb hooks to connect and manage the wallet from metamask.
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();

  return (
    <div className={`fmbs-header fmbs-bg-wrapper`}>
        <div className={'fmbs-bg fmbs-bg--purple'}></div>
        <div className={'fmbs-header-wrapper fmbs-page-content'}>
          <span  className={'fmbs-page-content'}>
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
                  <div className={'fmbs-header-sub-menu-wrapper fmbs-page-content'}>
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
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.
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
            <button
            className={"fmbs-header__connect"}
            type="button"
            id="walletButton"
            onClick={() => disconnectWallet()}
          >
            Disconnect
          </button>
          ) : (<button
            className={"fmbs-header__connect"}
            type="button"
            id="walletButton"
            onClick={() => connectWithMetamask()}
          >
            Connect
          </button>)
          }
        </div>
      </div>
  );
}
