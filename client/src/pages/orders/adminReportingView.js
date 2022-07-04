import React, { useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
// import './index.css';
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from "antd";
import axios from "../../helpers/axios";

// const originData = [];

// for (let i = 0; i < 100; i++) {
//     originData.push({
//         key: i.toString(),
//         name: `Edrward ${i}`,
//         age: 32,
//         address: `London Park no. ${i}`,
//     });
// }

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const EditableTable = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState("");
    // const [orders, setOrders] = React.useState([]);
    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        async function fetchData() {
            // You can await here
            const result = await axios.get(`http://localhost:5000/orders/allOrders`);

            if (result.data) {
                setData(result.data);
            }
            const productsResponse = await axios.get(
                `http://localhost:5000/products`
            );
            setProducts(productsResponse.data);
        }
        fetchData();
    }, []);

    const filteredOrders = [];
    const findProduct = (productId) => {
        const tempProducts = products.slice(0);
        return tempProducts.filter((product) => {
            return product.productId == productId;
        })[0];
    };

    data.forEach((order) => {
        for (let i = 0; i < Object.keys(order.products).length; i++) {
            const item = {};
            item.key = order.orderId + i;
            item.orderId = order.orderId;
            item.productId = Object.keys(order.products)[i];
            item.product = findProduct(Object.keys(order.products)[i])?.name;
            item.quantity =
                order.products[Object.keys(order.products)[i]]?.quantity;
            item.address1 = order.address1;
            item.address2 = order.address2;
            item.province = order.province;
            item.country = order.country;
            // item.address = `${order.address1}, ${order.address2}, ${order.province}, ${order.country} `;
            item.receiverName = order?.name;
            filteredOrders.push(item);
        }
    });

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            orderId: "",
            age: "",
            product: "",
            quantity: "",
            address1: "",
            address2: "",
            province: "",
            country: "",
            receiverName: "",
            ...record,
        });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey("");
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.orderId);
            const newRecord = newData[index];
            // newRecord.quantity = row.quantity;
            // newRecord.address1 = row.address1;
            // newRecord.address2 = row.address2;
            // newRecord.province = row.province;
            // newRecord.country = row.country;
            // newRecord.receiverName = row.receiverName;

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row });
                // setData(newData);
                setEditingKey("");
            } else {
                // newData.push(row);
                // setData(newData);
                setEditingKey("");
            }
        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    };

    const columns = [
        {
            title: "orderId",
            dataIndex: "orderId",
            width: "15%",
            editable: false,
        },
        {
            title: "productId",
            dataIndex: "productId",
            width: "10%",
            editable: true,
        },
        {
            title: "product",
            dataIndex: "product",
            width: "25%",
            editable: false,
        },
        {
            title: "quantity",
            dataIndex: "quantity",
            width: "15%",
            editable: true,
        },
        {
            title: "address1",
            dataIndex: "address1",
            width: "10%",
            editable: true,
        },
        {
            title: "address2",
            dataIndex: "address2",
            width: "10%",
            editable: true,
        },
        {
            title: "province",
            dataIndex: "province",
            width: "10%",
            editable: true,
        },
        {
            title: "country",
            dataIndex: "country",
            width: "10%",
            editable: true,
        },
        {
            title: "receiverName",
            dataIndex: "receiverName",
            width: "15%",
            editable: true,
        },
        {
            title: "operation",
            dataIndex: "operation",
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record.key)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link
                        disabled={editingKey !== ""}
                        onClick={() => edit(record)}
                    >
                        Edit
                    </Typography.Link>
                );
            },
        },
    ];
    
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === "age" ? "number" : "text",
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={filteredOrders}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />
        </Form>
    );
};

export default EditableTable;
