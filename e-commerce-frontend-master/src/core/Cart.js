import React, { useState, useEffect } from "react";
import Base from "./Base";
import Card from "./Card";
import StripeCheckout from "./StripeCheckout";
import { loadCart } from "./helper/cartHelper";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = () => {
    return (
      <div className="tc">
        <p className="f2">Your Cart Items</p>
        {products.map((product, index) => {
          return (
            <Card
              key={index}
              product={product}
              AddToCart={false}
              removeFromCart={true}
              setReload={setReload}
              reload={reload}
            />
          );
        })}
      </div>
    );
  };

  const loadCheckout = () => {
    return (
      <StripeCheckout
        products={products}
        setReload={setReload}
        reload={reload}
      />
    );
  };

  return (
    <Base title="Cart" description="Items in your cart">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mb2">{loadAllProducts()}</div>
          <div className="col-md-6">{loadCheckout()}</div>
        </div>
      </div>
    </Base>
  );
};

export default Cart;
