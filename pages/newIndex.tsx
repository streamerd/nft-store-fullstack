import { NextPage } from "next";
import Image from "next/image";

import fmLogo from '../public/images/fm_logo.png'
import logoText from '../public/images/fm_logo_text.png'
import instagramLogo from '../public/images/instagram.png'
import twitterLogo from '../public/images/twitter.png'
import telegramLogo from '../public/images/telegram.png'
import discordLogo from '../public/images/discord.png'


const newHome: NextPage = () => {
  return (
    <>
      <header>
        <div className="fmbs-bg fmbs-bg--purple"></div>
        <div className="fmbs-header-wrapper fmbs-page-content">
          <span className="fmbs-header__logo">
            <div className="fmbs-header__logo-icon">
              <Image src={fmLogo} alt="logo" />
            </div>
            <div className="fmbs-header__logo-text">
              <Image src={logoText} alt="logo text" />
            </div>
          </span>

          <nav className="fmbs-header-nav">
            <ul className="fmbs-header-nav__list" role="menubar">
              <li className="fmbs-header-nav__list-item">
                <a className="fmbs-header-nav__list-link">[Launches]</a>
                <div className="fmbs-header-sub-menu">
                  <div className="fmbs-header-sub-menu-wrapper fmbs-page-content">
                    <ul className="fmbs-header-subnav" role="menu">
                      <li className="fmbs-header-subnav__list-item">
                        <a className="fmbs-header-subnav__link">[Artists]</a>
                      </li>
                      <li className="fmbs-header-subnav__list-item">
                        <a className="fmbs-header-subnav__link">[Auctions]</a>
                      </li>
                      <li className="fmbs-header-subnav__list-item">
                        <a className="fmbs-header-subnav__link">[Collabs]</a>
                      </li>
                      <li className="fmbs-header-subnav__list-item">
                        <a className="fmbs-header-subnav__link">[Events]</a>
                      </li>
                    </ul>
                    <div className="fmbs-header-sub-menu-display">
                      <div className="fmbs-header-sub-menu-display__text">
                        <h2>[Auction #5]</h2>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.
                        </p>
                        <a>[see all]</a>
                      </div>
                      <Image
                        className="fmbs-header-sub-menu__img"
                        src="https://www.macmillandictionary.com/external/slideshow/thumb/Grey_thumb.png"
                        alt="grey thumb"
                        height={"160px"}
                        width={"160px"}
                      />
                    </div>
                  </div>
                </div>
              </li>
              <li className="fmbs-header-nav__list-item">
                <a
                  className="fmbs-header-nav__list-link"
                  href="https://nft-store-fullstack-thirdweb.vercel.app"
                >
                  Marketplace
                </a>
              </li>
              <li className="fmbs-header-nav__list-item">
                <a className="fmbs-header-nav__list-link">About</a>
              </li>
            </ul>
          </nav>
          <div className="fmbs-header__search-wrapper">
            <input
              className="fmbs-header__search-input"
              placeholder="Search item here"
            />
          </div>
          <div id="wallet">asd</div>

          <button type="button" id="walletButton" onClick={() => {}}>
            Connect Wallet
          </button>
          <button
            className="fmbs-header__connect"
            type="button"
            id="walletButton"
            onClick={() => {}}
          >
            Connect
          </button>
        </div>
      </header>
      <div className="fmbs-bg-wrapper">
        <div className="fmbs-bg fmbs-bg--shapes"></div>
        <div className="fmbs-gallery fmbs-page-content">
          <h1 className="fmbs-gallery__header">Featured NFTs</h1>
          <div className="fmbs-gallery-grid fmbs-gallery--loading"></div>
          <div className="fmbs-gallery__button-wrapper">
            <a className="fmbs-gallery__button" href="javascript://">
              [See all items]
            </a>
          </div>
        </div>
      </div>
      <footer className="fmbs-footer fmbs-bg-wrapper">
        <div className="fmbs-bg fmbs-bg--blue"></div>
        <div className="fmbs-footer-wrapper">
          <div className="fmbs-footer__primary-section fmbs-page-content">
            <div className="fmbs-footer-form">
              <h4 className="fmbs-footer-form__header">
                Get the latest updates
              </h4>
              <form className="fmbs-footer-form__input-wrapper">
                <input
                  type="text"
                  className="fmbs-footer-form__input"
                  placeholder="Your Email"
                />
                <input
                  type="submit"
                  className="fmbs-footer-form__submit"
                  value="Email Me!"
                />
              </form>
            </div>
            <div className="fmbs-footer__link-column">
              <h3>NFT Marketplace</h3>
              <a href="javacript://">Music</a>
              <a href="javacript://">Art</a>
              <a href="javacript://">Video</a>
              <a href="javacript://">Generative</a>
              <a href="javacript://">Category</a>
            </div>
            <div className="fmbs-footer__link-column">
              <h3>Merch</h3>
              <a href="javacript://">Womens</a>
              <a href="javacript://">Mens</a>
              <a href="javacript://">Kids</a>
              <a href="javacript://">Shoes</a>
              <a href="javacript://">Equipment</a>
              <a href="javacript://">By Activity</a>
              <a href="javacript://">Giftcards</a>
              <a href="javacript://">Sale</a>
            </div>
            <div className="fmbs-footer__link-column">
              <h3>About</h3>
              <a href="javacript://">About Us</a>
              <a href="javacript://">Responsibility</a>
              <a href="javacript://">Technology & Innovation</a>
              <a href="javacript://">Explore our stories</a>
            </div>
          </div>
          <div className="fmbs-footer__secondary-section">
            <div className="fmbs-footer__secondary-section-wrapper fmbs-page-content">
              <p>future modern, Inc. All Rights Reserved</p>
              <div className="fmbs-footer__socials">
                <a href="javascript://">
                  <Image src={instagramLogo} alt="image 1" />
                </a>
                <a href="javascript://">
                  <Image src={twitterLogo} alt="image 2" />
                </a>
                <a href="javascript://">
                  <Image src={telegramLogo} alt="image3" />
                </a>
                <a href="javascript://">
                  <Image src={discordLogo} alt="image4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default newHome
