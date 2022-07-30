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
    <div className={`${styles['fmbs-header']} 'fmbs-bg-wrapper'}`}>
        <div className={'fmbs-bg fmbs-bg--purple'}></div>
        <div className={[styles['fmbs-header-wrapper'], styles['fmbs-page-content']].join(" ")}>
          <span  className={'fmbs-page-content'}>
            <div className={styles["fmbs-header__logo-icon"]}>
              <Image src={fmLogo} alt="logo" />
            </div>
            <div className={styles["fmbs-header__logo-text"]}>
              <Image src={logoText} alt="logo text" />
            </div>
          </span>

          <nav className={styles["fmbs-header-nav"]}>
            <ul className={styles["fmbs-header-nav__list"]} role="menubar">
              <li className={styles["fmbs-header-nav__list-item"]}>
                <a className={styles["fmbs-header-nav__list-link"]}>[Launches]</a>
                <div className={styles["fmbs-header-sub-menu"]}>
                  <div className={[styles['fmbs-header-sub-menu-wrapper'], styles['fmbs-page-content']].join(" ")}>
                    <ul className={styles["fmbs-header-subnav"]} role="menu">
                      <li className={styles["fmbs-header-subnav__list-item"]}>
                        <a className={styles["fmbs-header-subnav__link"]}>[Artists]</a>
                      </li>
                      <li className={styles["fmbs-header-subnav__list-item"]}>
                        <a className={styles["fmbs-header-subnav__link"]}>[Auctions]</a>
                      </li>
                      <li className={styles["fmbs-header-subnav__list-item"]}>
                        <a className={styles["fmbs-header-subnav__link"]}>[Collabs]</a>
                      </li>
                      <li className={styles["fmbs-header-subnav__list-item"]}>
                        <a className={styles["fmbs-header-subnav__link"]}>[Events]</a>
                      </li>
                    </ul>
                    <div className={styles["fmbs-header-sub-menu-display"]}>
                      <div className={styles["fmbs-header-sub-menu-display__text"]}>
                        <h2>[Auction #5]</h2>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.
                        </p>
                        <a>[see all]</a>
                      </div>
                      <Image
                        className={styles["fmbs-header-sub-menu__img"]}
                        src="https://www.macmillandictionary.com/external/slideshow/thumb/Grey_thumb.png"
                        alt="grey thumb"
                        height={"160px"}
                        width={"160px"}
                      />
                    </div>
                  </div>
                </div>
              </li>
              <li className={styles["fmbs-header-nav__list-item"]}>
                <a
                  className={styles["fmbs-header-nav__list-link"]}
                  href="https://nft-store-fullstack-thirdweb.vercel.app"
                >
                  Marketplace
                </a>
              </li>
              <li className={styles["fmbs-header-nav__list-item"]}>
                <a className={styles["fmbs-header-nav__list-link"]}>About</a>
              </li>
            </ul>
          </nav>
          <div className={styles["fmbs-header__search-wrapper"]}>
            <input
              className={styles["fmbs-header__search-input"]}
              placeholder="Search item here"
            />
          </div>
          
          {/* todo add disconnect css style for  button */}
          {address ? (
            <button
            className={styles["fmbs-header__connect"]}
            type="button"
            id="walletButton"
            onClick={() => disconnectWallet()}
          >
            Disconnect
          </button>
          ) : (<button
            className={styles["fmbs-header__connect"]}
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
