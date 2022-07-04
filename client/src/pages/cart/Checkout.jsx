import React, { useState } from "react";
import { ReactComponent as IconEnvelope } from "bootstrap-icons/icons/envelope.svg";
import { ReactComponent as IconTruck } from "bootstrap-icons/icons/truck.svg";
import { ReactComponent as IconReceipt } from "bootstrap-icons/icons/receipt.svg";
import { ReactComponent as IconCreditCard2Front } from "bootstrap-icons/icons/credit-card-2-front.svg";
import { ReactComponent as IconCart3 } from "bootstrap-icons/icons/cart3.svg";
import { useSelector } from "react-redux";
import axios from "../../helpers/axios";
import { Redirect } from "react-router";
import validator from "validator";

export default function CheckoutView() {
    const cartProducts = useSelector(
        (state) => state.homepageReducers.cartProducts
    );
    const user = useSelector((state) => state.homepageReducers.user);

    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [isSuccessPage, moveToSuccess] = useState(false);
    const productsBought = {};
    cartProducts.forEach(function (x) {
        productsBought[x] = {
            quantity: (productsBought[x]?.quantity || 0) + 1,
        };
    });
    const [info, setInfo] = useState({
        products: productsBought,
        orderId: Math.floor(Math.random() * 100000),
    });
    const products = useSelector((state) => state.homepageReducers.products);

    const productsWithQuantity = {};

    const findProduct = (productId) => {
        const tempProducts = products.slice(0);
        return tempProducts.filter(
            (product) => product.productId === productId
        )[0];
    };
    let tempObject = {};

    const handleForm = (e) => {
        e.preventDefault();
        tempObject = JSON.parse(JSON.stringify(info));
        tempObject[e.target.name] = e.target.value;
        tempObject["customerId"] = user?.userId;
        setInfo(tempObject);

        if (e.target.name === "sameShipping" && e.target.checked) {
            tempObject["billingName"] = tempObject["name"];
            tempObject["billingAddress1"] = tempObject["address1"];
            tempObject["billingAddress2"] = tempObject["address2"];
            tempObject["billingCountry"] = tempObject["country"];
            tempObject["billingProvince"] = tempObject["province"];
            tempObject["billingZip"] = tempObject["zip"];
            setInfo(tempObject);
            setIsDisabled(true);
        } else if (e.target.name === "sameShipping" && !e.target.checked) {
            setIsDisabled(false);
        }
    };
    const checkout = async () => {
        Object.keys(info).forEach((element) => {
            if (element === "email") {
                if (!validator.isEmail(info[element])) {
                    setEmailError("Please enter a valid email");
                }
            }
            if (element === "phone") {
                if (!validator.isMobilePhone(info[element], "en-CA")) {
                    setPhoneError("Please enter a valid phone number");
                }
            }
            if (element === "cardNumber") {
                if (!validator.isLength(info[element], { min: 16, max: 16 })) {
                    console.log("Credit Card error");
                    // setPhoneError("Please enter a valid phone number");
                }
            }
            if (element === "cvv") {
                if (!validator.isLength(info[element], { min: 3, max: 3 })) {
                    console.log("cvv error");
                    // setPhoneError("Please enter a valid phone number");
                }
            }
            if (element === "expirationMonth") {
                if (info[element] > 0 && info[element] <= 12) {

                    console.log("month error");
                    // setPhoneError("Please enter a valid phone number");
                }
            }
            if (element === "expirationYear") {
                if (!validator.isLength(info[element], { min: 4, max: 4 }) && info[element] > new Date().getFullYear()) {
                    console.log("year error");
                    // setPhoneError("Please enter a valid phone number");
                }
            }
        });
        if (
            Object.keys(info).includes("email") &&
            Object.keys(info).includes("phone") &&
            Object.keys(info).includes("cardNumber") &&
            Object.keys(info).includes("name") &&
            Object.keys(info).includes("address1") &&
            Object.keys(info).includes("address2") &&
            Object.keys(info).includes("country") &&
            Object.keys(info).includes("province") &&
            Object.keys(info).includes("zip") &&
            Object.keys(info).includes("nameOnCard") &&
            Object.keys(info).includes("expirationMonth") &&
            Object.keys(info).includes("expirationYear") &&
            Object.keys(info).includes("cvv")
        ) {
            console.log("All Fields are there.");
        } else {
            console.log("SOme field is missing. Kindly add it");
        }
        const counts = {};
        cartProducts.forEach(function (x) {
            counts[x] = (counts[x] || 0) + 1;
        });
        try {
            const result = await axios.post(
                `http://localhost:5000/orders`,
                info
            );
            if (result) {
                if (result.status === 201) {
                    // props.moveToLogin(1);
                    Object.keys(counts).map(async (key) => {
                        await axios.put(
                            `http://localhost:5000/products/updateProducts`,
                            {
                                productId: key,
                                quantity: Math.abs(counts[key]) * -1,
                            }
                        );
                        moveToSuccess(true);
                    });
                }
            }
        } catch (error) {
            console.log("🚀 ~ checkout ~ error", error);
        }
    };

    let totalPrice = 0;
    cartProducts.forEach(function (x) {
        productsWithQuantity[x] = {
            quantity: (productsWithQuantity[x]?.quantity || 0) + 1,
            product: findProduct(x),
        };
        totalPrice = totalPrice + findProduct(x).price;
    });

    const tax = (totalPrice * 0.13).toFixed(2);
    const amountWithTaxes = parseFloat(totalPrice) + parseFloat(tax);

    return (
        <React.Fragment>
            {isSuccessPage ? (
                <Redirect to="/orderPlaced" />
            ) : (
                <React.Fragment>
                    <div className="bg-secondary border-top p-4 text-white mb-3">
                        <h1 className="display-6">Checkout</h1>
                    </div>
                    <div className="container mb-3">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="card mb-3">
                                    <div className="card-header">
                                        <IconEnvelope className="i-va" />{" "}
                                        Contact Info
                                    </div>
                                    <div className="card-body">
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    placeholder="Email Address"
                                                    aria-label="Email Address"
                                                    name="email"
                                                    onChange={handleForm}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <input
                                                    type="tel"
                                                    className="form-control"
                                                    placeholder="Phone no"
                                                    aria-label="phone no"
                                                    name="phone"
                                                    onChange={handleForm}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card mb-3">
                                    <div className="card-header">
                                        <IconTruck className="i-va" /> Shipping
                                        Infomation
                                    </div>
                                    <div className="card-body">
                                        <div className="row g-3">
                                            <div className="col-md-12">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Name"
                                                    required
                                                    name="name"
                                                    onChange={handleForm}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Addresss"
                                                    required
                                                    name="address1"
                                                    onChange={handleForm}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Address 2 (Optional)"
                                                    name="address2"
                                                    onChange={handleForm}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <select
                                                    className="form-select"
                                                    required
                                                    onChange={handleForm}
                                                    name="country"
                                                >
                                                    <option value>
                                                        -- Country --
                                                    </option>
                                                    <option value="Afganistan">
                                                        Afghanistan
                                                    </option>
                                                    <option value="Albania">
                                                        Albania
                                                    </option>
                                                    <option value="Algeria">
                                                        Algeria
                                                    </option>
                                                    <option value="American Samoa">
                                                        American Samoa
                                                    </option>
                                                    <option value="Andorra">
                                                        Andorra
                                                    </option>
                                                    <option value="Angola">
                                                        Angola
                                                    </option>
                                                    <option value="Anguilla">
                                                        Anguilla
                                                    </option>
                                                    <option value="Antigua & Barbuda">
                                                        Antigua & Barbuda
                                                    </option>
                                                    <option value="Argentina">
                                                        Argentina
                                                    </option>
                                                    <option value="Armenia">
                                                        Armenia
                                                    </option>
                                                    <option value="Aruba">
                                                        Aruba
                                                    </option>
                                                    <option value="Australia">
                                                        Australia
                                                    </option>
                                                    <option value="Austria">
                                                        Austria
                                                    </option>
                                                    <option value="Azerbaijan">
                                                        Azerbaijan
                                                    </option>
                                                    <option value="Bahamas">
                                                        Bahamas
                                                    </option>
                                                    <option value="Bahrain">
                                                        Bahrain
                                                    </option>
                                                    <option value="Bangladesh">
                                                        Bangladesh
                                                    </option>
                                                    <option value="Barbados">
                                                        Barbados
                                                    </option>
                                                    <option value="Belarus">
                                                        Belarus
                                                    </option>
                                                    <option value="Belgium">
                                                        Belgium
                                                    </option>
                                                    <option value="Belize">
                                                        Belize
                                                    </option>
                                                    <option value="Benin">
                                                        Benin
                                                    </option>
                                                    <option value="Bermuda">
                                                        Bermuda
                                                    </option>
                                                    <option value="Bhutan">
                                                        Bhutan
                                                    </option>
                                                    <option value="Bolivia">
                                                        Bolivia
                                                    </option>
                                                    <option value="Bonaire">
                                                        Bonaire
                                                    </option>
                                                    <option value="Bosnia & Herzegovina">
                                                        Bosnia & Herzegovina
                                                    </option>
                                                    <option value="Botswana">
                                                        Botswana
                                                    </option>
                                                    <option value="Brazil">
                                                        Brazil
                                                    </option>
                                                    <option value="British Indian Ocean Ter">
                                                        British Indian Ocean Ter
                                                    </option>
                                                    <option value="Brunei">
                                                        Brunei
                                                    </option>
                                                    <option value="Bulgaria">
                                                        Bulgaria
                                                    </option>
                                                    <option value="Burkina Faso">
                                                        Burkina Faso
                                                    </option>
                                                    <option value="Burundi">
                                                        Burundi
                                                    </option>
                                                    <option value="Cambodia">
                                                        Cambodia
                                                    </option>
                                                    <option value="Cameroon">
                                                        Cameroon
                                                    </option>
                                                    <option value="Canada">
                                                        Canada
                                                    </option>
                                                    <option value="Canary Islands">
                                                        Canary Islands
                                                    </option>
                                                    <option value="Cape Verde">
                                                        Cape Verde
                                                    </option>
                                                    <option value="Cayman Islands">
                                                        Cayman Islands
                                                    </option>
                                                    <option value="Central African Republic">
                                                        Central African Republic
                                                    </option>
                                                    <option value="Chad">
                                                        Chad
                                                    </option>
                                                    <option value="Channel Islands">
                                                        Channel Islands
                                                    </option>
                                                    <option value="Chile">
                                                        Chile
                                                    </option>
                                                    <option value="China">
                                                        China
                                                    </option>
                                                    <option value="Christmas Island">
                                                        Christmas Island
                                                    </option>
                                                    <option value="Cocos Island">
                                                        Cocos Island
                                                    </option>
                                                    <option value="Colombia">
                                                        Colombia
                                                    </option>
                                                    <option value="Comoros">
                                                        Comoros
                                                    </option>
                                                    <option value="Congo">
                                                        Congo
                                                    </option>
                                                    <option value="Cook Islands">
                                                        Cook Islands
                                                    </option>
                                                    <option value="Costa Rica">
                                                        Costa Rica
                                                    </option>
                                                    <option value="Cote DIvoire">
                                                        Cote DIvoire
                                                    </option>
                                                    <option value="Croatia">
                                                        Croatia
                                                    </option>
                                                    <option value="Cuba">
                                                        Cuba
                                                    </option>
                                                    <option value="Curaco">
                                                        Curacao
                                                    </option>
                                                    <option value="Cyprus">
                                                        Cyprus
                                                    </option>
                                                    <option value="Czech Republic">
                                                        Czech Republic
                                                    </option>
                                                    <option value="Denmark">
                                                        Denmark
                                                    </option>
                                                    <option value="Djibouti">
                                                        Djibouti
                                                    </option>
                                                    <option value="Dominica">
                                                        Dominica
                                                    </option>
                                                    <option value="Dominican Republic">
                                                        Dominican Republic
                                                    </option>
                                                    <option value="East Timor">
                                                        East Timor
                                                    </option>
                                                    <option value="Ecuador">
                                                        Ecuador
                                                    </option>
                                                    <option value="Egypt">
                                                        Egypt
                                                    </option>
                                                    <option value="El Salvador">
                                                        El Salvador
                                                    </option>
                                                    <option value="Equatorial Guinea">
                                                        Equatorial Guinea
                                                    </option>
                                                    <option value="Eritrea">
                                                        Eritrea
                                                    </option>
                                                    <option value="Estonia">
                                                        Estonia
                                                    </option>
                                                    <option value="Ethiopia">
                                                        Ethiopia
                                                    </option>
                                                    <option value="Falkland Islands">
                                                        Falkland Islands
                                                    </option>
                                                    <option value="Faroe Islands">
                                                        Faroe Islands
                                                    </option>
                                                    <option value="Fiji">
                                                        Fiji
                                                    </option>
                                                    <option value="Finland">
                                                        Finland
                                                    </option>
                                                    <option value="France">
                                                        France
                                                    </option>
                                                    <option value="French Guiana">
                                                        French Guiana
                                                    </option>
                                                    <option value="French Polynesia">
                                                        French Polynesia
                                                    </option>
                                                    <option value="French Southern Ter">
                                                        French Southern Ter
                                                    </option>
                                                    <option value="Gabon">
                                                        Gabon
                                                    </option>
                                                    <option value="Gambia">
                                                        Gambia
                                                    </option>
                                                    <option value="Georgia">
                                                        Georgia
                                                    </option>
                                                    <option value="Germany">
                                                        Germany
                                                    </option>
                                                    <option value="Ghana">
                                                        Ghana
                                                    </option>
                                                    <option value="Gibraltar">
                                                        Gibraltar
                                                    </option>
                                                    <option value="Great Britain">
                                                        Great Britain
                                                    </option>
                                                    <option value="Greece">
                                                        Greece
                                                    </option>
                                                    <option value="Greenland">
                                                        Greenland
                                                    </option>
                                                    <option value="Grenada">
                                                        Grenada
                                                    </option>
                                                    <option value="Guadeloupe">
                                                        Guadeloupe
                                                    </option>
                                                    <option value="Guam">
                                                        Guam
                                                    </option>
                                                    <option value="Guatemala">
                                                        Guatemala
                                                    </option>
                                                    <option value="Guinea">
                                                        Guinea
                                                    </option>
                                                    <option value="Guyana">
                                                        Guyana
                                                    </option>
                                                    <option value="Haiti">
                                                        Haiti
                                                    </option>
                                                    <option value="Hawaii">
                                                        Hawaii
                                                    </option>
                                                    <option value="Honduras">
                                                        Honduras
                                                    </option>
                                                    <option value="Hong Kong">
                                                        Hong Kong
                                                    </option>
                                                    <option value="Hungary">
                                                        Hungary
                                                    </option>
                                                    <option value="Iceland">
                                                        Iceland
                                                    </option>
                                                    <option value="Indonesia">
                                                        Indonesia
                                                    </option>
                                                    <option value="India">
                                                        India
                                                    </option>
                                                    <option value="Iran">
                                                        Iran
                                                    </option>
                                                    <option value="Iraq">
                                                        Iraq
                                                    </option>
                                                    <option value="Ireland">
                                                        Ireland
                                                    </option>
                                                    <option value="Isle of Man">
                                                        Isle of Man
                                                    </option>
                                                    <option value="Israel">
                                                        Israel
                                                    </option>
                                                    <option value="Italy">
                                                        Italy
                                                    </option>
                                                    <option value="Jamaica">
                                                        Jamaica
                                                    </option>
                                                    <option value="Japan">
                                                        Japan
                                                    </option>
                                                    <option value="Jordan">
                                                        Jordan
                                                    </option>
                                                    <option value="Kazakhstan">
                                                        Kazakhstan
                                                    </option>
                                                    <option value="Kenya">
                                                        Kenya
                                                    </option>
                                                    <option value="Kiribati">
                                                        Kiribati
                                                    </option>
                                                    <option value="Korea North">
                                                        Korea North
                                                    </option>
                                                    <option value="Korea Sout">
                                                        Korea South
                                                    </option>
                                                    <option value="Kuwait">
                                                        Kuwait
                                                    </option>
                                                    <option value="Kyrgyzstan">
                                                        Kyrgyzstan
                                                    </option>
                                                    <option value="Laos">
                                                        Laos
                                                    </option>
                                                    <option value="Latvia">
                                                        Latvia
                                                    </option>
                                                    <option value="Lebanon">
                                                        Lebanon
                                                    </option>
                                                    <option value="Lesotho">
                                                        Lesotho
                                                    </option>
                                                    <option value="Liberia">
                                                        Liberia
                                                    </option>
                                                    <option value="Libya">
                                                        Libya
                                                    </option>
                                                    <option value="Liechtenstein">
                                                        Liechtenstein
                                                    </option>
                                                    <option value="Lithuania">
                                                        Lithuania
                                                    </option>
                                                    <option value="Luxembourg">
                                                        Luxembourg
                                                    </option>
                                                    <option value="Macau">
                                                        Macau
                                                    </option>
                                                    <option value="Macedonia">
                                                        Macedonia
                                                    </option>
                                                    <option value="Madagascar">
                                                        Madagascar
                                                    </option>
                                                    <option value="Malaysia">
                                                        Malaysia
                                                    </option>
                                                    <option value="Malawi">
                                                        Malawi
                                                    </option>
                                                    <option value="Maldives">
                                                        Maldives
                                                    </option>
                                                    <option value="Mali">
                                                        Mali
                                                    </option>
                                                    <option value="Malta">
                                                        Malta
                                                    </option>
                                                    <option value="Marshall Islands">
                                                        Marshall Islands
                                                    </option>
                                                    <option value="Martinique">
                                                        Martinique
                                                    </option>
                                                    <option value="Mauritania">
                                                        Mauritania
                                                    </option>
                                                    <option value="Mauritius">
                                                        Mauritius
                                                    </option>
                                                    <option value="Mayotte">
                                                        Mayotte
                                                    </option>
                                                    <option value="Mexico">
                                                        Mexico
                                                    </option>
                                                    <option value="Midway Islands">
                                                        Midway Islands
                                                    </option>
                                                    <option value="Moldova">
                                                        Moldova
                                                    </option>
                                                    <option value="Monaco">
                                                        Monaco
                                                    </option>
                                                    <option value="Mongolia">
                                                        Mongolia
                                                    </option>
                                                    <option value="Montserrat">
                                                        Montserrat
                                                    </option>
                                                    <option value="Morocco">
                                                        Morocco
                                                    </option>
                                                    <option value="Mozambique">
                                                        Mozambique
                                                    </option>
                                                    <option value="Myanmar">
                                                        Myanmar
                                                    </option>
                                                    <option value="Nambia">
                                                        Nambia
                                                    </option>
                                                    <option value="Nauru">
                                                        Nauru
                                                    </option>
                                                    <option value="Nepal">
                                                        Nepal
                                                    </option>
                                                    <option value="Netherland Antilles">
                                                        Netherland Antilles
                                                    </option>
                                                    <option value="Netherlands">
                                                        Netherlands (Holland,
                                                        Europe)
                                                    </option>
                                                    <option value="Nevis">
                                                        Nevis
                                                    </option>
                                                    <option value="New Caledonia">
                                                        New Caledonia
                                                    </option>
                                                    <option value="New Zealand">
                                                        New Zealand
                                                    </option>
                                                    <option value="Nicaragua">
                                                        Nicaragua
                                                    </option>
                                                    <option value="Niger">
                                                        Niger
                                                    </option>
                                                    <option value="Nigeria">
                                                        Nigeria
                                                    </option>
                                                    <option value="Niue">
                                                        Niue
                                                    </option>
                                                    <option value="Norfolk Island">
                                                        Norfolk Island
                                                    </option>
                                                    <option value="Norway">
                                                        Norway
                                                    </option>
                                                    <option value="Oman">
                                                        Oman
                                                    </option>
                                                    <option value="Pakistan">
                                                        Pakistan
                                                    </option>
                                                    <option value="Palau Island">
                                                        Palau Island
                                                    </option>
                                                    <option value="Palestine">
                                                        Palestine
                                                    </option>
                                                    <option value="Panama">
                                                        Panama
                                                    </option>
                                                    <option value="Papua New Guinea">
                                                        Papua New Guinea
                                                    </option>
                                                    <option value="Paraguay">
                                                        Paraguay
                                                    </option>
                                                    <option value="Peru">
                                                        Peru
                                                    </option>
                                                    <option value="Phillipines">
                                                        Philippines
                                                    </option>
                                                    <option value="Pitcairn Island">
                                                        Pitcairn Island
                                                    </option>
                                                    <option value="Poland">
                                                        Poland
                                                    </option>
                                                    <option value="Portugal">
                                                        Portugal
                                                    </option>
                                                    <option value="Puerto Rico">
                                                        Puerto Rico
                                                    </option>
                                                    <option value="Qatar">
                                                        Qatar
                                                    </option>
                                                    <option value="Republic of Montenegro">
                                                        Republic of Montenegro
                                                    </option>
                                                    <option value="Republic of Serbia">
                                                        Republic of Serbia
                                                    </option>
                                                    <option value="Reunion">
                                                        Reunion
                                                    </option>
                                                    <option value="Romania">
                                                        Romania
                                                    </option>
                                                    <option value="Russia">
                                                        Russia
                                                    </option>
                                                    <option value="Rwanda">
                                                        Rwanda
                                                    </option>
                                                    <option value="St Barthelemy">
                                                        St Barthelemy
                                                    </option>
                                                    <option value="St Eustatius">
                                                        St Eustatius
                                                    </option>
                                                    <option value="St Helena">
                                                        St Helena
                                                    </option>
                                                    <option value="St Kitts-Nevis">
                                                        St Kitts-Nevis
                                                    </option>
                                                    <option value="St Lucia">
                                                        St Lucia
                                                    </option>
                                                    <option value="St Maarten">
                                                        St Maarten
                                                    </option>
                                                    <option value="St Pierre & Miquelon">
                                                        St Pierre & Miquelon
                                                    </option>
                                                    <option value="St Vincent & Grenadines">
                                                        St Vincent & Grenadines
                                                    </option>
                                                    <option value="Saipan">
                                                        Saipan
                                                    </option>
                                                    <option value="Samoa">
                                                        Samoa
                                                    </option>
                                                    <option value="Samoa American">
                                                        Samoa American
                                                    </option>
                                                    <option value="San Marino">
                                                        San Marino
                                                    </option>
                                                    <option value="Sao Tome & Principe">
                                                        Sao Tome & Principe
                                                    </option>
                                                    <option value="Saudi Arabia">
                                                        Saudi Arabia
                                                    </option>
                                                    <option value="Senegal">
                                                        Senegal
                                                    </option>
                                                    <option value="Seychelles">
                                                        Seychelles
                                                    </option>
                                                    <option value="Sierra Leone">
                                                        Sierra Leone
                                                    </option>
                                                    <option value="Singapore">
                                                        Singapore
                                                    </option>
                                                    <option value="Slovakia">
                                                        Slovakia
                                                    </option>
                                                    <option value="Slovenia">
                                                        Slovenia
                                                    </option>
                                                    <option value="Solomon Islands">
                                                        Solomon Islands
                                                    </option>
                                                    <option value="Somalia">
                                                        Somalia
                                                    </option>
                                                    <option value="South Africa">
                                                        South Africa
                                                    </option>
                                                    <option value="Spain">
                                                        Spain
                                                    </option>
                                                    <option value="Sri Lanka">
                                                        Sri Lanka
                                                    </option>
                                                    <option value="Sudan">
                                                        Sudan
                                                    </option>
                                                    <option value="Suriname">
                                                        Suriname
                                                    </option>
                                                    <option value="Swaziland">
                                                        Swaziland
                                                    </option>
                                                    <option value="Sweden">
                                                        Sweden
                                                    </option>
                                                    <option value="Switzerland">
                                                        Switzerland
                                                    </option>
                                                    <option value="Syria">
                                                        Syria
                                                    </option>
                                                    <option value="Tahiti">
                                                        Tahiti
                                                    </option>
                                                    <option value="Taiwan">
                                                        Taiwan
                                                    </option>
                                                    <option value="Tajikistan">
                                                        Tajikistan
                                                    </option>
                                                    <option value="Tanzania">
                                                        Tanzania
                                                    </option>
                                                    <option value="Thailand">
                                                        Thailand
                                                    </option>
                                                    <option value="Togo">
                                                        Togo
                                                    </option>
                                                    <option value="Tokelau">
                                                        Tokelau
                                                    </option>
                                                    <option value="Tonga">
                                                        Tonga
                                                    </option>
                                                    <option value="Trinidad & Tobago">
                                                        Trinidad & Tobago
                                                    </option>
                                                    <option value="Tunisia">
                                                        Tunisia
                                                    </option>
                                                    <option value="Turkey">
                                                        Turkey
                                                    </option>
                                                    <option value="Turkmenistan">
                                                        Turkmenistan
                                                    </option>
                                                    <option value="Turks & Caicos Is">
                                                        Turks & Caicos Is
                                                    </option>
                                                    <option value="Tuvalu">
                                                        Tuvalu
                                                    </option>
                                                    <option value="Uganda">
                                                        Uganda
                                                    </option>
                                                    <option value="United Kingdom">
                                                        United Kingdom
                                                    </option>
                                                    <option value="Ukraine">
                                                        Ukraine
                                                    </option>
                                                    <option value="United Arab Erimates">
                                                        United Arab Emirates
                                                    </option>
                                                    <option value="United States of America">
                                                        United States of America
                                                    </option>
                                                    <option value="Uraguay">
                                                        Uruguay
                                                    </option>
                                                    <option value="Uzbekistan">
                                                        Uzbekistan
                                                    </option>
                                                    <option value="Vanuatu">
                                                        Vanuatu
                                                    </option>
                                                    <option value="Vatican City State">
                                                        Vatican City State
                                                    </option>
                                                    <option value="Venezuela">
                                                        Venezuela
                                                    </option>
                                                    <option value="Vietnam">
                                                        Vietnam
                                                    </option>
                                                    <option value="Virgin Islands (Brit)">
                                                        Virgin Islands (Brit)
                                                    </option>
                                                    <option value="Virgin Islands (USA)">
                                                        Virgin Islands (USA)
                                                    </option>
                                                    <option value="Wake Island">
                                                        Wake Island
                                                    </option>
                                                    <option value="Wallis & Futana Is">
                                                        Wallis & Futana Is
                                                    </option>
                                                    <option value="Yemen">
                                                        Yemen
                                                    </option>
                                                    <option value="Zaire">
                                                        Zaire
                                                    </option>
                                                    <option value="Zambia">
                                                        Zambia
                                                    </option>
                                                    <option value="Zimbabwe">
                                                        Zimbabwe
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="col-md-4">
                                                <select
                                                    className="form-select"
                                                    required
                                                    name="province"
                                                    onChange={handleForm}
                                                >
                                                    <option value>
                                                        -- State --
                                                    </option>
                                                    <option value="AB">
                                                        Alberta
                                                    </option>
                                                    <option value="BC">
                                                        British Columbia
                                                    </option>
                                                    <option value="MB">
                                                        Manitoba
                                                    </option>
                                                    <option value="NB">
                                                        New Brunswick
                                                    </option>
                                                    <option value="NL">
                                                        Newfoundland and
                                                        Labrador
                                                    </option>
                                                    <option value="NS">
                                                        Nova Scotia
                                                    </option>
                                                    <option value="NT">
                                                        Northwest Territories
                                                    </option>
                                                    <option value="NU">
                                                        Nunavut
                                                    </option>
                                                    <option value="ON">
                                                        Ontario
                                                    </option>
                                                    <option value="PE">
                                                        Prince Edward Island
                                                    </option>
                                                    <option value="QC">
                                                        Quebec
                                                    </option>
                                                    <option value="SK">
                                                        Saskatchewan
                                                    </option>
                                                    <option value="YT">
                                                        Yukon
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="col-md-4">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Zip"
                                                    required
                                                    name="zip"
                                                    onChange={handleForm}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card mb-3">
                                    <div className="card-header">
                                        <IconReceipt className="i-va" /> Billing
                                        Infomation
                                        <div className="form-check form-check-inline ml-3">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                defaultValue
                                                id="flexCheckDefault"
                                                onChange={handleForm}
                                                name="sameShipping"
                                                checked={isDisabled}
                                            />
                                            <label
                                                className="form-check-label"
                                                htmlFor="flexCheckDefault"
                                            >
                                                Same as Shipping Infomation
                                            </label>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="row g-3">
                                            <div className="col-md-12">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Name"
                                                    required
                                                    name="billingName"
                                                    onChange={handleForm}
                                                    disabled={isDisabled}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Addresss"
                                                    required
                                                    name="billingAddress1"
                                                    onChange={handleForm}
                                                    disabled={isDisabled}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Address 2 (Optional)"
                                                    name="billingAddress2"
                                                    onChange={handleForm}
                                                    disabled={isDisabled}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <select
                                                    className="form-select"
                                                    required
                                                    name="billingCountry"
                                                    onChange={handleForm}
                                                    disabled={isDisabled}
                                                >
                                                    <option value>
                                                        -- Country --
                                                    </option>
                                                    <option value="Afganistan">
                                                        Afghanistan
                                                    </option>
                                                    <option value="Albania">
                                                        Albania
                                                    </option>
                                                    <option value="Algeria">
                                                        Algeria
                                                    </option>
                                                    <option value="American Samoa">
                                                        American Samoa
                                                    </option>
                                                    <option value="Andorra">
                                                        Andorra
                                                    </option>
                                                    <option value="Angola">
                                                        Angola
                                                    </option>
                                                    <option value="Anguilla">
                                                        Anguilla
                                                    </option>
                                                    <option value="Antigua & Barbuda">
                                                        Antigua & Barbuda
                                                    </option>
                                                    <option value="Argentina">
                                                        Argentina
                                                    </option>
                                                    <option value="Armenia">
                                                        Armenia
                                                    </option>
                                                    <option value="Aruba">
                                                        Aruba
                                                    </option>
                                                    <option value="Australia">
                                                        Australia
                                                    </option>
                                                    <option value="Austria">
                                                        Austria
                                                    </option>
                                                    <option value="Azerbaijan">
                                                        Azerbaijan
                                                    </option>
                                                    <option value="Bahamas">
                                                        Bahamas
                                                    </option>
                                                    <option value="Bahrain">
                                                        Bahrain
                                                    </option>
                                                    <option value="Bangladesh">
                                                        Bangladesh
                                                    </option>
                                                    <option value="Barbados">
                                                        Barbados
                                                    </option>
                                                    <option value="Belarus">
                                                        Belarus
                                                    </option>
                                                    <option value="Belgium">
                                                        Belgium
                                                    </option>
                                                    <option value="Belize">
                                                        Belize
                                                    </option>
                                                    <option value="Benin">
                                                        Benin
                                                    </option>
                                                    <option value="Bermuda">
                                                        Bermuda
                                                    </option>
                                                    <option value="Bhutan">
                                                        Bhutan
                                                    </option>
                                                    <option value="Bolivia">
                                                        Bolivia
                                                    </option>
                                                    <option value="Bonaire">
                                                        Bonaire
                                                    </option>
                                                    <option value="Bosnia & Herzegovina">
                                                        Bosnia & Herzegovina
                                                    </option>
                                                    <option value="Botswana">
                                                        Botswana
                                                    </option>
                                                    <option value="Brazil">
                                                        Brazil
                                                    </option>
                                                    <option value="British Indian Ocean Ter">
                                                        British Indian Ocean Ter
                                                    </option>
                                                    <option value="Brunei">
                                                        Brunei
                                                    </option>
                                                    <option value="Bulgaria">
                                                        Bulgaria
                                                    </option>
                                                    <option value="Burkina Faso">
                                                        Burkina Faso
                                                    </option>
                                                    <option value="Burundi">
                                                        Burundi
                                                    </option>
                                                    <option value="Cambodia">
                                                        Cambodia
                                                    </option>
                                                    <option value="Cameroon">
                                                        Cameroon
                                                    </option>
                                                    <option value="Canada">
                                                        Canada
                                                    </option>
                                                    <option value="Canary Islands">
                                                        Canary Islands
                                                    </option>
                                                    <option value="Cape Verde">
                                                        Cape Verde
                                                    </option>
                                                    <option value="Cayman Islands">
                                                        Cayman Islands
                                                    </option>
                                                    <option value="Central African Republic">
                                                        Central African Republic
                                                    </option>
                                                    <option value="Chad">
                                                        Chad
                                                    </option>
                                                    <option value="Channel Islands">
                                                        Channel Islands
                                                    </option>
                                                    <option value="Chile">
                                                        Chile
                                                    </option>
                                                    <option value="China">
                                                        China
                                                    </option>
                                                    <option value="Christmas Island">
                                                        Christmas Island
                                                    </option>
                                                    <option value="Cocos Island">
                                                        Cocos Island
                                                    </option>
                                                    <option value="Colombia">
                                                        Colombia
                                                    </option>
                                                    <option value="Comoros">
                                                        Comoros
                                                    </option>
                                                    <option value="Congo">
                                                        Congo
                                                    </option>
                                                    <option value="Cook Islands">
                                                        Cook Islands
                                                    </option>
                                                    <option value="Costa Rica">
                                                        Costa Rica
                                                    </option>
                                                    <option value="Cote DIvoire">
                                                        Cote DIvoire
                                                    </option>
                                                    <option value="Croatia">
                                                        Croatia
                                                    </option>
                                                    <option value="Cuba">
                                                        Cuba
                                                    </option>
                                                    <option value="Curaco">
                                                        Curacao
                                                    </option>
                                                    <option value="Cyprus">
                                                        Cyprus
                                                    </option>
                                                    <option value="Czech Republic">
                                                        Czech Republic
                                                    </option>
                                                    <option value="Denmark">
                                                        Denmark
                                                    </option>
                                                    <option value="Djibouti">
                                                        Djibouti
                                                    </option>
                                                    <option value="Dominica">
                                                        Dominica
                                                    </option>
                                                    <option value="Dominican Republic">
                                                        Dominican Republic
                                                    </option>
                                                    <option value="East Timor">
                                                        East Timor
                                                    </option>
                                                    <option value="Ecuador">
                                                        Ecuador
                                                    </option>
                                                    <option value="Egypt">
                                                        Egypt
                                                    </option>
                                                    <option value="El Salvador">
                                                        El Salvador
                                                    </option>
                                                    <option value="Equatorial Guinea">
                                                        Equatorial Guinea
                                                    </option>
                                                    <option value="Eritrea">
                                                        Eritrea
                                                    </option>
                                                    <option value="Estonia">
                                                        Estonia
                                                    </option>
                                                    <option value="Ethiopia">
                                                        Ethiopia
                                                    </option>
                                                    <option value="Falkland Islands">
                                                        Falkland Islands
                                                    </option>
                                                    <option value="Faroe Islands">
                                                        Faroe Islands
                                                    </option>
                                                    <option value="Fiji">
                                                        Fiji
                                                    </option>
                                                    <option value="Finland">
                                                        Finland
                                                    </option>
                                                    <option value="France">
                                                        France
                                                    </option>
                                                    <option value="French Guiana">
                                                        French Guiana
                                                    </option>
                                                    <option value="French Polynesia">
                                                        French Polynesia
                                                    </option>
                                                    <option value="French Southern Ter">
                                                        French Southern Ter
                                                    </option>
                                                    <option value="Gabon">
                                                        Gabon
                                                    </option>
                                                    <option value="Gambia">
                                                        Gambia
                                                    </option>
                                                    <option value="Georgia">
                                                        Georgia
                                                    </option>
                                                    <option value="Germany">
                                                        Germany
                                                    </option>
                                                    <option value="Ghana">
                                                        Ghana
                                                    </option>
                                                    <option value="Gibraltar">
                                                        Gibraltar
                                                    </option>
                                                    <option value="Great Britain">
                                                        Great Britain
                                                    </option>
                                                    <option value="Greece">
                                                        Greece
                                                    </option>
                                                    <option value="Greenland">
                                                        Greenland
                                                    </option>
                                                    <option value="Grenada">
                                                        Grenada
                                                    </option>
                                                    <option value="Guadeloupe">
                                                        Guadeloupe
                                                    </option>
                                                    <option value="Guam">
                                                        Guam
                                                    </option>
                                                    <option value="Guatemala">
                                                        Guatemala
                                                    </option>
                                                    <option value="Guinea">
                                                        Guinea
                                                    </option>
                                                    <option value="Guyana">
                                                        Guyana
                                                    </option>
                                                    <option value="Haiti">
                                                        Haiti
                                                    </option>
                                                    <option value="Hawaii">
                                                        Hawaii
                                                    </option>
                                                    <option value="Honduras">
                                                        Honduras
                                                    </option>
                                                    <option value="Hong Kong">
                                                        Hong Kong
                                                    </option>
                                                    <option value="Hungary">
                                                        Hungary
                                                    </option>
                                                    <option value="Iceland">
                                                        Iceland
                                                    </option>
                                                    <option value="Indonesia">
                                                        Indonesia
                                                    </option>
                                                    <option value="India">
                                                        India
                                                    </option>
                                                    <option value="Iran">
                                                        Iran
                                                    </option>
                                                    <option value="Iraq">
                                                        Iraq
                                                    </option>
                                                    <option value="Ireland">
                                                        Ireland
                                                    </option>
                                                    <option value="Isle of Man">
                                                        Isle of Man
                                                    </option>
                                                    <option value="Israel">
                                                        Israel
                                                    </option>
                                                    <option value="Italy">
                                                        Italy
                                                    </option>
                                                    <option value="Jamaica">
                                                        Jamaica
                                                    </option>
                                                    <option value="Japan">
                                                        Japan
                                                    </option>
                                                    <option value="Jordan">
                                                        Jordan
                                                    </option>
                                                    <option value="Kazakhstan">
                                                        Kazakhstan
                                                    </option>
                                                    <option value="Kenya">
                                                        Kenya
                                                    </option>
                                                    <option value="Kiribati">
                                                        Kiribati
                                                    </option>
                                                    <option value="Korea North">
                                                        Korea North
                                                    </option>
                                                    <option value="Korea Sout">
                                                        Korea South
                                                    </option>
                                                    <option value="Kuwait">
                                                        Kuwait
                                                    </option>
                                                    <option value="Kyrgyzstan">
                                                        Kyrgyzstan
                                                    </option>
                                                    <option value="Laos">
                                                        Laos
                                                    </option>
                                                    <option value="Latvia">
                                                        Latvia
                                                    </option>
                                                    <option value="Lebanon">
                                                        Lebanon
                                                    </option>
                                                    <option value="Lesotho">
                                                        Lesotho
                                                    </option>
                                                    <option value="Liberia">
                                                        Liberia
                                                    </option>
                                                    <option value="Libya">
                                                        Libya
                                                    </option>
                                                    <option value="Liechtenstein">
                                                        Liechtenstein
                                                    </option>
                                                    <option value="Lithuania">
                                                        Lithuania
                                                    </option>
                                                    <option value="Luxembourg">
                                                        Luxembourg
                                                    </option>
                                                    <option value="Macau">
                                                        Macau
                                                    </option>
                                                    <option value="Macedonia">
                                                        Macedonia
                                                    </option>
                                                    <option value="Madagascar">
                                                        Madagascar
                                                    </option>
                                                    <option value="Malaysia">
                                                        Malaysia
                                                    </option>
                                                    <option value="Malawi">
                                                        Malawi
                                                    </option>
                                                    <option value="Maldives">
                                                        Maldives
                                                    </option>
                                                    <option value="Mali">
                                                        Mali
                                                    </option>
                                                    <option value="Malta">
                                                        Malta
                                                    </option>
                                                    <option value="Marshall Islands">
                                                        Marshall Islands
                                                    </option>
                                                    <option value="Martinique">
                                                        Martinique
                                                    </option>
                                                    <option value="Mauritania">
                                                        Mauritania
                                                    </option>
                                                    <option value="Mauritius">
                                                        Mauritius
                                                    </option>
                                                    <option value="Mayotte">
                                                        Mayotte
                                                    </option>
                                                    <option value="Mexico">
                                                        Mexico
                                                    </option>
                                                    <option value="Midway Islands">
                                                        Midway Islands
                                                    </option>
                                                    <option value="Moldova">
                                                        Moldova
                                                    </option>
                                                    <option value="Monaco">
                                                        Monaco
                                                    </option>
                                                    <option value="Mongolia">
                                                        Mongolia
                                                    </option>
                                                    <option value="Montserrat">
                                                        Montserrat
                                                    </option>
                                                    <option value="Morocco">
                                                        Morocco
                                                    </option>
                                                    <option value="Mozambique">
                                                        Mozambique
                                                    </option>
                                                    <option value="Myanmar">
                                                        Myanmar
                                                    </option>
                                                    <option value="Nambia">
                                                        Nambia
                                                    </option>
                                                    <option value="Nauru">
                                                        Nauru
                                                    </option>
                                                    <option value="Nepal">
                                                        Nepal
                                                    </option>
                                                    <option value="Netherland Antilles">
                                                        Netherland Antilles
                                                    </option>
                                                    <option value="Netherlands">
                                                        Netherlands (Holland,
                                                        Europe)
                                                    </option>
                                                    <option value="Nevis">
                                                        Nevis
                                                    </option>
                                                    <option value="New Caledonia">
                                                        New Caledonia
                                                    </option>
                                                    <option value="New Zealand">
                                                        New Zealand
                                                    </option>
                                                    <option value="Nicaragua">
                                                        Nicaragua
                                                    </option>
                                                    <option value="Niger">
                                                        Niger
                                                    </option>
                                                    <option value="Nigeria">
                                                        Nigeria
                                                    </option>
                                                    <option value="Niue">
                                                        Niue
                                                    </option>
                                                    <option value="Norfolk Island">
                                                        Norfolk Island
                                                    </option>
                                                    <option value="Norway">
                                                        Norway
                                                    </option>
                                                    <option value="Oman">
                                                        Oman
                                                    </option>
                                                    <option value="Pakistan">
                                                        Pakistan
                                                    </option>
                                                    <option value="Palau Island">
                                                        Palau Island
                                                    </option>
                                                    <option value="Palestine">
                                                        Palestine
                                                    </option>
                                                    <option value="Panama">
                                                        Panama
                                                    </option>
                                                    <option value="Papua New Guinea">
                                                        Papua New Guinea
                                                    </option>
                                                    <option value="Paraguay">
                                                        Paraguay
                                                    </option>
                                                    <option value="Peru">
                                                        Peru
                                                    </option>
                                                    <option value="Phillipines">
                                                        Philippines
                                                    </option>
                                                    <option value="Pitcairn Island">
                                                        Pitcairn Island
                                                    </option>
                                                    <option value="Poland">
                                                        Poland
                                                    </option>
                                                    <option value="Portugal">
                                                        Portugal
                                                    </option>
                                                    <option value="Puerto Rico">
                                                        Puerto Rico
                                                    </option>
                                                    <option value="Qatar">
                                                        Qatar
                                                    </option>
                                                    <option value="Republic of Montenegro">
                                                        Republic of Montenegro
                                                    </option>
                                                    <option value="Republic of Serbia">
                                                        Republic of Serbia
                                                    </option>
                                                    <option value="Reunion">
                                                        Reunion
                                                    </option>
                                                    <option value="Romania">
                                                        Romania
                                                    </option>
                                                    <option value="Russia">
                                                        Russia
                                                    </option>
                                                    <option value="Rwanda">
                                                        Rwanda
                                                    </option>
                                                    <option value="St Barthelemy">
                                                        St Barthelemy
                                                    </option>
                                                    <option value="St Eustatius">
                                                        St Eustatius
                                                    </option>
                                                    <option value="St Helena">
                                                        St Helena
                                                    </option>
                                                    <option value="St Kitts-Nevis">
                                                        St Kitts-Nevis
                                                    </option>
                                                    <option value="St Lucia">
                                                        St Lucia
                                                    </option>
                                                    <option value="St Maarten">
                                                        St Maarten
                                                    </option>
                                                    <option value="St Pierre & Miquelon">
                                                        St Pierre & Miquelon
                                                    </option>
                                                    <option value="St Vincent & Grenadines">
                                                        St Vincent & Grenadines
                                                    </option>
                                                    <option value="Saipan">
                                                        Saipan
                                                    </option>
                                                    <option value="Samoa">
                                                        Samoa
                                                    </option>
                                                    <option value="Samoa American">
                                                        Samoa American
                                                    </option>
                                                    <option value="San Marino">
                                                        San Marino
                                                    </option>
                                                    <option value="Sao Tome & Principe">
                                                        Sao Tome & Principe
                                                    </option>
                                                    <option value="Saudi Arabia">
                                                        Saudi Arabia
                                                    </option>
                                                    <option value="Senegal">
                                                        Senegal
                                                    </option>
                                                    <option value="Seychelles">
                                                        Seychelles
                                                    </option>
                                                    <option value="Sierra Leone">
                                                        Sierra Leone
                                                    </option>
                                                    <option value="Singapore">
                                                        Singapore
                                                    </option>
                                                    <option value="Slovakia">
                                                        Slovakia
                                                    </option>
                                                    <option value="Slovenia">
                                                        Slovenia
                                                    </option>
                                                    <option value="Solomon Islands">
                                                        Solomon Islands
                                                    </option>
                                                    <option value="Somalia">
                                                        Somalia
                                                    </option>
                                                    <option value="South Africa">
                                                        South Africa
                                                    </option>
                                                    <option value="Spain">
                                                        Spain
                                                    </option>
                                                    <option value="Sri Lanka">
                                                        Sri Lanka
                                                    </option>
                                                    <option value="Sudan">
                                                        Sudan
                                                    </option>
                                                    <option value="Suriname">
                                                        Suriname
                                                    </option>
                                                    <option value="Swaziland">
                                                        Swaziland
                                                    </option>
                                                    <option value="Sweden">
                                                        Sweden
                                                    </option>
                                                    <option value="Switzerland">
                                                        Switzerland
                                                    </option>
                                                    <option value="Syria">
                                                        Syria
                                                    </option>
                                                    <option value="Tahiti">
                                                        Tahiti
                                                    </option>
                                                    <option value="Taiwan">
                                                        Taiwan
                                                    </option>
                                                    <option value="Tajikistan">
                                                        Tajikistan
                                                    </option>
                                                    <option value="Tanzania">
                                                        Tanzania
                                                    </option>
                                                    <option value="Thailand">
                                                        Thailand
                                                    </option>
                                                    <option value="Togo">
                                                        Togo
                                                    </option>
                                                    <option value="Tokelau">
                                                        Tokelau
                                                    </option>
                                                    <option value="Tonga">
                                                        Tonga
                                                    </option>
                                                    <option value="Trinidad & Tobago">
                                                        Trinidad & Tobago
                                                    </option>
                                                    <option value="Tunisia">
                                                        Tunisia
                                                    </option>
                                                    <option value="Turkey">
                                                        Turkey
                                                    </option>
                                                    <option value="Turkmenistan">
                                                        Turkmenistan
                                                    </option>
                                                    <option value="Turks & Caicos Is">
                                                        Turks & Caicos Is
                                                    </option>
                                                    <option value="Tuvalu">
                                                        Tuvalu
                                                    </option>
                                                    <option value="Uganda">
                                                        Uganda
                                                    </option>
                                                    <option value="United Kingdom">
                                                        United Kingdom
                                                    </option>
                                                    <option value="Ukraine">
                                                        Ukraine
                                                    </option>
                                                    <option value="United Arab Erimates">
                                                        United Arab Emirates
                                                    </option>
                                                    <option value="United States of America">
                                                        United States of America
                                                    </option>
                                                    <option value="Uraguay">
                                                        Uruguay
                                                    </option>
                                                    <option value="Uzbekistan">
                                                        Uzbekistan
                                                    </option>
                                                    <option value="Vanuatu">
                                                        Vanuatu
                                                    </option>
                                                    <option value="Vatican City State">
                                                        Vatican City State
                                                    </option>
                                                    <option value="Venezuela">
                                                        Venezuela
                                                    </option>
                                                    <option value="Vietnam">
                                                        Vietnam
                                                    </option>
                                                    <option value="Virgin Islands (Brit)">
                                                        Virgin Islands (Brit)
                                                    </option>
                                                    <option value="Virgin Islands (USA)">
                                                        Virgin Islands (USA)
                                                    </option>
                                                    <option value="Wake Island">
                                                        Wake Island
                                                    </option>
                                                    <option value="Wallis & Futana Is">
                                                        Wallis & Futana Is
                                                    </option>
                                                    <option value="Yemen">
                                                        Yemen
                                                    </option>
                                                    <option value="Zaire">
                                                        Zaire
                                                    </option>
                                                    <option value="Zambia">
                                                        Zambia
                                                    </option>
                                                    <option value="Zimbabwe">
                                                        Zimbabwe
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="col-md-4">
                                                <select
                                                    className="form-select"
                                                    required
                                                    name="billingProvince"
                                                    onChange={handleForm}
                                                    disabled={isDisabled}
                                                >
                                                    <option value>
                                                        -- State --
                                                    </option>
                                                    <option value="AB">
                                                        Alberta
                                                    </option>
                                                    <option value="BC">
                                                        British Columbia
                                                    </option>
                                                    <option value="MB">
                                                        Manitoba
                                                    </option>
                                                    <option value="NB">
                                                        New Brunswick
                                                    </option>
                                                    <option value="NL">
                                                        Newfoundland and
                                                        Labrador
                                                    </option>
                                                    <option value="NS">
                                                        Nova Scotia
                                                    </option>
                                                    <option value="NT">
                                                        Northwest Territories
                                                    </option>
                                                    <option value="NU">
                                                        Nunavut
                                                    </option>
                                                    <option value="ON">
                                                        Ontario
                                                    </option>
                                                    <option value="PE">
                                                        Prince Edward Island
                                                    </option>
                                                    <option value="QC">
                                                        Quebec
                                                    </option>
                                                    <option value="SK">
                                                        Saskatchewan
                                                    </option>
                                                    <option value="YT">
                                                        Yukon
                                                    </option>{" "}
                                                </select>
                                            </div>
                                            <div className="col-md-4">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Zip"
                                                    required
                                                    name="billingZip"
                                                    onChange={handleForm}
                                                    disabled={isDisabled}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card mb-3 border-info">
                                    <div className="card-header bg-info">
                                        <IconCreditCard2Front className="i-va" />{" "}
                                        Payment Method
                                    </div>
                                    <div className="card-body">
                                        <div className="row g-3 mb-3 border-bottom">
                                            <div className="col-md-6">
                                                <div className="form-check">
                                                    <input
                                                        id="credit"
                                                        name="paymentMethod"
                                                        type="radio"
                                                        className="form-check-input"
                                                        defaultChecked
                                                        required
                                                        onChange={handleForm}
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="credit"
                                                    >
                                                        Credit card
                                                        <img
                                                            src="../../images/payment/cards.webp"
                                                            alt="..."
                                                            className="ml-3"
                                                            height={26}
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-check"></div>
                                            </div>
                                        </div>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Name on card"
                                                    name="nameOnCard"
                                                    onChange={handleForm}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Card number"
                                                    name="cardNumber"
                                                    onChange={handleForm}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Expiration month"
                                                    name="expirationMonth"
                                                    onChange={handleForm}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Expiration year"
                                                    name="expirationYear"
                                                    onChange={handleForm}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="CVV"
                                                    name="cvv"
                                                    onChange={handleForm}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer border-info">
                                        <button
                                            type="button"
                                            className="btn btn-block btn-info"
                                            onClick={checkout}
                                        >
                                            Pay Now{" "}
                                            <strong>${amountWithTaxes}</strong>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-header">
                                        <IconCart3 className="i-va" /> Cart{" "}
                                        <span className="badge bg-secondary float-right">
                                            {
                                                Object.keys(
                                                    productsWithQuantity
                                                ).length
                                            }
                                        </span>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        {Object.keys(productsWithQuantity).map(
                                            (productKey) => {
                                                return (
                                                    <li className="list-group-item d-flex justify-content-between lh-sm">
                                                        <div>
                                                            <h6 className="my-0">
                                                                {
                                                                    productsWithQuantity[
                                                                        productKey
                                                                    ].product
                                                                        .name
                                                                }
                                                            </h6>
                                                            <small className="text-muted">
                                                                Brief
                                                                description
                                                            </small>
                                                        </div>
                                                        <span className="text-muted">
                                                            $
                                                            {productsWithQuantity[
                                                                productKey
                                                            ].product.price *
                                                                productsWithQuantity[
                                                                    productKey
                                                                ].quantity}
                                                        </span>
                                                    </li>
                                                );
                                            }
                                        )}
                                        <li className="list-group-item d-flex justify-content-between">
                                            <span>Total (CAD)</span>
                                            <strong>${amountWithTaxes}</strong>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )}
        </React.Fragment>
    );
}
