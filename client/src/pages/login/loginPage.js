import * as React from "react";
import Box from "@mui/material/Box";
import withRoot from '../common/modules/withRoot';
import Typography from '@mui/material/Typography';

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "./loginPage.css";
import Img2 from "../../images/img2.png";
import Logo from "../../images/logo.png";
import Cart from "../../images/cart.png";
import PlayStore from "../../images/play-store.png";
import AppStore from "../../images/app-store.png";
import Register from "./register";
import Login from "./login";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function WelcomeSection() {
    const [value, setValue] = React.useState(0);

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            "aria-controls": `simple-tabpanel-${index}`,
        };
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <React.Fragment>
            <div className="accout-page">
                <div className="loginArea">
                    <div className="loginRow">
                        <div className="login-col-2">
                            <img src={Img2} width="200%" alt="img2" />
                        </div>
                        <div className="login-col-2">
                            <div className="login-form-container">
                                <div>
                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                    >
                                        <Tab
                                            label="Register"
                                            {...a11yProps(0)}
                                        />
                                        <Tab
                                            label="Login"
                                            {...a11yProps(1)}
                                        />
                                    </Tabs>
                                    <TabPanel value={value} index={0}>
                                        <Register moveToLogin={setValue}/>
                                    </TabPanel>
                                    <TabPanel value={value} index={1}>
                                        <Login />
                                    </TabPanel>
                                </div>

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
                                    Download App for Android and ios mobile
                                    phone.
                                </p>
                                <div className="app-logo">
                                    <img src={PlayStore} alt="PlayStore" />
                                    <img src={AppStore} alt="AppStore" />
                                </div>
                            </div>
                            <div className="login-footer-col2">
                                <img
                                    src="Images/logo-white.jpg"
                                    alt="logoWhite"
                                />
                                <p>
                                    Our Purpose Is To Sustainably Make the
                                    Pleasure and Benefits of Sports Accessible
                                    to the Many.
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
                            <a href="https://www.youtube.com/c/EasyTutorialsVideo?sub_confirmation=1">
                                Copyright 2021
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default withRoot(WelcomeSection);
