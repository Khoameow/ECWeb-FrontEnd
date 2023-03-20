import React, { useEffect } from "react";
import "./cart.css";
import { addToCart, removeFromCart } from "../../../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Cart(props) {
  const proId = window.location.pathname.split("/");

  const productId = proId[2];

  const quantity = window.location.search.split("=");

  const qty = Number ? quantity[1] : 1;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignIn = useSelector((state) => state.userSignin);
  const { userInfo } = userSignIn;

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    if (userInfo) {
      navigate("/shipping");
    } else {
      navigate("/login?redirect=shipping");
    }
  };

  // const toPrice = (num) => {
  //     console.log("num", num);

  //     // Number(num.toFixed(2))
  // };

  console.log("cartItems", cartItems);
  console.log(cartItems.reduce((a, v) => (a = a + v.qty), 0));

  return (
    <div className="cartSection">
      {cartItems.length <= 0 ? (
        <div className="emptyCartDiv">
          <div className="emptyCart">
            <p className="emptyCartContentText">MetaShopカートが空です</p>
            <Link to="/" className="goShoppingLink">
              <p className="emptyCartShoppingLink">今すぐ買い物 {"›"}</p>
            </Link>
          </div>
        </div>
      ) : (
        <div className="cartContainer">
          <div className="cartBoxContainer">
            <p className="shoppingCartText">ショッピングカート</p>
            <p className="CartBoxPriceTitleText">価値</p>
            <hr className="cartTitleHr" />
            {cartItems.map((product) => (
              <div key={product.product} className="cartBox">
                <div className="cartImageDiv">
                  <img
                    className="cartImage"
                    src={product.imagePresent}
                    alt=""
                  />
                </div>
                <div className="cartContentBox">
                  <div className="cartProductTitleDiv">
                    <p className="cartProductTitle">{product.productName}</p>
                  </div>
                  <div className="cartStockDiv">
                    {product.stockTotal ? (
                      <p className="cartStockText">在庫</p>
                    ) : (
                      <p className="productScreenUnavailableText">在庫切れ</p>
                    )}
                  </div>
                  {product.stockTotal ? (
                    <div className="cartQtyBtnDiv">
                      <button className="cartBtnQty">
                        <span className="cartBtnText">数量: </span>
                        <select
                          className="cartSelectBtnQty"
                          defaultValue={1}
                          onChange={(e) =>
                            dispatch(
                              addToCart(product.product, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(product.stockTotal)].map((x, i) => (
                            <option key={i + 1}>{i + 1}</option>
                          ))}
                        </select>
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="cartDeleteDiv">
                    <p className="cartDeleteTextTag">
                      <span className="cartDeleteTextMark">|</span>
                      <span
                        onClick={() => {
                          removeFromCartHandler(product.product);
                        }}
                        className="cartDeleteText"
                      >
                        消除
                      </span>
                    </p>
                  </div>
                </div>
                <div className="cartProductPriceDiv">
                  <p className="cartProductPrice">{product.priceValue}</p>
                </div>
                <hr className="cartBottomHr" />
              </div>
            ))}

            <div className="subTotalCartDiv">
              <p className="subTotalCartText">
                <span className="cartSubTotalText">
                  合計 ({cartItems.reduce((a, c) => a + Number(c.qty), 0)}{" "}
                  {cartItems.length <= 1 ? "点" : "点"}) :{" "}
                </span>
                <span className="cartSubTotalPrice">
                  {" "}
                  ￥{cartItems.reduce((a, c) => a + c.priceValue * c.qty, 0)}
                </span>
              </p>
            </div>
          </div>
          <div className="checkoutBox">
            <p className="subTotalText">
              <span className="checkOutSubTotalText">
                合計({cartItems.reduce((a, c) => a + Number(c.qty), 0)} {"点)"}
              </span>
              <span className="checkOutSubTotalPrice">
                {" "}
                ￥{cartItems.reduce((a, c) => a + c.priceValue * c.qty, 0)}
              </span>
            </p>
            <button
              type="button"
              className="checkOutBtn"
              disabled={cartItems.length === 0}
              onClick={(e) => {
                e.preventDefault();
                checkoutHandler();
              }}
            >
              お会計へ進む
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
