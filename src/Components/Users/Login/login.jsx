import React, { useState } from "react";
import logo from "../../../Images/mobilelogo.png";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../../actions/userActions";
import LoadingBox from "../LoadingBox/loadingBox";
import { useEffect } from "react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userSignIn = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignIn;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  const pathname = window.location.search;
  const pathUrl = pathname.split("=");
  const path = pathUrl[1];

  useEffect(() => {
    if (userInfo) {
      if (path) {
        navigate(`/${path}`);
      } else {
        navigate("/");
      }
    }
  });

  return (
    <div>
      <section>
        <div className="container-login">
          <div className="logo-container">
            <img
              src={logo}
              className="logo-login"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
              alt=""
            />
          </div>
          <form onSubmit={handleLogin}>
            <div className="login-box">
              <p className="signin-text">MetaShopへようこそ</p>
              <hr />
              {loading && <LoadingBox></LoadingBox>}
              {error && (
                <div className="loginErrorDiv">
                  <p className="loginErrorContent">{error} !</p>
                </div>
              )}
              <label htmlFor="email" className="email-label">
                メールアドレス
              </label>
              <br />
              <input
                type="email"
                name="email"
                placeholder="メールアドレス"
                className="email-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <label htmlFor="password" className="password-label">
                パスワード
              </label>
              <br />
              <input
                type="password"
                name="password"
                className="password-input"
                placeholder="パスワード"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <button id="login-btn">実行</button>
              <br />
              <p className="privacy-text">
                実行すると、MetaShopの使用条件とプライバシー通知に同意したことになります。
              </p>
              <br />
              <hr />
              <button
                id="create-btn"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/signup?redirect=${path}`);
                }}
              >
                MetaShopアカウントを登録する
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Login;
