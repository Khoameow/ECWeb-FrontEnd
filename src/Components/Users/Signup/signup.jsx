import React, { useState } from "react";
import "./signup.css";
import logo from "../../../Images/mobilelogo.png";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../actions/userActions";
import { useEffect } from "react";
import LoadingBox from "../LoadingBox/loadingBox";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [matchPassword, setMatchPassword] = useState(null);

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      setMatchPassword("パスワードと確認パスワードが正しくない");
    } else if (password.length < 8) {
      setMatchPassword("パスワードは8文字以上入力してください");
    } else {
      setMatchPassword(null);
      dispatch(register(name, email, password));
    }
  };

  const pathname = window.location.search;
  const pathUrl = pathname.split("=");
  const path = pathUrl[1];

  useEffect(() => {
    if (userInfo) {
      if (path) {
        navigate(`/`);
      } else {
        navigate("/");
      }
    }
  });

  return (
    <div>
      <section>
        <div className="container-signup">
          <div className="logo-container">
            <img
              src={logo}
              className="logo-signup"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
              alt=""
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="signup-box">
              <p className="create-account-text">アカウント登録</p>
              {loading && <LoadingBox></LoadingBox>}
              {error && (
                <div className="signupErrorDiv">
                  <p className="signupErrorContent">{error} !</p>
                </div>
              )}
              {matchPassword && (
                <div className="signupErrorDiv">
                  <p className="signupErrorContent">{matchPassword} !</p>
                </div>
              )}
              <label htmlFor="name" className="name-label">
                名前
              </label>
              <br />
              <input
                type="text"
                name="name"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="email" className="email-label">
                メールアドレス
              </label>
              <br />
              <input
                type="email"
                name="email"
                className="input"
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
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <label htmlFor="password" className="password-label">
                パスワードを再入力
              </label>
              <br />
              <input
                type="password"
                name="Re-enter-password "
                className="input"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
              />
              <br />
              <button id="signup-btn">実行</button>
              <br />
              <p className="privacy-text">
                実行すると、MetaShopの使用条件とプライバシー通知に同意します。
                <hr />
              </p>
              <Link
                to={"/login"}
                className="signin"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login");
                }}
              >
                <span className="signinText">アカウントを持ちている方？ </span>
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Signup;
