import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const FilterCategory = (props) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const dispatch = useDispatch();

    return (
        <div className="card mb-3">
            <div className="card-header font-weight-bold text-uppercase">
                Categories
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <a
                        href="#all"
                        className="text-decoration-none stretched-link"
                        onClick={() => {
                            dispatch({
                                type: "SELECTED_CATEGORY",
                                payload: "",
                            });
                        }}
                    >
                        All
                    </a>
                </li>
                <li className="list-group-item">
                    <a
                        href="#fashion"
                        className="text-decoration-none stretched-link"
                        onClick={() => {
                            dispatch({
                                type: "SELECTED_CATEGORY",
                                payload: "fashion",
                            });
                        }}
                    >
                        Fashion
                    </a>
                </li>
                <li className="list-group-item">
                    <a
                        href="#electronics"
                        className="text-decoration-none stretched-link"
                        onClick={() => {
                            dispatch({
                                type: "SELECTED_CATEGORY",
                                payload: "electronics",
                            });
                        }}
                    >
                        Electronics
                    </a>
                </li>
                <li className="list-group-item">
                    <Link
                        to="/"
                        className="text-decoration-none stretched-link"
                    >
                        Trausers
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link
                        to="/"
                        className="text-decoration-none stretched-link"
                    >
                        Sweater & Cardigans
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link
                        to="/"
                        className="text-decoration-none stretched-link"
                    >
                        High Heels
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link
                        to="/"
                        className="text-decoration-none stretched-link"
                    >
                        Coats & Jackets
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default FilterCategory;
