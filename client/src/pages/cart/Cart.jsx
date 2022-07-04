import React, { lazy } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as IconTrash } from "bootstrap-icons/icons/trash.svg";
import { ReactComponent as IconChevronRight } from "bootstrap-icons/icons/chevron-right.svg";
import { ReactComponent as IconChevronLeft } from "bootstrap-icons/icons/chevron-left.svg";
import { ReactComponent as IconTruck } from "bootstrap-icons/icons/truck.svg";
import { useSelector } from "react-redux";

const CouponApplyForm = lazy(() =>
    import("../../components/others/CouponApplyForm")
);

export default function CartView() {
    const cartProducts = useSelector(
        (state) => state.homepageReducers.cartProducts
    );
    const products = useSelector((state) => state.homepageReducers.products);
    const productsWithQuantity = {};
    const findProduct = (productId) => {
        const tempProducts = products.slice(0);
        return tempProducts.filter(
            (product) => product.productId === productId
        )[0];
    };

    let totalPrice = 0;
    cartProducts.forEach(function (x) {
        productsWithQuantity[x] = {
            quantity: (productsWithQuantity[x]?.quantity || 0) + 1,
            product: findProduct(x),
        };
        totalPrice = totalPrice + findProduct(x).price;
    });
    console.log(productsWithQuantity);
    const onSubmitApplyCouponCode = async (values) => {
        alert(JSON.stringify(values));
    };
    const tax = (totalPrice * 0.13).toFixed(2);
    const amountWithTaxes = parseFloat(totalPrice) + parseFloat(tax);

    return (
        <React.Fragment>
            <div className="bg-secondary border-top p-4 text-white mb-3">
                <h1 className="display-6">Shopping Cart</h1>
            </div>
            <div className="container mb-3">
                <div className="row">
                    <div className="col-md-9">
                        <div className="card">
                            <div className="table-responsive">
                                <table className="table table-borderless">
                                    <thead className="text-muted">
                                        <tr className="small text-uppercase">
                                            <th scope="col">Product</th>
                                            <th scope="col" width={120}>
                                                Quantity
                                            </th>
                                            <th scope="col" width={150}>
                                                Price
                                            </th>
                                            <th
                                                scope="col"
                                                className="text-right"
                                                width={130}
                                            ></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(productsWithQuantity).map(
                                            (productKey) => {
                                                return (
                                                    <tr>
                                                        <td>
                                                            <div className="row">
                                                                <div className="col-3 d-none d-md-block">
                                                                    <img
                                                                        src={
                                                                            productsWithQuantity[
                                                                                productKey
                                                                            ]
                                                                                .product
                                                                                .img
                                                                        }
                                                                        width="80"
                                                                        alt="..."
                                                                    />
                                                                </div>
                                                                <div className="col">
                                                                    <Link
                                                                        to="/product/detail"
                                                                        className="text-decoration-none"
                                                                    >
                                                                        {
                                                                            productsWithQuantity[
                                                                                productKey
                                                                            ]
                                                                                .product
                                                                                .name
                                                                        }
                                                                    </Link>
                                                                    <p className="small text-muted">
                                                                        Shipping:{" "}
                                                                        {productsWithQuantity[
                                                                            productKey
                                                                        ]
                                                                            .product
                                                                            .isFreeShipping
                                                                            ? "Free"
                                                                            : "$2.00"}
                                                                        , Brand:{" "}
                                                                        {
                                                                            productsWithQuantity[
                                                                                productKey
                                                                            ]
                                                                                .product
                                                                                .soldBy
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="input-group input-group-sm mw-140">
                                                                {
                                                                    productsWithQuantity[
                                                                        productKey
                                                                    ].quantity
                                                                }
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <var className="price">
                                                                $
                                                                {`${
                                                                    productsWithQuantity[
                                                                        productKey
                                                                    ].quantity *
                                                                    productsWithQuantity[
                                                                        productKey
                                                                    ].product
                                                                        .price
                                                                }`}
                                                            </var>
                                                            <small className="d-block text-muted">
                                                                $
                                                                {
                                                                    productsWithQuantity[
                                                                        productKey
                                                                    ].product
                                                                        .price
                                                                }{" "}
                                                                each
                                                            </small>
                                                        </td>
                                                        <td className="text-right">
                                                            <button className="btn btn-sm btn-outline-danger">
                                                                <IconTrash className="i-va" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-footer">
                                <Link
                                    to="/checkout"
                                    className="btn btn-primary float-end"
                                >
                                    Make Purchase{" "}
                                    <IconChevronRight className="i-va" />
                                </Link>
                                <Link to="/" className="btn btn-secondary ms-2">
                                    <IconChevronLeft className="i-va" />{" "}
                                    Continue shopping
                                </Link>
                            </div>
                        </div>
                        <div className="alert alert-success mt-3">
                            <p className="m-0">
                                <IconTruck className="i-va mr-2" /> Free
                                Delivery within 1-2 weeks
                            </p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card mb-3">
                            <div className="card-body">
                                <CouponApplyForm
                                    onSubmit={onSubmitApplyCouponCode}
                                />
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <dl className="row border-bottom">
                                    <dt className="col-6">Total price:</dt>
                                    <dd className="col-6 text-right">
                                        ${totalPrice}
                                    </dd>
                                    <dt className="col-6">Tax (13%):</dt>
                                    <dd className="col-6 text-right">
                                        ${tax}
                                    </dd>
                                    {/* <dt className="col-6 text-success">
                                        Discount:
                                    </dt>
                                    <dd className="col-6 text-success text-right">
                                        -$58
                                    </dd> */}
                                    <dt className="col-6 text-success">
                                        Coupon:{" "}
                                        <span className="small text-muted">
                                            EXAMPLECODE
                                        </span>{" "}
                                    </dt>
                                    <dd className="col-6 text-success text-right">
                                        -$0
                                    </dd>
                                </dl>
                                <dl className="row">
                                    <dt className="col-6">Total:</dt>
                                    <dd className="col-6 text-right  h5">
                                        <strong>${amountWithTaxes}</strong>
                                    </dd>
                                </dl>
                                <hr />
                                <p className="text-center">
                                    <img
                                        src="../../images/payment/payments.webp"
                                        alt="..."
                                        height={26}
                                    />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-light border-top p-4">
                <div className="container">
                    <h6>Payment and refund policy</h6>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                    </p>
                </div>
            </div>
        </React.Fragment>
    );
}
