import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import axios from "../../helpers/axios";
import Alert from "@mui/material/Alert";

export default function InventoryTable() {
    const [editRowsModel, setEditRowsModel] = React.useState({});

    const handleEditRowsModelChange = React.useCallback(async (model) => {
        if(Object.keys(model)[0]){

            await axios.put(
                `http://localhost:5000/products/updateInventory`,
                {
                    productId: Object.keys(model)[0],
                    quantity: model[Object.keys(model)[0]].remainingInventory.value,
                }
            );
            const result = await axios.get(`http://localhost:5000/products`);

            if (result.data) {
                setProducts(result.data);
            }
        }

        setEditRowsModel(model);
    }, []);

    const [products, setProducts] = React.useState([]);
    React.useEffect(() => {
        async function fetchData() {
            // You can await here
            const result = await axios.get(`http://localhost:5000/products`);

            if (result.data) {
                setProducts(result.data);
            }
        }
        fetchData();
    }, []);
    const rows = products.map((product) => {
        return { ...product, id: product.productId };
    });
    return (
        <div style={{ width: "100%" }}>
            <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    editRowsModel={editRowsModel}
                    onEditRowsModelChange={handleEditRowsModelChange}
                />
            </div>
        </div>
    );
}

const columns = [
    { field: "id", headerName: "Id", width: 130, editable: false, hide: true },
    {
        field: "productId",
        headerName: "Product Id",
        width: 130,
        editable: false,
        
    },
    { field: "name", headerName: "Product Name", width: 300, editable: false },
    {
        field: "remainingInventory",
        headerName: "Inventory",
        width: 130,
        editable: true,
    },
    //   {
    //     field: 'fullName',
    //     headerName: 'Full name',
    //     width: 160,
    //     editable: true,
    //     valueGetter: getFullName,
    //     valueSetter: setFullName,
    //     sortComparator: (v1, v2) => v1.toString().localeCompare(v2.toString()),
    //   },
];

// const rows = [
//   { id: 1, remainingInventory: 5, productName: 'Jon', blah: "bleh" },
//   { id: 2, remainingInventory: 6, productName: 'Cersei' },
//   { id: 3, remainingInventory: 7, productName: 'Jaime' },
//   { id: 4, remainingInventory: 9, productName: 'Arya' },
//   { id: 5, remainingInventory: 4, productName: 'Daenerys' },
// ];
