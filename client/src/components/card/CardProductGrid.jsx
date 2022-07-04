import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";

const CardProductGrid = (props) => {
    const product = props.data;
    const dispatch = useDispatch();

    const cartProducts = useSelector(
        (state) => state.homepageReducers.cartProducts
    );

    const addToCart = (productId) => {
        console.log("🚀 ~ addToCart ~ productId", productId);
        const currentCartProducts = cartProducts.slice(0);
        currentCartProducts.push(productId);
        dispatch({
            type: "CART_PRODUCTS",
            payload: currentCartProducts,
        });
    };

    const setProductId = (productId) => {
        dispatch({
            type: "CURRENT_PRODUCT_ID",
            payload: productId,
        });
    };

    let addOpacity = {};

    if (product.remainingInventory === 0) {
        addOpacity = { opacity: 0.2 };
    }
    return (
        <div className="card">
            <img
                src={product.img}
                className="card-img-top"
                alt="..."
                style={addOpacity}
            />
            {product.isProductNew && (
                <span className="badge bg-success position-absolute mt-2 ms-2">
                    New
                </span>
            )}
            {product.isHot && (
                <span className="badge bg-danger position-absolute r-0 mt-2 me-2">
                    Hot
                </span>
            )}
            {(product.discountPercentage > 0 || product.discountPrice > 0) && (
                <span
                    className={`rounded position-absolute p-2 bg-warning  ms-2 small ${
                        product.isProductNew ? "mt-5" : "mt-2"
                    }`}
                >
                    -
                    {product.discountPercentage > 0
                        ? product.discountPercentage + "%"
                        : "$" + product.discountPrice}
                </span>
            )}
            <div className="card-body">
                <h6 className="card-subtitle mb-2">
                    <Link
                        to={product.link}
                        className="text-decoration-none"
                        onClick={() => setProductId(product.productId)}
                    >
                        {product.name} 
                    </Link>{` (${product.remainingInventory})`}
                </h6>
                <div className="my-2">
                    <span className="font-weight-bold h5">
                        ${product.price}
                    </span>
                    {product.originPrice > 0 && (
                        <del className="small text-muted ms-2">
                            ${product.originPrice}
                        </del>
                    )}
                    <span className="ms-2">
                        {Array.from({ length: product.star }, (_, key) => (
                            <IconStarFill
                                className="text-warning me-1"
                                key={key}
                            />
                        ))}
                    </span>
                </div>
                <div className="btn-group d-grid" role="group">
                    <button
                        type="button"
                        className="btn btn-sm btn-primary"
                        title="Add to cart"
                        onClick={() => addToCart(product.productId)}
                        disabled={product.remainingInventory === 0}
                    >
                        <FontAwesomeIcon icon={faCartPlus} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardProductGrid;
