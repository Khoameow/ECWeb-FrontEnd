import React, { useEffect, useState } from "react";
import "./productScreen.css";
import MessageBox from "../MessageBox/messageBox";
import LoadingBox from "../LoadingBox/loadingBox";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct } from "../../../actions/productActions";

function ProductScreen(props) {
  const [qty, setQty] = useState(1);
  const [cart, setCart] = useState([]);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const proId = window.location.pathname.split("/");

  const productId = proId[2];
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const data = async () => {
    localStorage.removeItem("orderDetails");
  };

  data();

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const handleAddCart = (e) => {
    setCart([
      {
        id: product.productId,
        title: product.productName,
        brand: product.manufactureName,
        category: product.category,
        image: product.image,
        price: product.price,
        quantity: qty,
      },
    ]);
    navigate(`/cart/${productId}?qty=${qty}`);
  };

  const handleBuyNow = (e) => {
    setCart([
      {
        id: product.productId,
        title: product.productName,
        brand: product.manufactureName,
        category: product.category,
        image: product.category,
        price: product.price,
        quantity: qty,
      },
    ]);
    // const cartItem = [{
    //     id: product.productId,
    //     title: product.productName,
    //     brand: product.manufactureName,
    //     category: product.category,
    //     image: product.category,
    //     price: product.price,
    //     quantity: qty
    // }]
    // console.log("carbuy", cartItem);
    // localStorage.setItem('Cart', JSON.stringify(cartItem))
    navigate("/shipping");
  };

  useEffect(() => {
    localStorage.setItem("Cart", JSON.stringify(cart));
  }, [cart]);

  if (!product) {
    return <MessageBox>{error}</MessageBox>;
  }

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : product ? (
        <div className="productScreenSection">
          <div className="productScreenImageDiv">
            <img
              className="productScreenImage"
              src={product.imagePresent}
              alt=""
            />
          </div>
          <div className="productScreenContentDiv">
            <div className="productScreenContentTextDiv">
              <div className="productScreenTitleDiv">
                <p className="productScreenTitle">{product.productName}</p>
              </div>
              <div className="productScreenBrandDiv">
                <p className="productScreenBrand">{product.manufactureName}</p>
              </div>
              <div className="productScreenRatingDiv">
                <span>
                  {" "}
                  <i
                    className={
                      product.ratingValue >= 1
                        ? "fa fa-star"
                        : product.ratingValue >= 0.5
                        ? "fa fa-star-half"
                        : "fa fa-star-o"
                    }
                  ></i>{" "}
                </span>
                <span>
                  {" "}
                  <i
                    className={
                      product.ratingValue >= 2
                        ? "fa fa-star"
                        : product.ratingValue >= 1.5
                        ? "fa fa-star-half"
                        : "fa fa-star-o"
                    }
                  ></i>{" "}
                </span>
                <span>
                  {" "}
                  <i
                    className={
                      product.ratingValue >= 3
                        ? "fa fa-star"
                        : product.ratingValue >= 2.5
                        ? "fa fa-star-half"
                        : "fa fa-star-o"
                    }
                  ></i>{" "}
                </span>
                <span>
                  {" "}
                  <i
                    className={
                      product.ratingValue >= 4
                        ? "fa fa-star"
                        : product.ratingValue >= 3.5
                        ? "fa fa-star-half"
                        : "fa fa-star-o"
                    }
                  ></i>{" "}
                </span>
                <span>
                  {" "}
                  <i
                    className={
                      product.ratingValue >= 5
                        ? "fa fa-star"
                        : product.ratingValue >= 4.5
                        ? "fa fa-star-half"
                        : "fa fa-star-o"
                    }
                  ></i>{" "}
                </span>
              </div>
              <div className="productScreenReviewDiv">
                <span className="productScreenReviewText"> 評価</span>
              </div>
              <br />
              <div className="productScreenDescriptionDiv">
                <p className="productScreenDescription">{product.decription}</p>
              </div>
              <div className="productScreenPriceDiv">
                <p className="productScreenPrice">
                  <span className="productScreenPriceTitle">金額: </span>
                  <span className="productScreenPriceValue">￥</span>
                  <span className="productScreenPriceValue">
                    {product.priceValue}
                  </span>
                </p>
              </div>
              <div className="productScreenInStockDiv">
                {product.stockTotal ? (
                  <p className="productScreenInStockText">在庫ある</p>
                ) : (
                  <p className="productScreenUnavailableText">在庫切れ</p>
                )}
              </div>
              {product.stockTotal ? (
                <div className="productScreenQtyBtnDiv">
                  <button className="btnQty">
                    <span className="btnText">数量: </span>
                    <select
                      name=""
                      id=""
                      value={qty}
                      className="selectBtnQty"
                      onChange={(e) => setQty(e.target.value)}
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

              {product.stockTotal ? (
                <div className="CartBuyButtonsDiv">
                  <button
                    onClick={() => handleAddCart()}
                    className="ProductCartBtn"
                  >
                    <span className="ProductCartBtnText">カートに入れる</span>
                  </button>
                  <button
                    onClick={() => handleBuyNow()}
                    className="ProductBuyBtn"
                  >
                    <span className="ProductBuyBtnText">今すぐ購入</span>
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      ) : (
        <LoadingBox></LoadingBox>
      )}
    </div>
  );
}

export default ProductScreen;
