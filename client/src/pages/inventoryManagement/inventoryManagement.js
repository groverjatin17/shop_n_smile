import React from "react";
import { useSelector, useDispatch } from "react-redux";
import InventoryTable from './inventoryTable';

export default function InventoryManagement() {
    const user = useSelector((state) => state.homepageReducers.user);
    let page = <div></div>;
    if (user?.role === "admin") {
        page = <div><InventoryTable /> </div>;
    } else {
        page = <div>Sorry, But only admin can see this page</div>;
    }
    return (
            <div>{page}</div>
    );
}
