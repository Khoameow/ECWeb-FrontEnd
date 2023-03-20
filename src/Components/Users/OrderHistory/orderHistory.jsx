import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listOrderMine } from "../../../actions/orderActions";
import LoadingBox from "../LoadingBox/loadingBox";
import MessageBox from "../MessageBox/messageBox";
import "./orderHistory.css";

function OrderHistory() {
  const navigate = useNavigate();

  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);

  const monthNames = [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ];

  const month = new Date();

  var days = [
    "土曜日",
    "日曜日",
    "月曜日",
    "火曜日",
    "水曜日",
    "木曜日",
    "金曜日",
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

  return (
    <div className="orderHistorySection">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <div className="orderHistoryContainer">
          <div className="orderHistoryContainerSection">
            <div className="orderHistoryAccountTextDiv">
              <p className="orderHistoryAccountText">
                <span
                  className="orderHistoryYourAccountText"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/");
                  }}
                >
                  ホーム画面{" "}
                </span>
                {"  "} {"  ›"}{" "}
                <span className="orderHistoryYourOrdersText">
                  {" "}
                  ご注文された情報
                </span>
              </p>
            </div>
            <div className="orderHistoryTitleDiv">
              <p className="orderHistoryTitle">ご注文された商品</p>
            </div>
            <hr />
            <div className="orderHistoryOrderNumberDiv">
              <p className="orderHistoryOrderNumber">
                {orders && orders.length} {orders && orders.length > 1}
                {"件 "}
                <span className="orderHistoryOrderNumberText">
                  注文されました
                </span>
              </p>
            </div>
            {orders.map((order) => {
              console.log("order", order.createDate);
              const date = new Date(order.createDate);
              console.log("date", date);
              const dateShow =
                dayName +
                ", " +
                date.getDate() +
                "日" +
                monthNames[date.getMonth()] +
                " " +
                date.getFullYear() +
                "年";
              console.log("dateShow", dateShow);
              let status = "";
              let statusTranfer = "";
              if (order.status === 1) {
                status = "処理中";
                statusTranfer = "ご注文された商品が発送されます。";
              } else if (order.status === 2) {
                status = "支払いが完了しました。";
                statusTranfer = "配送先に届きました。";
              } else {
                status = "キャンセルされた。";
                statusTranfer = "ご注文がキャンセルされました。";
              }
              return (
                <div
                  className="orderHistoryProductContainer"
                  key={order.deliveryId}
                >
                  <div className="orderHistoryProductHeadContainer">
                    <div className="orderHistoryProductHeadDiv">
                      <div className="orderHistoryOrderPlacedContainer">
                        <br />
                        <div className="orderHistoryOrderPlacedDiv">
                          <p className="orderHistoryOrderPlacedText upperText">
                            注文日
                          </p>
                        </div>
                        <div className="orderHistoryOrderDateDiv">
                          <p className="orderHistoryOrderDateText">
                            {dateShow}{" "}
                          </p>
                        </div>
                        <br />
                      </div>
                      <div className="orderHistoryOrderTotalContainer">
                        <br />
                        <div className="orderHistoryOrderTotalDiv">
                          <p className="orderHistoryOrderTotalText upperText">
                            合計
                          </p>
                        </div>
                        <div className="orderHistoryOrderPriceDiv">
                          <p className="orderHistoryOrderPriceText">
                            ￥{order.totalPrice}
                          </p>
                        </div>
                        <br />
                      </div>
                      <div className="orderHistoryOrderShipContainer">
                        <br />
                        <div className="orderHistoryOrderShipDiv">
                          <p className="orderHistoryOrderShipText upperText">
                            配送先
                          </p>
                        </div>
                        <div className="orderHistoryOrderShippingAddressDiv">
                          <p className="orderHistoryOrderShippingAddressText">
                            {order.shippingAddress.name}{" "}
                            <i class="fas fa-angle-down"></i>
                            <ul className="dropdown-content">
                              <div className="orderShippingDropDownSection">
                                <div className="orderShippingDropDownDiv">
                                  <p className="orderShippingDropDownAddressName">
                                    {order.shippingAddress.name}
                                  </p>
                                  <p className="orderShippingDropDownAddressAddress">
                                    {order.shippingAddress.address}
                                  </p>
                                  <p className="orderShippingDropDownAddressPlace">
                                    {order.shippingAddress.place}
                                  </p>
                                  <p className="orderShippingDropDownAddress">
                                    <span className="orderShippingDropDownAddressCity">
                                      {order.shippingAddress.city},{" "}
                                    </span>
                                    <span className="orderShippingDropDownAddressState">
                                      {order.shippingAddress.state}{" "}
                                    </span>
                                    <span className="orderShippingDropDownAddressPinCode">
                                      {order.shippingAddress.pinCode}
                                    </span>
                                  </p>
                                  <p className="orderShippingDropDownAddressCountry">
                                    {order.shippingAddress.country}
                                  </p>
                                  <p className="orderShippingDropDownPhone">
                                    電話番号: {order.shippingAddress.mobile}
                                  </p>
                                </div>
                              </div>
                            </ul>
                          </p>
                        </div>
                        <br />
                      </div>
                      <div className="orderHistoryOrderIdContainer">
                        <br />
                        <div className="orderHistoryOrderIdDiv">
                          <p className="orderHistoryOrderIdText upperText">
                            ご注文番号：# {order.deliveryId}
                          </p>
                        </div>
                        <div className="orderHistoryOrderDetailsDiv">
                          <p className="orderHistoryOrderDetailsText">
                            <span
                              className="orderHistoryOrderViewDetailsText"
                              onClick={(e) => {
                                e.preventDefault();
                                navigate(`/order/${order.deliveryId}`);
                              }}
                            >
                              商品情報{" "}
                            </span>{" "}
                            {/* |{" "}
                            <span className="orderHistoryOrderInvoiceText">
                              {" "}
                              明細書
                            </span> */}
                          </p>
                        </div>
                        <br />
                      </div>
                    </div>
                  </div>

                  <div className="orderHistoryProductContentContainer">
                    <br />
                    <div className="orderHistoryProductContentDiv">
                      <div className="orderHistoryProductContentOrderDiv">
                        <div className="orderHistoryProductOrderStatusDiv">
                          <p className="orderHistoryProductOrderStatus">
                            {status}
                          </p>
                        </div>
                        <div className="orderHistoryProductOrderStatusTextDiv">
                          <p className="orderHistoryProductOrderStatusText">
                            {statusTranfer}
                          </p>
                        </div>
                        {order.orderItems.map((product) => (
                          <div key={product.product}>
                            <div className="orderHistoryProductImageDiv">
                              <img
                                className="orderHistoryProductImage"
                                src={product.imagePresent}
                                alt=""
                              />
                            </div>
                            <div className="orderHistoryProductNameDiv">
                              <p className="orderHistoryProductName">
                                {product.productName}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
