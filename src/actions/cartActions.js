import Axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";
import { apiGetProductDetailPath } from "../path/Users/pathApi";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(apiGetProductDetailPath(productId));

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      productName: data.productName,
      imagePresent: data.imagePresent,
      priceValue: data.priceValue,
      decimal: data.decimal,
      stockTotal: data.stockTotal,
      product: data.productId,
      qty,
    },
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};


export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};


export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};