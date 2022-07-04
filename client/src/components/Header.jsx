import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import { ReactComponent as IconCart3 } from "bootstrap-icons/icons/cart3.svg";
import { ReactComponent as IconPersonBadgeFill } from "bootstrap-icons/icons/person-badge-fill.svg";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { ReactComponent as IconListCheck } from "bootstrap-icons/icons/list-check.svg";
import { ReactComponent as IconDoorClosedFill } from "bootstrap-icons/icons/door-closed-fill.svg";
import { ReactComponent as IconHeartFill } from "bootstrap-icons/icons/heart-fill.svg";
import { ReactComponent as IconBellFill } from "bootstrap-icons/icons/bell-fill.svg";
import { ReactComponent as IconInfoCircleFill } from "bootstrap-icons/icons/info-circle-fill.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Header = () => {
    const dispatch = useDispatch();
    const cartProducts = useSelector(
        (state) => state.homepageReducers.cartProducts
    );
    const user = useSelector((state) => state.homepageReducers.user);
    console.log("🚀 ~ Header ~ user", user);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <React.Fragment>
            <header className="p-3 border-bottom bg-light">
                <div className="container-fluid">
                    <div className="row g-3 d-flex justify-content-end">
                        {/* <div className="col-md-3 text-center">
              <Link to="/">
                <img
                  alt="logo"
                  src="../../images/logo.webp"
                />
              </Link>
            </div> */}
                        <div className="col-md-5">
                            <Search />
                        </div>
                        <div className="col-md-4 d-flex justify-content-end">
                            <div className="position-relative d-inline me-3">
                                <Link to="/cart" className="btn btn-primary">
                                    <IconCart3 className="i-va" />
                                    <div className="position-absolute top-0 left-100 translate-middle badge bg-danger rounded-circle">
                                        {cartProducts.length}
                                    </div>
                                </Link>
                            </div>
                            <div className="btn-group ">
                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "left",
                                    }}
                                >
                                    <div className="d-flex flex-column justify-content-center align-items-center mb-2">
                                        {user ? (
                                            <div
                                                className="m-3 "
                                                style={{ width: "120px" }}
                                            >
                                                <div className="flex">
                                                    <span className="fw-bold">
                                                        Name:{" "}
                                                    </span>
                                                    <span>
                                                        {user?.userName}
                                                    </span>
                                                </div>
                                                <div className="flex">
                                                    <span className="fw-bold">
                                                        Role:{" "}
                                                    </span>
                                                    <span>{user?.role}</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div style={{ padding: "10px" }}>
                                                Kindly Login
                                            </div>
                                        )}
                                        {user ? (
                                            <Link
                                                to="/login"
                                                onClick={() => {
                                                    dispatch({
                                                        type: "USER",
                                                        payload: null,
                                                    });
                                                }}
                                            >
                                                <Button variant="contained">
                                                    Logout
                                                </Button>
                                            </Link>
                                        ) : (
                                            <Link to="/login">
                                                {" "}
                                                <Button variant="contained">
                                                    Login
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                </Popover>
                                <button
                                    type="button"
                                    className="btn btn-secondary rounded-circle border me-3 dropdown-toggle1"
                                    data-toggle="dropdown"
                                    aria-expanded="false"
                                    aria-label="Profile"
                                    onClick={handleClick}
                                >
                                    <FontAwesomeIcon
                                        icon={faUser}
                                        className="text-light"
                                    />
                                </button>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to="/account/profile"
                                        >
                                            <IconPersonBadgeFill /> My Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to="/star/zone"
                                        >
                                            <IconStarFill className="text-warning" />{" "}
                                            Star Zone
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to="/account/orders"
                                        >
                                            <IconListCheck className="text-primary" />{" "}
                                            Orders
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to="/account/wishlist"
                                        >
                                            <IconHeartFill className="text-danger" />{" "}
                                            Wishlist
                                        </Link>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to="/account/notification"
                                        >
                                            <IconBellFill className="text-primary" />{" "}
                                            Notification
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="dropdown-item"
                                            to="/support"
                                        >
                                            <IconInfoCircleFill className="text-success" />{" "}
                                            Support
                                        </Link>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/">
                                            <IconDoorClosedFill className="text-danger" />{" "}
                                            Logout
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            {/* <a
                href="https://www.buymeacoffee.com/bhaumik"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                  alt="BuyMeACoffee" width="120"
                />
              </a> */}
                            {/* <Link to="/account/signin">Sign In</Link> |{" "}
              <Link to="/account/signup"> Sign Up</Link> */}
                        </div>
                    </div>
                </div>
            </header>
        </React.Fragment>
    );
};
export default Header;
