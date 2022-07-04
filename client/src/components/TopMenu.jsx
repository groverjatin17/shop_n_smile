import React from "react";
import { Link } from "react-router-dom";
import "../pages/login/loginPage.css";
// import Logo from "../../images/logo.png";
import Logo from "../images/logo.png";
import { useSelector } from "react-redux";

const TopMenu = () => {
    const user = useSelector((state) => state.homepageReducers.user);

    return (
        <React.Fragment>
            <div className="loginNavbar">
                <div className="logo">
                    <a href="index.html">
                        <img src={Logo} alt="logo" width="125px" />
                    </a>
                </div>
                <h1 style={{margin: '0', color: '#ed008d' }}>SHOP N SMILE</h1>
                <nav className="loginNav">
                    <ul id="MenuItems">
                        <li>
                            <Link to="/homepage">Home</Link>
                        </li>
                        <li>
                            <Link to="/">Products</Link>
                        </li>
                        {user?.role === "customer" ? (
                        <li>
                        <Link to="/orders">Orders</Link>
                    </li>
                        ) : (
                            <li>
                            <Link to="/reportingView">Reporting</Link>
                        </li>
                        )}

                        {user?.role === "admin" ? (
                            <li>
                                <Link
                                    to="/inventoryManagement"
                                >
                                    Inventory
                                </Link>
                            </li>
                        ) : (
                            null
                        )}
                        <li>
                            <Link to="/contact-us">Contacts</Link>
                        </li>
                        <li>
                            <a href="account.html">Account</a>
                        </li>
                        {user?.role === "admin" ? (
                            <li>
                                <Link
                                    to="/admin"
                                >
                                    Admin
                                </Link>
                            </li>
                        ) : (
                            null
                        )}
                    </ul>
                </nav>
            </div>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon" />
            </button>
        </React.Fragment>
    );
};

export default TopMenu;
