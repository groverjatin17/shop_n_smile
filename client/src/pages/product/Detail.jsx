import React, { lazy, useEffect, useState } from "react";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { faCartPlus, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { data } from "../../data";
const CardFeaturedProduct = lazy(() =>
    import("../../components/card/CardFeaturedProduct")
);
const CardServices = lazy(() => import("../../components/card/CardServices"));
const Details = lazy(() => import("../../components/others/Details"));

const ShippingReturns = lazy(() =>
    import("../../components/others/ShippingReturns")
);

export default function ProductDetailView(props) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const dispatch = useDispatch();
    const cartProducts = useSelector(
        (state) => state.homepageReducers.cartProducts
    );
    const products = useSelector((state) => state.homepageReducers.products);
    const currentProductId = useSelector(
        (state) => state.homepageReducers.currentProductId
    );
    const product = products.filter(
        (product) => product.productId === currentProductId
    )[0];

    const [quantity, setQuantity] = useState(1);

    const addToCart = (productId) => {
        const currentCartProducts = cartProducts.slice(0);
        for (var x = 1; x <= quantity; x++) {
            currentCartProducts.push(productId);
        }

        dispatch({
            type: "CART_PRODUCTS",
            payload: currentCartProducts,
        });
    };

    return (
        <div className="container-fluid mt-3">
            <div className="row">
                <div className="col-md-8">
                    <div className="row mb-3">
                        <div className="col-md-5 text-center">
                            <img
                                src={product.img}
                                className="img-fluid mb-3"
                                alt=""
                            />
                        </div>
                        <div className="col-md-7">
                            <h1 className="h5 d-inline me-2">{product.name}</h1>
                            {product.isProductNew && (
                                <span className="badge bg-success me-2">
                                    New
                                </span>
                            )}
                            {product.isHot && (
                                <span className="badge bg-danger me-2">
                                    Hot
                                </span>
                            )}
                            <div className="mb-3">
                                {[...Array(product.star).keys()].map((item) => (
                                    <IconStarFill className="text-warning me-1" />
                                ))}
                                {[...Array(5 - product.star).keys()].map(
                                    (item) => (
                                        <IconStarFill className="text-secondary me-1" />
                                    )
                                )}
                                |{" "}
                                <span className="text-muted small">
                                    42 ratings and 4 reviews
                                </span>
                            </div>
                            <dl className="row small mb-3">
                                <dt className="col-sm-3">Availability</dt>
                                {product.remainingInventory > 0 ? (
                                        <dd className="col-sm-9">
                                            <span className="badge bg-success me-2">
                                                In Stock
                                            </span>
                                        </dd>
                                ) : (
                                    <dd className="col-sm-9">
                                    <span className="badge bg-danger me-2">
                                        Out Of Stock
                                    </span>
                                </dd>
                                )}

                                <dt className="col-sm-3">Sold by</dt>
                                <dd className="col-sm-9">{product.soldBy}</dd>
                            </dl>

                            <div className="mb-3">
                                <span className="font-weight-bold h5 me-2">
                                    ${product.price}
                                </span>
                                {parseInt(product.originPrice) ? (
                                    <del className="small text-muted me-2">
                                        ${product.originPrice}
                                    </del>
                                ) : null}
                                {parseInt(product.discountPrice) ? (
                                    <span className="rounded p-1 bg-warning  me-2 small">
                                        -${product.discountPrice}
                                    </span>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <div className="d-inline float-start me-2">
                                    <div className="input-group input-group-sm mw-140">
                                        <button
                                            className="btn btn-primary text-white"
                                            type="button"
                                            onClick={() =>
                                                setQuantity((prev) => {
                                                    if (prev === 1) {
                                                        return 1;
                                                    }
                                                    return prev - 1;
                                                })
                                            }
                                        >
                                            <FontAwesomeIcon icon={faMinus} />
                                        </button>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={quantity}
                                        />
                                        <button
                                            className="btn btn-primary text-white"
                                            type="button"
                                            onClick={() =>
                                                setQuantity((prev) => prev + 1)
                                            }
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-primary me-2"
                                    title="Add to cart"
                                    onClick={() => addToCart(product.productId)}
                                    disabled={product.remainingInventory === 0}
                                >
                                    <FontAwesomeIcon icon={faCartPlus} /> Add to
                                    cart
                                </button>
                            </div>
                            <div>
                                <p className="font-weight-bold mb-2 small">
                                    Product Highlights
                                </p>
                                <ul className="small">
                                    <li>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit.
                                    </li>
                                    <li>
                                        Etiam ullamcorper nibh eget faucibus
                                        dictum.
                                    </li>
                                    <li>
                                        Cras consequat felis ut vulputate
                                        porttitor.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Tabs
                                defaultActiveKey="details"
                                id="uncontrolled-tab-example"
                                className="mb-3"
                            >
                                <Tab eventKey="details" title="Details">
                                    <div>
                                        <Details />
                                    </div>
                                </Tab>
                                <Tab
                                    eventKey="shipping"
                                    title="Shipping Returns"
                                >
                                    <div>
                                        <ShippingReturns />
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <CardFeaturedProduct data={data.products} />
                    <CardServices />
                </div>
            </div>
        </div>
    );
}
