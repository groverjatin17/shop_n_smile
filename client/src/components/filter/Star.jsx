import React from "react";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { useSelector, useDispatch } from "react-redux";

const FilterStar = (props) => {
    const dispatch = useDispatch();
    const starFilter = useSelector(
        (state) => state.homepageReducers.starFilter
    );

    const checkboxInfo = (e) => {
        console.log(e.target.value);
        const newStarFilter = starFilter.slice(0);
        // const values = e.target.value.split("-");

        if (e.target.checked) {
            newStarFilter.push(e.target.value);
        } else {
            const index = newStarFilter.indexOf(e.target.value);
            if (index > -1) {
                newStarFilter.splice(index, 1);
            }
        }
        dispatch({
            type: "STAR_FILTER",
            payload: newStarFilter,
        });
    };

    return (
        <div className="card mb-3">
            <div className="card-header font-weight-bold text-uppercase">
                Customer Review
            </div>
            <div className="card-body">
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="flexCheckDefault5"
                        id="flexCheckDefault5"
                        onChange={(e) => checkboxInfo(e)}
                        value={5}
                    />
                    <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault5"
                        aria-label="Star"
                    >
                        <IconStarFill className="text-warning me-1 mb-2" />
                        <IconStarFill className="text-warning me-1 mb-2" />
                        <IconStarFill className="text-warning me-1 mb-2" />
                        <IconStarFill className="text-warning me-1 mb-2" />
                        <IconStarFill className="text-warning me-1 mb-2" />
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="flexCheckDefault4"
                        id="flexCheckDefault4"
                        onChange={(e) => checkboxInfo(e)}
                        value={4}
                    />
                    <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault4"
                        aria-label="Star"
                    >
                        <IconStarFill className="text-warning me-1 mb-2" />
                        <IconStarFill className="text-warning me-1 mb-2" />
                        <IconStarFill className="text-warning me-1 mb-2" />
                        <IconStarFill className="text-warning me-1 mb-2" />
                        <IconStarFill className="text-secondary me-1 mb-2" />
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="flexCheckDefault3"
                        id="flexCheckDefault3"
                        onChange={(e) => checkboxInfo(e)}
                        value={3}
                    />
                    <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault3"
                        aria-label="Star"
                    >
                        <IconStarFill className="text-warning me-1 mb-2" />
                        <IconStarFill className="text-warning me-1 mb-2" />
                        <IconStarFill className="text-warning me-1 mb-2" />
                        <IconStarFill className="text-secondary me-1 mb-2" />
                        <IconStarFill className="text-secondary me-1 mb-2" />
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="flexCheckDefault2"
                        id="flexCheckDefault2"
                        onChange={(e) => checkboxInfo(e)}
                        value={2}
                    />
                    <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault2"
                        aria-label="Star"
                    >
                        <IconStarFill className="text-warning me-1 mb-2" />
                        <IconStarFill className="text-warning me-1 mb-2" />
                        <IconStarFill className="text-secondary me-1 mb-2" />
                        <IconStarFill className="text-secondary me-1 mb-2" />
                        <IconStarFill className="text-secondary me-1 mb-2" />
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name="flexCheckDefault1"
                        id="flexCheckDefault1"
                        onChange={(e) => checkboxInfo(e)}
                        value={1}
                    />
                    <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                        aria-label="Star"
                    >
                        <IconStarFill className="text-warning me-1 mb-2" />
                        <IconStarFill className="text-secondary me-1 mb-2" />
                        <IconStarFill className="text-secondary me-1 mb-2" />
                        <IconStarFill className="text-secondary me-1 mb-2" />
                        <IconStarFill className="text-secondary me-1 mb-2" />
                    </label>
                </div>
            </div>
        </div>
    );
};

export default FilterStar;
