import React from "react";
import { isAuthenticated } from "../auth/helper/index";
import { emptyCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import StripeCheckoutCard from "react-stripe-checkout";
import { API, STRIPE } from "../Backend.js";
import { createOrder } from "./helper/orderHelper";

const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const userToken = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getFinalPrice = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        //console.log(response);
        const { status } = response;
        console.log("STATUS : ", status);

        const orderData = {
          products,
          amount: response.amount,
          transaction_id: response.id,
          address: response.address,
        };

        createOrder(userId, userToken, orderData);

        emptyCart(() => {
          console.log("Cart Empty");
        });

        setReload(!reload);
      })
      .catch((err) => console.log(err));
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckoutCard
        name="Place your order"
        token={makePayment}
        stripeKey={STRIPE}
        amount={getFinalPrice() * 100} // cents
        currency="INR"
        shippingAddress
        billingAddress
      >
        <button className="btn bg-green b btn-block br2 dim white hover-white mt2">
          Pay With Stripe
        </button>
      </StripeCheckoutCard>
    ) : (
      <Link to="/signin" className="text-decoration-none">
        <button className="btn b bg1 btn-block br2 dim white hover-white mt2">
          Sign In to checkout
        </button>
      </Link>
    );
  };

  return (
    <div>
      <p className="f3">Your total amount is ₹{getFinalPrice()}</p>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
