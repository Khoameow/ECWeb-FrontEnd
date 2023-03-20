import React, { useEffect } from "react";
import "./payment.css";
import paymentLogo from "../../../Images/confirm-banner.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../../actions/orderActions";
import { ORDER_CREATE_RESET } from "../../../constants/orderConstants";
import LoadingBox from "../LoadingBox/loadingBox";
import axios from "axios";

function Payment() {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  var dta = localStorage.getItem("Cart");
  console.log("cart", cart);
  const { cartItems, shippingAddress } = cart;

  const userSignIn = useSelector((state) => state.userSignin);
  const { userInfo } = userSignIn;

  const toPrice = (num) => Number(num.toFixed(2));

  const itemsPrice = toPrice(
    cartItems.reduce((a, c) => a + Number(c.priceValue) * Number(c.qty), 0)
  );
  const shippingPrice = Math.ceil(
    cartItems.reduce(
      (a, c) => a + (Number(c.priceValue) * Number(c.qty) * 5) / 100,
      0
    )
  );
  console.log(
    "itemsPrice",
    cartItems.reduce((a, c) => a + Number(c.priceValue) * Number(c.qty), 0)
  );
  console.log("shippingPrice", shippingPrice);
  const totalOrderPrice = itemsPrice + shippingPrice;
  const promotionalApplied = Number(
    totalOrderPrice - shippingPrice - (itemsPrice * 5) / 100
  );
  const discountPrice = toPrice(totalOrderPrice - promotionalApplied);
  const totalPrice = toPrice(totalOrderPrice - discountPrice);

  const orderCreate = useSelector((state) => state.orderCreate);
  console.log("orderCreate", orderCreate);
  const { loading, success, error, order } = orderCreate;

  cart.itemsPrice = itemsPrice;
  cart.shippingPrice = shippingPrice;
  cart.discountPrice = discountPrice;
  cart.totalPrice = totalPrice;
  cart.userName = userInfo ? userInfo.username : "";

  useEffect(() => {
    if (!userInfo) {
      navigate("/login?redirect=shipping");
    } else if (cartItems.length <= 0) {
      navigate("/");
    } else if (!shippingAddress) {
      navigate("/shipping");
    }
  });

  const update_stock = async (data) => {
    let url = "/api/products/edit";
    await axios.post(url, data);
  };
  const dispatch = useDispatch();
  //click sang phan complete payment
  const placeOrderHandler = () => {
    for (let i = 0; i < cart.cartItems.length; i++) {
      let countInStock = cart.cartItems[i].countInStock - cart.cartItems[i].qty;
      let proId = cart.cartItems[i].product;
      const data = {
        _id: proId,
        countInStock: countInStock + "",
      };
      // update_stock(data)
    }

    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      console.log("order111", order);
      navigate(`/order/${order.deliveryId}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, success, navigate, order]);
  console.log("cartitem", cartItems);
  return (
    <div className="paymentSection">
      {error && (
        <div className="ErrorDiv">
          <p className="ErrorContent">{error} !</p>
        </div>
      )}
      <div className="paymentContainer">
        <div className="paymentImageDiv">
          <img src={paymentLogo} alt="" />
        </div>
        <div className="paymentTitleDiv">
          <p className="paymentTitle">支払い方法を選択する</p>
        </div>
        <div className="paymentContentContainer">
          <div className="paymentMethodContainerDiv">
            <div className="paymentMethodTitleDiv">
              <p className="paymentMethodTitle">支払い方法</p>
            </div>
            <div className="paymentMethodContentDiv">
              <p className="paymentMethodContent">現金</p>
            </div>
          </div>
          <div className="paymentContentContainerDivSection">
            {cartItems.map((product) => (
              <div key={product.product} className="paymentContentDiv">
                <div className="paymentContentImageDiv">
                  <img
                    src={product.imagePresent}
                    alt=""
                    className="paymentContentImage"
                  />
                </div>
                <div className="paymentContentContainerDiv">
                  <div className="paymentContentProductTitleDiv">
                    <p className="paymentContentProductTitle">
                      {product.productName}
                    </p>
                  </div>

                  <div className="paymentContentProductPriceDiv">
                    <p className="paymentContentProductPrice">
                      金額 :￥{product.priceValue}
                    </p>
                  </div>
                  <div className="paymentContentProductQtyDiv">
                    <p className="paymentContentProductQtyTitle">
                      数量 :{" "}
                      <span className="paymentContentProductQty">
                        {product.qty}{" "}
                      </span>{" "}
                      <span
                        className="paymentContentProductQtyChange"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/cart/:id");
                        }}
                      >
                        {" "}
                        変更
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="paymentPlaceSection">
        <div className="paymentPlaceContainer">
          <div className="paymentPlaceContinueBtnDiv">
            <button
              className="paymentPlaceContinueBtn"
              onClick={(e) => {
                e.preventDefault();
                placeOrderHandler();
              }}
            >
              レジに進む
            </button>
          </div>
          <div className="paymentPlaceOrderTitleDiv">
            <p className="paymentPlaceOrderTitle">注文情報</p>
          </div>
          <div className="paymentPlaceItemsTextDiv">
            <p className="paymentPlaceItemsText">金額 : </p>
            <p className="paymentPlaceItemsPrice">￥{itemsPrice}</p>
          </div>
          <div className="paymentPlaceDeliveryTextDiv">
            <p className="paymentPlaceDeliveryText">配送料 : </p>
            <p className="paymentPlaceDeliveryPrice">￥{shippingPrice}</p>
          </div>
          <div className="paymentPlaceTotalTextDiv">
            <p className="paymentPlaceTotalText">合計 : </p>
            <p className="paymentPlaceTotalPrice">￥{totalOrderPrice}</p>
          </div>
          <div className="paymentPlacePromotionTextDiv">
            <p className="paymentPlacePromotionText">プロモーション適用 :</p>
            <p className="paymentPlacePromotionPrice">‒￥{discountPrice}</p>
          </div>
          <hr />
          <div className="paymentPlaceOrderTotalDiv">
            <p className="paymentPlaceOrderTotal">注文合計 :</p>
            <p className="paymentPlaceOrderTotalPrice">￥{totalPrice}</p>
          </div>
          <hr />
          <div className="paymentPlaceSavingsTextDiv">
            <p className="paymentPlaceSavingsText">クーポン :</p>
            <p className="paymentPlaceSavingPrice">￥{discountPrice}</p>
            <ul className="ulSection">
              <li>
                <span className="liText">配送料</span>
              </li>
              <li>
                <span className="liText">商品割引</span>
              </li>
            </ul>
          </div>
          {loading && <LoadingBox></LoadingBox>}
        </div>
      </div>
    </div>
  );
}

export default Payment;
