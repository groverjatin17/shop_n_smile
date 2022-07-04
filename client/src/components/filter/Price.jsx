import React from "react";
import { useSelector, useDispatch } from "react-redux";

const FilterPrice = (props) => {
    const dispatch = useDispatch();
    const priceFilter = useSelector(
        (state) => state.homepageReducers.priceFilter
    );

    const checkboxInfo = (e) => {
      console.log(e.target.value);
        const newPriceFilter = priceFilter.slice(0);
        const values = e.target.value.split("-");

        if (e.target.checked) {
            values.forEach((element) => {
                newPriceFilter.push(element);
            });
        } else {
            values.forEach((element) => {
                const index = newPriceFilter.indexOf(element);
                if (index > -1) {
                    newPriceFilter.splice(index, 1);
                }
            });
        }
        dispatch({
          type: 'PRICE_FILTER',
          payload: newPriceFilter,
        });
    };

    return (
        <div className="card mb-3">
            <div className="card-header font-weight-bold text-uppercase">
                Price
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexCheckDefault1"
                            onChange={(e) => checkboxInfo(e)}
                            value="24-29"
                        />
                        <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault1"
                        >
                            $24.00 - $29.00{" "}
                            {/* <span className="text-muted">(4)</span> */}
                        </label>
                    </div>
                </li>
                <li className="list-group-item">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexCheckDefault2"
                            onChange={(e) => checkboxInfo(e)}
                            value="33-35"
                        />
                        <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault2"
                        >
                            $33.00 - $35.00{" "}
                            {/* <span className="text-muted">(2)</span> */}
                        </label>
                    </div>
                </li>
                <li className="list-group-item">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexCheckDefault3"
                            onChange={(e) => checkboxInfo(e)}
                            value="70-99"
                        />
                        <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault3"
                        >
                            $70.00 - $99.00{" "}
                            {/* <span className="text-muted">(5)</span> */}
                        </label>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default FilterPrice;
