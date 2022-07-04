import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import axios from "../../helpers/axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

export default function CustomizedTables() {
    const user = useSelector((state) => state.homepageReducers.user);
    const [orders, setOrders] = React.useState([]);
    const [products, setProducts] = React.useState([]);
    React.useEffect(() => {
        async function fetchData() {
            // You can await here
            const result = await axios.get(
                `http://localhost:5000/orders?customerId=${user?.userId}`
            );
            if (result.data) {
                setOrders(result.data);
            }
            const productsResponse = await axios.get(
                `http://localhost:5000/products`
            );
            setProducts(productsResponse.data);
        }
        fetchData();
    }, [user]);

    const filteredOrders = [];
    const findProduct = (productId) => {
        const tempProducts = products.slice(0);
        return tempProducts.filter(
            (product) => { return product.productId == productId}
        )[0];
    };
     orders.forEach((order) => {

        for (let i = 0; i < Object.keys(order.products).length; i++) {
            const item = {};
            item.orderId = order.orderId;
            item.product = findProduct(Object.keys(order.products)[i])?.name;
            item.quantity = order.products[Object.keys(order.products)[i]]?.quantity;
            item.address = `${order.address1}, ${order.address2}, ${order.province}, ${order.country} `;
            item.receiverName = order?.name;
            filteredOrders.push(item);
        }
    });
    
    return (
        <div style={{width: '80%', margin: 'auto'}}>

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>OrderId</StyledTableCell>
                        <StyledTableCell>Products</StyledTableCell>
                        <StyledTableCell align="right">
                            Quantity
                        </StyledTableCell>
                        <StyledTableCell align="right">Address</StyledTableCell>
                        <StyledTableCell align="right">
                            Receiver Name
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredOrders.map((row) => (
                        <StyledTableRow key={row.orderId}>
                            <StyledTableCell component="th" scope="row">
                                {row.orderId}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {row.product}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {row.quantity}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {row.address}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {row.receiverName}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    
    );
}
