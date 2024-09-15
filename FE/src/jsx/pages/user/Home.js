import logo from "../../../assets/images/img/Logo.png";
import menu_btn_1 from "../../../assets/images/icons/menu_btn_1.png";
import close_2 from "../../../assets/images/icons/close_2.png";
import promo_img from "../../../assets/images/img/promo_img.svg";
import promo_shape from "../../../assets/images/img/promo_shape.svg";
import Bar_Chart from "../../../assets/images/icons/Bar_Chart.svg";
import Person from "../../../assets/images/icons/Person.svg";
import Earth from "../../../assets/images/icons/Earth.svg";
import features_big from "../../../assets/images/img/Features/features_big.svg";
import btc from "../../../assets/images/icons/btc.svg";
import eth from "../../../assets/images/icons/eth.svg";
import ltc from "../../../assets/images/icons/ltc.svg";
import graph_1 from "../../../assets/images/img/Benefits/graph_1.svg";
import arrow_top from "../../../assets/images/icons/arrow_top.svg";
import graph_2 from "../../../assets/images/img/Benefits/graph_2.svg";
import increase from "../../../assets/images/icons/increase.svg";
import decrease from "../../../assets/images/icons/decrease.svg";
import visa from "../../../assets/images/icons/visa.svg";
import mastercard from "../../../assets/images/icons/mastercard.svg";
import bitcoin from "../../../assets/images/icons/bitcoin.svg";
import facebook from "../../../assets/images/icons/facebook.svg";
import instagram from "../../../assets/images/icons/instagram.svg";
import youtube from "../../../assets/images/icons/youtube.svg";
import twitter from "../../../assets/images/icons/twitter.svg";
import linkedin from "../../../assets/images/icons/linkedin.svg";
import modal_close from "../../../assets/images/icons/modal_close.png";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import "./style.css";



