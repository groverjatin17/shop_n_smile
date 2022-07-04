import React from "react";
import { Field, Form } from "react-final-form"
import { useHistory } from "react-router-dom";
import axios from "axios";
import FormButton from "../common/modules/form/FormButton";

import {
  renderFormField,
  renderFormCheckbox,
  renderFormFileInput
} from "../../helpers/renderForm";

export default function ProductCreateForm(props) {
  const history = useHistory();
  const [sent, setSent] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(true);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  
  let formData = {
    isProductNew: false,
    isHot:false,
    isFreeShipping: false,
    inStock: false
  };


  const onImageChange = ()=> {
  }

  const handleSubmit = async (values) => {
    const { originPrice, price, productImage } = values;
    const productInfo = {
      discountPrice: originPrice - price,
      discountPercentage:  Math.round((originPrice - price)/ originPrice*100),
      img: `../../images/products/${productImage.name}`,
      link: 'product/detail',
      star: 5
    }

    try {
        const result = await axios.post(
            `http://localhost:5000/products/addProduct`,
            { ...values, ...productInfo}
        );
        if (result) {
            if (result.status === 201) {
                setSent(true);
                setSuccess("Product has been Added Successfully");
                history.push("/");
            }
        }
    } catch (error) {
        setIsSubmitting(false);
        setSent(false);
        setError("Could not Create Product. Kindly try again");
    }
  };

  return (
    <div className="container mt-3">
      <h4>Admin Inventory</h4>
      <Form
        onSubmit={handleSubmit}
        subscription={{ submitting: isSubmitting }}
        initialValues={{
          ...formData,
        }}
       
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="row">
              <Field
                name="category"
                type="text"
                label="Category"
                component={renderFormField}
                placeholder="Enter Type Of Category"
                required
              />
              <Field
                name="name"
                type="text"
                label="Product Name"
                component={renderFormField}
                placeholder="Enter Product Name"
                required
              />
              <Field
                name="price"
                type="number"
                label="Product Price"
                component={renderFormField}
                placeholder="Product Price"
                required
              />
              <Field
                name="productQuantity"
                type="number"
                label="Product Quntity"
                component={renderFormField}
                placeholder="Product Quntity"
                required
              />
              <Field
                name="soldBy"
                type="text"
                label="Sold By"
                component={renderFormField}
                placeholder="Sold By"
                required
              />
               <Field
                  id="inStock"
                  label="In Stock"
                  name="inStock"
                  type="checkbox"
                  component={renderFormCheckbox}
                />
               <Field
                name="description"
                type="text"
                label="Product Description:"
                component={renderFormField}
                placeholder="Product Description:"
                required
              />
              <Field
                name="originPrice"
                type="number"
                label="Original Price"
                component={renderFormField}
                placeholder="Original Price"
                required
              />
              <div className="col-md-12">
                <Field
                  id="newStock"
                  label="New stock"
                  name="isProductNew"
                  type="checkbox"
                  component={renderFormCheckbox}
                />
                <Field
                  id="trending"
                  label="Trenidng"
                  name="isHot"
                  type="checkbox"
                  component={renderFormCheckbox}
                />
                <Field
                  id="freeShopping"
                  label="Free Shipping"
                  name="isFreeShipping"
                  type="checkbox"
                  component={renderFormCheckbox}
                />
                 <Field
                  id="productImage"
                  label="Product Image"
                  name="productImage"
                  component={renderFormFileInput}
                  onImageChange={onImageChange}
                />
                 {error ? (
                        <h6 style={{ color: "red", textAlign: "center" }}>
                            {error}
                        </h6>
                    ) : null}
                    {success ? (
                        <h6 style={{ color: "green", textAlign: "center" }}>
                            {success}
                        </h6>
                    ) : null}
                <FormButton
                  sx={{ mt: 3, mb: 2 }}
                  color="primary"
                  fullWidth
                >
                  Submit
                </FormButton>
               
              </div>
            </div>
          </form>
        )}
      />

    </div>
  );
};
