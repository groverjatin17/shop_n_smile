import * as React from "react";
import Puma from "../../images/puma.png";
import UsPolo from "../../images/Us-polo.jpg";
import Armani from "../../images/Armani.jpg";
import DG from "../../images/DG.jpg";
import Conestoga from "../../images/Conestoga.jpg";
import PlayStore from "../../images/play-store.png";
import AppStore from "../../images/app-store.png";
import Imgi from "../../images/img1.jpg";

import "./home.css";

function Index() {
    return (
        <React.Fragment>
            <div className="myHeader">
                <div className="myContainer">
                    <div className="myRow">
                        <div className="myCol-2">
                            <h1>Give your life A New Style!</h1>
                            <p>
                                Welcome to Shop And Smile
                                <br />
                                hard work gains success.Looks makes you more
                                perect.
                            </p>
                            <a className="anchor muButton" href="#">
                                Explore Now
                            </a>
                        </div>
                        <div className="myCol-2">
                            <img src={Imgi} alt="img1" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="brands">
                <div className="small-container">
                    <div className="myRow">
                        <div className="myCol-5">
                            <img src={Puma} alt="puma" />
                        </div>
                        <div className="myCol-5">
                            <img src={UsPolo} alt="uspolo" />
                        </div>
                        <div className="myCol-5">
                            <img src={Armani} alt="armani" />
                        </div>
                        <div className="myCol-5">
                            <img src={DG} alt="dg" />
                        </div>
                        <div className="myCol-5">
                            <img src={Conestoga} alt="conestoga" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="login-footer">
                <div className="loginArea">
                    <div className="loginRow">
                        <div className="login-footer-col1">
                            <h3>Download Our App</h3>
                            <p>
                                Download App for Android and ios mobile phone.
                            </p>
                            <div className="app-logo">
                                <img src={PlayStore} alt="PlayStore" />
                                <img src={AppStore} alt="AppStore" />
                            </div>
                        </div>
                        <div className="login-footer-col2">
                            <img src="Images/logo-white.jpg" alt="logoWhite" />
                            <p>
                                Our Purpose Is To Sustainably Make the Pleasure
                                and Benefits of Sports Accessible to the Many.
                            </p>
                        </div>
                        <div className="login-footer-col3">
                            <h3>Useful Links</h3>
                            <ul>
                                <li>Coupons</li>
                                <li>Blog Post</li>
                                <li>Return Policy</li>
                                <li>Join Affiliate</li>
                            </ul>
                        </div>
                        <div className="login-footer-col4">
                            <h3>Follow Us</h3>
                            <ul>
                                <li>Facebook</li>
                                <li>Twitter</li>
                                <li>Instagram</li>
                                <li>YouTube</li>
                            </ul>
                        </div>
                    </div>
                    <hr />
                    <p className="copyright">
                        <a className="anchor" href="https://www.youtube.com/c/EasyTutorialsVideo?sub_confirmation=1">
                            Copyright 2021
                        </a>
                    </p>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Index;
