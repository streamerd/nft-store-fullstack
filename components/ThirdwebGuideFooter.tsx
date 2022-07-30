import styles from "../styles/Thirdweb.module.css";
import React from "react";
import Image from "next/image";

import instagramLogo from '../public/images/instagram.png'
import twitterLogo from '../public/images/twitter.png'
import telegramLogo from '../public/images/telegram.png'
import discordLogo from '../public/images/discord.png'

export default function ThirdwebGuideFooter() {
  const url = "https://github.com/afuturemodern";
  return (
    <>
      {/* <div
        style={{
          position: "fixed",
          bottom: -120,
          right: -80,
          height: 300,
          width: 150,
          border: "1px solid #eaeaea",
          transform: "rotate(45deg)",
          backgroundColor: " #262935",
          cursor: "pointer",
        }}
        role="button"
        onClick={() => window.open(url, "_blank")}
      />

      <div
        style={{
          position: "fixed",
          bottom: 14,
          right: 18,
        }}
      >
        <img
          src={"/github.png"}
          alt="github url"
          width={40}
          height={40}
          role="button"
          style={{ cursor: "pointer" }}
          onClick={() => window.open(url, "_blank")}
        />
      </div> */}
      <div className={[styles['fmbs-footer'], styles['fmbs-bg-wrapper']].join(" ")}>
        <div className={[styles['fmbs-bg'], styles['fmbs-bg--blue']].join(" ")}></div>
        <div className={styles["fmbs-footer-wrapper"]}>
          {/* <div className="fmbs-footer__primary-section fmbs-page-content"> */}
          <div className={[styles['fmbs-footer__primary-section'], styles['fmbs-page-content']].join(" ")}>
            <div className={styles["fmbs-footer-form"]}>
              <h4 className={styles["fmbs-footer-form__header"]}>
                Get the latest updates
              </h4>
              <form className={styles["fmbs-footer-form__input-wrapper"]}>
                <input
                  type="text"
                  className={styles["fmbs-footer-form__input"]}
                  placeholder="Your Email"
                />
                <input
                  type="submit"
                  className={styles["fmbs-footer-form__submit"]}
                  value="Email Me!"
                />
              </form>
            </div>
            <div className={styles["fmbs-footer__link-column"]}>
              <h3>NFT Marketplace</h3>
              <a href="javacript://">Music</a>
              <a href="javacript://">Art</a>
              <a href="javacript://">Video</a>
              <a href="javacript://">Generative</a>
              <a href="javacript://">Category</a>
            </div>
            <div className={styles["fmbs-footer__link-column"]}>
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
            <div className={styles["fmbs-footer__link-column"]}>
              <h3>About</h3>
              <a href="javacript://">About Us</a>
              <a href="javacript://">Responsibility</a>
              <a href="javacript://">Technology & Innovation</a>
              <a href="javacript://">Explore our stories</a>
            </div>
          </div>
          <div className={styles["fmbs-footer__secondary-section"]}>
            {/* <div className="fmbs-footer__secondary-section-wrapper fmbs-page-content"> */}
            <div className={[styles['fmbs-footer__secondary-section-wrapper'], styles['fmbs-page-content']].join(" ")}>
              <p>future modern, Inc. All Rights Reserved</p>
              <div className={styles["fmbs-footer__socials"]}>
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
      </div>
    </>
  );
}
