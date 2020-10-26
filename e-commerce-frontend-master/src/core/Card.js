import React, { useState } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";

const Card = ({
  product,
  AddToCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  //const [count, setCount] = useState(product.count)

  const addToCart = () => {
    addItemToCart(product, () => {
      setRedirect(true);
    });
  };

  const getRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const shwoAddTtoCart = () => {
    return (
      AddToCart && (
        <button
          className="tc bg-washed-blue btn btn-block btn-outline-info b dim f6 br2 shadow-2"
          onClick={addToCart}
        >
          <i className="fa fa-shopping-cart"></i> Add To Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = () => {
    return (
      removeFromCart && (
        <button
          className="tc btn btn-block b btn-outline-danger dim f6 br2 shadow-2"
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
        >
          <i className="fa fa-trash"></i> Remove From Cart
        </button>
      )
    );
  };

  const cardTitle = product ? product.name : "T-Shirt";
  const cardPrice = product ? product.price : "Default Price";
  const cardDescription = product ? product.description : "Default Description";

  return (
    <section>
      <div className="card mt3 bn mw5 br2 bg-1 shadow-3 tc center grow">
        <div className="card-header bg1 white">{cardTitle}</div>
        {getRedirect(redirect)}
        <ImageHelper product={product} />
        <div className="pa2 ma1 bt bn">
          <p className="card-text bg1 white db">{cardDescription}</p>
          <p className="card-text db">Price : ₹{cardPrice}</p>
          {shwoAddTtoCart()}
          {showRemoveFromCart()}
        </div>
      </div>
    </section>
  );
};

export default Card;
