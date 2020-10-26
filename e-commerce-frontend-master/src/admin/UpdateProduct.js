import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import {
  getCategories,
  getProduct,
  updateProduct,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";

const UpdateProduct = ({ match }) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categories: [],
    photo: "",
    error: "",
    createdProduct: "",
    getRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    error,
    createdProduct,
    getRedirect,
    formData,
  } = values;

  const preload = (productId) => {
    getProduct(productId).then((data) => {
      //console.table(data);
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
        });
      } else {
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id,
          stock: data.stock,
          formData: new FormData(),
        });
        preloadCategories();
      }
    });
  };

  const preloadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
        });
      } else {
        setValues({
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    preload(match.params.productId);
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updateProduct(match.params.productId, user._id, token, formData)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            photo: "",
            stock: "",
            loading: false,
            createdProduct: data.name,
          });
        }
      })
      .then(() => {
        setValues({
          ...values,
          getRedirect: !getRedirect,
        });
      })
      .catch((err) => console.log(err));
  };

  const redirectAfterAdding = () => {
    return getRedirect && <Redirect to="/admin/dashboard" />;
  };

  const goBack = () => (
    <div className="mt3">
      <Link
        className="btn btn-sm mt3 br-pill dim bg-pink white b"
        to="/admin/dashboard"
      >
        Admin Home
      </Link>
    </div>
  );

  const successMessage = () => {
    if (createdProduct) {
      return (
        <p className="f4 center b green">
          {createdProduct} Added Successfully!
        </p>
      );
    }
  };

  const warningMessage = () => {
    if (error) {
      return (
        <div className="col col-12 tc">
          <p className="f4 red b">{error}</p>
        </div>
      );
    }
  };

  const createProductForm = () => (
    <form className="measure center ma3">
      <span>Post photo</span>
      <div className="form-group">
        <label className="hover-bg-black hover-white btn btn-block bg2 b--black br2 dim">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="pa2 input-reset ba bg2 hover-bg-black hover-white w-100 br2"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="pa2 input-reset ba bg2 hover-bg-black hover-white w-100 br2"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="pa2 input-reset ba bg2 hover-bg-black hover-white w-100 br2"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="pa2 input-reset ba bg2 hover-bg-black hover-white w-100 br2"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="pa2 input-reset ba bg2 hover-bg-black hover-white w-100 br2"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn bg1 dim mb-3 br2 w-100"
      >
        Update Product
      </button>
    </form>
  );

  return (
    <Base
      title="Add a Product Here"
      description="Welcome to product creation section"
      className="container"
    >
      <div className="col col-md-8 offset-md-2 bg3 br2 shadow-3">
        {goBack()}
        {successMessage()}
        {warningMessage()}
        {createProductForm()}
        {redirectAfterAdding()}
      </div>
    </Base>
  );
};

export default UpdateProduct;
