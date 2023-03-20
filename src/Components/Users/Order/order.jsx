import React, { useEffect } from "react";
import "./order.css";
import tick from "../../../Images/checked.png";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoadingBox from "../LoadingBox/loadingBox";
import MessageBox from "../MessageBox/messageBox";

function Order() {
  const navigate = useNavigate();

  const userSignIn = useSelector((state) => state.userSignin);
  const { userInfo } = userSignIn;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = new Date();

  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var week = new Date();
  var dayName = days[week.getDay()];

  var today = new Date(),
    date =
      dayName +
      ", " +
      today.getDate() +
      " " +
      monthNames[month.getMonth()] +
      " " +
      today.getFullYear();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login?redirect=shipping");
    } else if (!order) {
      navigate("/");
    }
  });

  const time = new Date();
  var paidAt =
    time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();

  return (
    <div className="orderSection">
      <div className="orderPlaceReturnDiv">
        <p
          className="orderPlaceReturn"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          ホームページへ戻る {">"}
        </p>
      </div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <div className="orderSectionContainer">
          <br />
          <div className="orderSectionContainerDiv">
            <div className="orderContainerSection">
              <br />
              <div className="orderContainer">
                <div className="orderPlaceTitleDiv">
                  <img src={tick} alt="" className="orderPlaceIcon" />
                  <p className="orderPlaceTitle">
                    {" "}
                    ご注文いただきありがとうございました。
                  </p>
                </div>
                <div className="orderPlaceConformationDiv">
                  <p className="orderPlaceConformationText">
                    ご登録されたメールに送ります。
                  </p>
                </div>
                <div className="orderPlaceShippingDiv">
                  <p className="orderPlaceShipping">配送へ</p>
                </div>
                <div className="orderPlacePaidAtDiv">
                  <p className="orderPlacePaidAt">
                    <span className="orderPlacePaidAtText">
                      Payment paid on:
                    </span>{" "}
                    注文
                  </p>
                </div>
                <hr className="orderPlaceHr" />
              </div>
              <div className="orderProductContainer">
                {order.orderItems.map((product) => (
                  <div
                    className="orderProductContainerAllContentDiv"
                    key={product.product}
                  >
                    <div className="orderPlaceProductSectionContainer">
                      <div className="orderPlaceDeliveryDateDiv">
                        <p className="orderPlaceDeliveryDate">{date}</p>
                        <p className="orderPlaceDeliveryText">配送日</p>
                      </div>
                      <div className="orderPlaceReviewDiv">
                        <Link to={"/orderhistory"} className="orderPlaceReview">
                          ご注文された情報 {">"}
                        </Link>
                      </div>
                    </div>
                    <div className="orderPlaceProductSection">
                      <div className="orderPlaceProductImageDiv">
                        <img
                          src={product.image}
                          alt=""
                          className="orderPlaceProductImage"
                        />
                      </div>
                      <div className="orderPlaceProductContentDiv">
                        <div className="orderPlaceProductTitleDiv">
                          <p className="orderPlaceProductTitle">
                            {product.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Order;
