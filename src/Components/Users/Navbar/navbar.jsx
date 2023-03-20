import React, { useState, useEffect } from "react";
import "./navbar.css";
import Logo from "../../../Images/mobilelogo.png";
import Location from "../../../Images/location.png";
import Cart from "../../../Images/cart.png";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../../actions/userActions";
import { Search } from "../../../../node_modules/@material-ui/icons/index";
import { List, X } from "react-bootstrap-icons";
import { Icon } from "@iconify/react";
import axios from "axios";
import { Scrollbars } from "react-custom-scrollbars";
import {
  apiGetAllCategoryPath,
  apiGetAllProductPath,
} from "../../../path/Users/pathApi";

function Home() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [sidebar, setSidebar] = useState(false);
  const [departments, setDepartments] = useState(false);
  const [products, setProducts] = useState(false);
  const [search, setSearch] = useState(false);

  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress } = cart;

  const userSignIn = useSelector((state) => state.userSignin);
  const { userInfo } = userSignIn;

  const signOutHandler = () => {
    dispatch(signout());
  };

  const get_departments = async () => {
    let url = apiGetAllCategoryPath;
    const { data } = await axios.get(url);
    setDepartments(data);
  };

  const get_products = async () => {
    const { data } = await axios.get(apiGetAllProductPath);

    setProducts(data);
  };
  console.log("datanav", products);

  const activate_sidebar = () => {
    setSidebar(true);
  };

  const deactivate_sidebar = () => {
    setSidebar(false);
  };

  useEffect(() => {
    get_departments();
    get_products();
  }, []);

  return (
    <div className="navcontainer">
      <div className="navbarContainer">
        <header className="userHomeHeader">
          <div className="row logoRowHomeHeader">
            <div className="amazonNavLogoDiv">
              <div
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/");
                }}
              >
                <img className="amazonNavLogo" src={Logo} alt="" />
                <p class="logoName">MetaShop</p>
              </div>
            </div>
            <div className="locationRowHomeHeader">
              <div className="locationNavLogoDiv">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/shipping");
                  }}
                >
                  <img className="locationNavLogo" src={Location} alt="" />
                </a>
              </div>
              <div className="navShippingAddressDiv">
                <p
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/shipping");
                  }}
                  className="navText"
                >
                  {userInfo && shippingAddress.name
                    ? "Deliver to " + shippingAddress.name
                    : "こんにちは"}
                  <br />
                  <span className="navHighText">
                    {userInfo && shippingAddress.name
                      ? shippingAddress.city + " " + shippingAddress.pinCode
                      : "住所を選択する"}
                  </span>
                </p>
              </div>
            </div>
            <div className="navSearchBarDiv">
              <input
                type="text"
                className="navSearchBar"
                onChange={(e) => {
                  setSearch(e.target.value.toLowerCase());
                }}
              />
              <div className="searchIconContainer">
                <div className="searchIconDiv">
                  <Search className="searchIcon" />
                </div>
              </div>
              {products && (
                <div className="navSearchList">
                  {products
                    .filter((product) => {
                      if (search === "") {
                        return false;
                        // }else if(product.name.toLowerCase().includes(search) || product.category.toLowerCase().includes(search) || product.brand.toLowerCase().includes(search)){
                      } else if (product.productName != null) {
                        if (
                          product.productName.toLowerCase().includes(search)
                        ) {
                          return product;
                        }
                      }
                    })
                    .map((product, key) => {
                      return (
                        <div key={key}>
                          <p
                            onClick={(e) => {
                              e.preventDefault();
                              navigate(`/product/${product.department}`);
                            }}
                          >
                            {product.name}
                          </p>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
            <div className="navTranslateIcon"></div>
            <div className="navTextDivAccount">
              <a>
                {" "}
                <p className="navText">
                  こんにちは, {userInfo ? userInfo.username : "ログイン"} <br />
                  <span className="navHighText">アカウント & リスト </span>
                  <i class="fas fa-caret-down"></i>
                </p>
              </a>
              <ul className="dropdown-content">
                {userInfo ? (
                  <div className="navSignOutDiv">
                    <br />
                    <div className="navSignOutContainer">
                      <p className="navSignOutTitle">アカウント</p>
                      <p
                        className="navSignOutYourAccount"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/login&security");
                        }}
                      >
                        あなたのアカウント
                      </p>
                      <p
                        className="navSignOutWishList"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/cart/:id");
                        }}
                      >
                        あなたのリスト
                      </p>
                      <p
                        className="navSignOutOrders"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/orderhistory");
                        }}
                      >
                        ご注文
                      </p>
                      <p className="navSignOutSignOut" onClick={signOutHandler}>
                        サイアウト
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="navSignInDiv">
                    <br />
                    <button
                      className="navSignInBtn"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/login");
                      }}
                    >
                      ログイン
                    </button>
                  </div>
                )}
              </ul>
            </div>
            <div className="navTextDivOrders">
              <Link to={"/orderhistory"} style={{ textDecoration: "none" }}>
                <p className="navText">
                  返品もこちら
                  <br />
                  <span className="navHighText">& 注文履歴</span>
                </p>
              </Link>
            </div>
            <div className="navTextDivCart">
              <Link to="/cart/:id" style={{ textDecoration: "none" }}>
                <img className="cartNavLogo" src={Cart} alt="" />
                <div className="navCartCountDiv">
                  <span className="navCartCountText">{cartItems.length}</span>
                </div>
                <p className="navHighText cartText">カート</p>
              </Link>
            </div>
          </div>
          <div className="row departmentRowHomeHeader">
            <div className="departmentRowHomeHeaderContainer">
              <List className="navbarToggleIcon" onClick={activate_sidebar} />
              {sidebar && (
                <section className="sidebarSection">
                  <div className="sidebarContainer">
                    <div className="sidebarHeader">
                      <div className="sidebarHeaderContainer">
                        <p className="sidebarHeaderText">
                          <span>
                            <Icon
                              icon="carbon:user-avatar-filled"
                              style={{ color: "white", fontSize: "2rem" }}
                            />
                          </span>{" "}
                          <p className="sidebarHeaderText sidebarHeaderTextSpan">
                            こんにちは, {userInfo ? userInfo.name : "ログイン"}
                          </p>
                          <p className="navSidebarCloseIcon">
                            <X
                              style={{ color: "white", fontSize: "2rem" }}
                              onClick={deactivate_sidebar}
                            />
                          </p>
                        </p>
                      </div>
                    </div>
                    <div className="sidebarBody">
                      <Scrollbars style={{ width: "365px", height: "600px" }}>
                        <div className="sidebarBodyContainer">
                          <div className="sidebarTrendingSection">
                            <p className="sidebarBodyTitle">Trending</p>
                            <div
                              className="sidebarBodyTextDiv"
                              onClick={(e) => {
                                e.preventDefault();
                                deactivate_sidebar();
                              }}
                            >
                              <p
                                className="sidebarBodyText"
                                onClick={(e) => {
                                  e.preventDefault();
                                  deactivate_sidebar();
                                }}
                              >
                                ベストセール
                              </p>
                            </div>
                            <div
                              className="sidebarBodyTextDiv"
                              onClick={(e) => {
                                e.preventDefault();
                                deactivate_sidebar();
                              }}
                            >
                              <p
                                className="sidebarBodyText"
                                onClick={(e) => {
                                  e.preventDefault();
                                  deactivate_sidebar();
                                }}
                              >
                                新しい商品
                              </p>
                            </div>
                            <div
                              className="sidebarBodyTextDiv"
                              onClick={(e) => {
                                e.preventDefault();
                                deactivate_sidebar();
                              }}
                            >
                              <p
                                className="sidebarBodyText"
                                onClick={(e) => {
                                  e.preventDefault();
                                  deactivate_sidebar();
                                }}
                              >
                                問い合わせ
                              </p>
                            </div>
                            <hr />
                          </div>
                          {departments && (
                            <div className="sidebarTrendingSection">
                              <p className="sidebarBodyTitle">
                                カテゴリーから買う
                              </p>
                              {departments.map((department) => (
                                <div
                                  key={department.categoryId}
                                  className="sidebarBodyTextDiv"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    navigate(
                                      `/product/${department.categoryId}`
                                    );
                                    deactivate_sidebar();
                                  }}
                                >
                                  <p
                                    className="sidebarBodyText"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      navigate(
                                        `/product/${department.categoryId}`
                                      );
                                      deactivate_sidebar();
                                    }}
                                  >
                                    {department.categoryName}
                                  </p>
                                </div>
                              ))}
                              <hr />
                            </div>
                          )}
                          <div className="sidebarTrendingSection">
                            <p className="sidebarBodyTitle">ヘルプ & 設定</p>
                            <div
                              className="sidebarBodyTextDiv"
                              onClick={(e) => {
                                e.preventDefault();
                                navigate("/login&security");
                              }}
                            >
                              <p
                                className="sidebarBodyText"
                                onClick={(e) => {
                                  e.preventDefault();
                                  navigate("/login&security");
                                }}
                              >
                                あなたのアカウント
                              </p>
                            </div>
                            <div className="sidebarBodyTextDiv">
                              {userInfo ? (
                                <p
                                  className="sidebarBodyText"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    signOutHandler();
                                    deactivate_sidebar();
                                  }}
                                >
                                  ログアウト
                                </p>
                              ) : (
                                <p
                                  className="sidebarBodyText"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    navigate("/login");
                                  }}
                                >
                                  ログイン
                                </p>
                              )}
                            </div>
                            <hr />
                          </div>
                        </div>
                      </Scrollbars>
                    </div>
                  </div>
                </section>
              )}
              <div className="departmentRowHomeHeaderContentDiv">
                <Link to="/products">
                  <p className="departmentRowHomeHeaderContentText">All</p>
                </Link>
              </div>
              {departments && (
                <div>
                  {departments.map((department) => (
                    <div
                      key={department.categoryId}
                      className="departmentRowHomeHeaderContentDiv"
                    >
                      <p
                        className="departmentRowHomeHeaderContentText"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/product/${department.categoryId}`);
                        }}
                      >
                        {department.categoryName}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}

export default Home;
