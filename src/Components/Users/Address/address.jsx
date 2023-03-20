import React, { useState } from "react";
import "./address.css";
import checkout from "../../../Images/checkout-spc-address-banner.png";
import { useDispatch, useSelector } from "react-redux";
import {
  savePaymentMethod,
  saveShippingAddress,
} from "../../../actions/cartActions";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Address() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userSignIn = useSelector((state) => state.userSignin);
  const { userInfo } = userSignIn;

  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress } = cart;

  const [name, setName] = useState(shippingAddress && shippingAddress.name);
  const [mobile, setMobile] = useState(
    shippingAddress && shippingAddress.mobile
  );
  const [pinCode, setPinCode] = useState(
    shippingAddress && shippingAddress.pinCode
  );
  const [address, setAddress] = useState(
    shippingAddress && shippingAddress.address
  );
  const [place, setPlace] = useState(shippingAddress && shippingAddress.place);
  const [landmark, setLandmark] = useState(
    shippingAddress && shippingAddress.landmark
  );
  const [city, setCity] = useState(shippingAddress && shippingAddress.city);
  const [addressType, setAddressType] = useState(
    shippingAddress && shippingAddress.addressType
  );
  const [country, setCountry] = useState("日本");
  const [state, setState] = useState(shippingAddress && shippingAddress.state);

  const [paymentMethod, setPaymentMethod] = useState("現金");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        name,
        mobile,
        pinCode,
        address,
        place,
        landmark,
        city,
        addressType,
        state,
        country,
      })
    );
    setPaymentMethod("PayPal");
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/payment");
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login?redirect=shipping");
    }
  });

  return (
    <div className="addressSection">
      <div className="addressContainer">
        <div className="addressImageDiv">
          <img src={checkout} alt="" className="addressImage" />
        </div>
        <div className="addressTitleTextDiv">
          <p className="SelectDeliveryAddressText">配送住所を選択する</p>
        </div>
        <hr />
        {shippingAddress.name && (
          <div className="existingShippingAddressSection">
            <p className="existingShippingAddressName">{name}</p>
            <p className="existingShippingAddressAddress">{address}</p>
            <p className="existingShippingAddressPlace">{place}</p>
            <p className="existingShippingAddress">
              <span className="existingShippingAddressCity">{city}, </span>
              <span className="existingShippingAddressState">{state} </span>
              <span className="existingShippingAddressPinCode">{pinCode}</span>
            </p>
            <p className="existingShippingAddressCountry">{country}</p>
            {/* <p className="existingShippingAddInstructions">
              Add delivery instructions
            </p> */}
            <div className="existingShippingBtnDiv">
              <button className="existingShippingBtn" onClick={submitHandler}>
                この住所を使用する
              </button>
            </div>
            <hr />
          </div>
        )}
        <form onSubmit={submitHandler}>
          <div className="newAddressDiv">
            <div className="newAddressFormContainer">
              <p className="addNewAddressText">新しい住所を追加する</p>

              <div className="formDivTop">
                <label
                  htmlFor="country"
                  className="newAddressLabel labelCountry"
                >
                  国/地域
                </label>
                <select
                  name="country"
                  id=""
                  className="selectCountry"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="Japan" className="countryOption">
                    日本
                  </option>
                </select>
              </div>
              <div className="formDiv">
                <label htmlFor="name" className="newAddressLabel labelName">
                  名前　
                </label>
                <input
                  required
                  type="text"
                  className="inputSpace inputName"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="formDiv">
                <label htmlFor="number" className="newAddressLabel labelNumber">
                  電話番号
                </label>
                <input
                  required
                  type="tel"
                  className="inputSpace inputNumber"
                  name="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
              <div className="formDiv">
                <label
                  htmlFor="pincode"
                  className="newAddressLabel labelPincode"
                >
                  郵便番号
                </label>
                <input
                  required
                  type="num"
                  className="inputSpace inputPincode"
                  name="pincode"
                  value={pinCode}
                  placeholder="6 digits [0-9] PIN code"
                  onChange={(e) => setPinCode(e.target.value)}
                />
              </div>
              <div className="formDiv">
                <label htmlFor="flat" className="newAddressLabel labelFlat">
                  市区町村、区、町、番地
                </label>
                <input
                  required
                  type="text"
                  className="inputSpace inputFlat"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="formDiv">
                <label htmlFor="area" className="newAddressLabel labelArea">
                  建物名、アパート名、部屋番号
                </label>
                <input
                  required
                  type="text"
                  className="inputSpace inputArea"
                  name="place"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="newAddressLocationDiv">
            <div className="newAddressFormContainerRight">
              <div className="formDiv">
                <label
                  htmlFor="landmark"
                  className="newAddressLabel labelLandmark"
                >
                  目印
                </label>
                <br />
                <input
                  required
                  type="text"
                  className="inputSpace inputLandmark"
                  value={landmark}
                  placeholder="Metaマンションの前（任意）"
                  name="landmark"
                  onChange={(e) => setLandmark(e.target.value)}
                />
              </div>
              <div className="formDiv inputCityDiv">
                <label htmlFor="city" className="newAddressLabel labelCity">
                  都道府県
                </label>
                <br />
                <input
                  required
                  type="text"
                  className="inputCity"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="selectStateDiv">
                <label htmlFor="state" className="newAddressLabel labelState">
                  地域区分
                </label>
                <br />
                <select
                  name="state"
                  id=""
                  className="selectState"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">地域を選択</option>
                  <option value="hokkaidou">北海道</option>
                  <option value="tohoku">東北</option>
                  <option value="kantou">関東</option>
                  <option value="chuubu">中部</option>
                  <option value="kinki">近畿</option>
                  <option value="chuugoku">中国</option>
                  <option value="shikoku">四国</option>
                  <option value="kyuushuu">九州</option>
                </select>
              </div>
              <br />
              <div className="formDivTop">
                <input
                  type="checkbox"
                  className="addressCheckbox"
                  name="defaultAddress"
                />
                <label
                  htmlFor="addressDefault"
                  className="newAddressLabel labelDefaultAddress"
                >
                  配送先を保存する
                </label>
              </div>

              <div className="deliveryInstructionDiv">
                <p className="deliveryInstructionText">配送注意</p>
              </div>
              <div className="deliveryInstructionContentDiv">
                <p className="deliveryInstructionContentText">
                  配送時間が予定より早く、または遅く場合もあります。
                </p>
              </div>
              <div className="formDiv">
                <label htmlFor="type" className="newAddressLabel labelType">
                  配達時間の指定
                </label>
                <select
                  name="addressType"
                  id="selectAddress"
                  className="selectAddressType"
                  value={addressType}
                  onChange={(e) => setAddressType(e.target.value)}
                >
                  <option value="">配達時間の選択</option>
                  <option value="Home (7 am - 9 pm delivery)">
                    午前(9:00~12:00)
                  </option>
                  <option value="Office/Commercial (10 am - 6 pm delivery)">
                    午後(13:00~20:00)
                  </option>
                </select>
              </div>
              <div className="useAddressBtnDiv">
                <button className="useAddressBtn" type="submit">
                  確認画面に進む
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Address;