const Home = () => {
  const [Bar, setBar] = useState(false);
  const [Nav, setNav] = useState(false);
  let openMenu = () => {
    setNav(true);
    setBar(true);
  };
  let closeMenu = () => {
    setNav(false);
    setBar(false);
  };
  window.addEventListener("scroll", function () {
    let header = this.document.querySelector(".header");

    header.classList.toggle("sticky", window.scrollY > 15);
  });

  return (
    <div className="admin">
      <div className="mainea">
        <div>
          <div className="promo">
            <div className="container">
              <header id="myHeader" className="header">
                <div className="header__logo">
                  <Link to="/">
                    <img src={logo} alt="logotype" />
                  </Link>
                </div>
                <div
                  className={
                    Nav ? "header__wrapper menu__active" : "header__wrapper"
                  }
                >
                  <nav className="header__nav">
                    <ul>
                      <li>
                        <a href="#products">Products</a>
                      </li>
                      <li>
                        <a href="#features">Features</a>
                      </li>
                      <li>
                        <a href="#about">About</a>
                      </li>
                      <li>
                        <a href="#contact">Contact</a>
                      </li>
                    </ul>
                  </nav>
                  <div className="header__reg">
                    <Link to="/auth/login">Login</Link>

                    <Link to="/auth/signup" className="linka button">
                      Register
                    </Link>
                  </div>
                </div>
                <div className="header__menu" onClick={openMenu}>
                  <img src={menu_btn_1} alt="menu button" />
                </div>
                <div
                  className={
                    Bar ? "menu__overlay_active menu__overlay" : "menu__overlay"
                  }
                  onClick={closeMenu}
                >
                  <div className="header__close">
                    <img src={close_2} alt="close icon" />
                  </div>
                </div>
              </header>
              <div className="promo__wrapper">
                <div className="promo__content">
                  <div className="promo__sale">
                    <span>Exchange Plus Wallet:</span>
                    Your Comprehensive Crypto Hub
                  </div>
                  <h1 className="promo__header">
                    Unlocking the Future of Finance
                  </h1>
                  <div className="promo__descr">
                    with over $30 billion in transactions. Trusted by Countless
                    Wallets for Crypto Transactions Worth Billions!
                  </div>
                  <div className="promo__link">
                    <a href="#" className="button button_try btn-modal">
                      Try for FREE
                      <span>&gt;</span>
                    </a>
                  </div>
                </div>
                <div className="promo__img">
                  <img
                    className="wow animate__animated animate__pulse animate__slow animate__infinite"
                    src={promo_img}
                    alt="promo"
                  />
                </div>
              </div>
            </div>
            <div className="promo__shape-1">
              <img
                className="wow animate__animated animate__fadeIn"
                src={promo_shape}
                alt="shape"
              />
            </div>
            <div className="promo__shape-2">
              <img
                className="wow animate__animated animate__fadeIn"
                src={promo_shape}
                alt="shape"
              />
            </div>
          </div>
          <section id="features" className="features">
            <div className="container">
              <div className="features__statistic">
                <div className="features__number wow animate__animated animate__fadeIn">
                  <div className="img">
                    <img src={Bar_Chart} alt="diagram icon" />
                  </div>
                  <div className="text">
                    $3B <span>Currency Exchanged</span>
                  </div>
                </div>
                <div className="features__number wow animate__animated animate__fadeIn">
                  <div className="img">
                    <img src={Person} alt="person icon" />
                  </div>
                  <div className="text">
                    250K+ <span>Trusted Wallets</span>
                  </div>
                </div>
                <div className="features__number wow animate__animated animate__fadeIn">
                  <div className="img">
                    <img src={Earth} alt="earth icon" />
                  </div>
                  <div className="text">
                    112 <span>Countries Supported</span>
                  </div>
                </div>
              </div>
              <div className="features__content">
                <div className="features__img">
                  <img
                    className="wow animate__animated animate__pulse animate__slow animate__infinite"
                    src={features_big}
                    alt="illustration"
                  />
                </div>
                <div className="features__text">
                  <h2 className="features__heading">Why choose us?</h2>
                  <p className="features__descr">
                    Embark on the Future of Cryptocurrency: A Platform without
                    Financial Borders, Hidden Fees, or Fake Reviews.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="calculating">
            <div className="container">
              <h2 className="calculating__title wow animate__animated animate__fadeIn">
                Crypto Mining: Estimate Your Potential Earnings
              </h2>
              <p className="calculating__descr wow animate__animated animate__slideInLeft">
                Let's Assess Your Hash Rate to Determine Your Potential Earnings
                for Today's Crypto Mining Activities
              </p>
              <div className="calculating__calc">
                <form className="calculating__form">
                  <input
                    name="rate"
                    type="text"
                    placeholder="Enter your hash rate"
                    required
                  />
                  <select name="select" id="select" required>
                    <option value="TH/s">TH/s</option>
                    <option value="Second option">Second option</option>
                    <option value="Third option">Third option</option>
                  </select>
                  <button className="button button_classic">Calculate</button>
                </form>
                <div className="calculating__info">
                  <div className="calculating__revenue-text">
                    ESTIMATED 24 HOUR REVENUE:
                  </div>
                  <div className="calculating__revenue-val">
                    0.055 130 59 ETH <span>($1275)</span>
                  </div>
                  <div className="calculating__revenue-descr">
                    Revenue will change based on mining difficulty and Ethereum
                    price.
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="products" className="options">
            <div className="container">
              <h2 className="options__title wow animate__animated animate__fadeIn">
                Safely Trade and Access High-Growth <br /> Cryptocurrencies
              </h2>
              <div className="options__wrapper">
                <div className="options__item wow animate__animated animate__bounceInLeft">
                  <div className="options__item-icon">
                    <img src={btc} alt="btc" />
                  </div>
                  <div className="options__item-title">Bitcoin - BTC</div>
                  <div className="options__item-descr">
                    A pioneering digital currency with a transparent record of
                    transactions.
                  </div>

                  <a
                    href="#"
                    className="button button_try options__item-btn btn-modal"
                  >
                    Start mining
                    <span>&gt;</span>
                  </a>
                </div>
                <div className="options__item wow animate__animated animate__bounceIn">
                  <div className="options__item-icon">
                    <img src={eth} alt="eth" />
                  </div>
                  <div className="options__item-title">Ethereum - ETH</div>
                  <div className="options__item-descr">
                    Utilizes blockchain technology for decentralized digital
                    applications.
                  </div>

                  <a
                    href="#"
                    className="button button_try options__item-btn btn-modal"
                  >
                    Start mining
                    <span>&gt;</span>
                  </a>
                </div>
                <div className="options__item wow animate__animated animate__bounceInRight">
                  <div className="options__item-icon">
                    <img src={ltc} alt="ltc" />
                  </div>
                  <div className="options__item-title">Litecoin - LTC</div>
                  <div className="options__item-descr">
                    Facilitating instant payments globally. Join the Litecoin
                    community.
                  </div>

                  <a
                    href="#"
                    className="button button_try options__item-btn btn-modal"
                  >
                    Start mining
                    <span>&gt;</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
          <section id="about" className="benefits">
            <div className="container">
              <h2 className="benefits__title wow animate__animated animate__fadeIn">
                Analyze Market Sentiments, Manage Your Portfolio, and Operate the
                Infrastructure of Your Preference
              </h2>
              <div className="benefits__wrapper">
                <div className="benefits__row">
                  <div className="benefits__text">
                    <h3 className="benefits__name wow animate__animated animate__fadeIn">
                      Invest Wisely:
                    </h3>
                    <div className="benefits__descr wow animate__animated animate__slideInLeft">
                      Access Comprehensive Statistical Insights into Buyer and
                      Seller Behavior to Make Informed Decisions.
                    </div>
                  </div>
                  <div className="benefits__graph">
                    <div className="benefits__graph-top">
                      <div className="benefits__graph-name">
                        <img src={btc} alt="bitcoin" />
                        <div>
                          <h4>
                            Bitcoin <span>BTC</span>
                          </h4>
                          <span>0.00080 BTC</span>
                        </div>
                      </div>
                      <div className="benefits__graph-number">+125%</div>
                    </div>
                    <div className="benefits__graph-vector">
                      <img src={graph_1} alt="graph" />
                    </div>
                    <div className="benefits__graph-extra">
                      <div className="wow animate__animated animate__fadeIn">
                        <span>
                          Increase in <br /> Trade
                        </span>
                        <span>
                          +75% <img src={arrow_top} alt="arrow" />
                        </span>
                        <span>Sell option</span>
                      </div>
                      <div className="wow animate__animated animate__fadeIn">
                        <span>$15.32</span>
                        <span>Price in dollar</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="benefits__row">
                  <div className="benefits__img">
                    <img
                      className="wow animate__animated animate__slideInLeft"
                      src={graph_2}
                      alt="graph"
                    />
                  </div>
                  <div className="benefits__text">
                    <h3 className="benefits__name wow animate__animated animate__fadeIn">
                      Comprehensive Statistics:
                    </h3>
                    <div className="benefits__descr wow animate__animated animate__slideInRight">
                      Access Real-Time Mining Data Anywhere, Anytime, and Select
                      Your Preferred Mining Pools with Confidence.
                    </div>
                  </div>
                </div>
                <div className="benefits__row">
                  <div className="benefits__text">
                    <h3 className="benefits__name wow animate__animated animate__fadeIn">
                      Maximize Your Profit and Monitor Your Investments
                      Effectively
                    </h3>
                    <div className="benefits__descr wow animate__animated animate__slideInLeft">
                      Utilize Advanced Analytical Tools and Clear TradingView
                      Charts to Track Current and Historical Investment
                      Performance.
                    </div>
                  </div>
                  <div className="benefits__table">
                    <div className="benefits__table-row benefits__table-head">
                      <div className="benefits__table-col" />
                      <div className="benefits__table-col">Price</div>
                      <div className="benefits__table-col">Change</div>
                      <div className="benefits__table-col">Volume (24h)</div>
                    </div>
                    <div className="benefits__table-row">
                      <div className="benefits__table-col benefits__table-opt">
                        <img src={btc} alt="bitcoin" />
                        <h4>
                          BTC <br /> <span>Bitcoin</span>
                        </h4>
                      </div>
                      <div className="benefits__table-col">$6750</div>
                      <div className="benefits__table-col benefits__table-incr">
                        <img src={increase} alt />
                        +7.3%
                      </div>
                      <div className="benefits__table-col">$3420214</div>
                    </div>
                    <div className="benefits__table-row">
                      <div className="benefits__table-col benefits__table-opt">
                        <img src={eth} alt="ethereum" />
                        <h4>
                          ETH <br /> <span>Ethereum</span>
                        </h4>
                      </div>
                      <div className="benefits__table-col">$156.83</div>
                      <div className="benefits__table-col benefits__table-decr">
                        <img src={decrease} alt />
                        -0.9%
                      </div>
                      <div className="benefits__table-col">$1812350</div>
                    </div>
                    <div className="benefits__table-row">
                      <div className="benefits__table-col benefits__table-opt">
                        <img src={ltc} alt="bitcoin" />
                        <h4>
                          LTC <br /> <span>Litecoin</span>
                        </h4>
                      </div>
                      <div className="benefits__table-col">$8535</div>
                      <div className="benefits__table-col benefits__table-incr">
                        <img src={increase} alt />
                        +8.2%
                      </div>
                      <div className="benefits__table-col">$5820399</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="contact" className="subscribe">
            <div className="container">
              <div className="subscribe__content">
                <div className="subscibe__text">
                  <div className="subscribe__descr">
                    Join TokenTrade.pro to get the latest news
                  </div>
                </div>
                <form className="subscribe__form">
                  <input type="text" placeholder="Enter your email" required />
                  <button type="submit" className="button button_classic">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </section>
          <footer className="footer">
            <div className="container">
              <div className="footer__main">
                <div className="footer__logo">
                  <Link to="/">
                    <img src={logo} alt="logotype" />
                  </Link>
                </div>
                <div className="footer__menu">
                  <div className="footer__heading">Quick Link</div>
                  <ul>
                    <li>
                      <a href="#">Home</a>
                    </li>
                    <li>
                      <a href="#">Products</a>
                    </li>
                    <li>
                      <a href="#">About</a>
                    </li>
                    <li>
                      <a href="#">Features</a>
                    </li>
                    <li>
                      <a href="#">Contact</a>
                    </li>
                  </ul>
                </div>
                <div className="footer__links">
                  <div className="footer__heading">Resources</div>
                  <ul>
                    <li>
                      <a href="#">Download Whitepapper</a>
                    </li>
                    <li>
                      <a href="#">Smart Token</a>
                    </li>
                    <li>
                      <a href="#">Blockchain Explorer</a>
                    </li>
                    <li>
                      <a href="#">Crypto API</a>
                    </li>
                    <li>
                      <a href="#">Interest</a>
                    </li>
                  </ul>
                </div>
                <div className="footer__payment">
                  <div className="footer__payment-heading">
                    We accept following <br /> payment systems
                  </div>
                  <div className="footer__payment-wrapper">
                    <div className="footer__payment-item">
                      <img src={visa} alt="visa" />
                    </div>
                    <div className="footer__payment-item">
                      <img src={mastercard} alt="mastercard" />
                    </div>
                    <div className="footer__payment-item">
                      <img src={bitcoin} alt="btc" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="footer__bottom">
                <div className="footer__copy">
                  ©2022 CRAPPO. All rights reserved
                </div>
                <div className="footer__social">
                  <a href="#">
                    <img src={facebook} alt="facebook" />
                  </a>
                  <a href="#">
                    <img src={instagram} alt="instagram" />
                  </a>
                  <a href="#">
                    <img src={youtube} alt="youtube" />
                  </a>
                  <a href="#">
                    <img src={twitter} alt="twitter" />
                  </a>
                  <a href="#">
                    <img src={linkedin} alt="linkedin" />
                  </a>
                </div>
              </div>
            </div>
          </footer>
          <div className="modal">
            <div className="modal__overlay" />
            <div className="modal__content">
              <div className="modal__close">
                <img src={modal_close} alt="close button" />
              </div>
              <div className="modal__wrapper">
                <h2 className="modal__title">Sign Up</h2>
                <div className="modal__descr">Sign up and try for free!</div>
                <form className="modal__form">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    required
                  />
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Phone"
                    required
                  />
                  <button type="submit">Send</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
