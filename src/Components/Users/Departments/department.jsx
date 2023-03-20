import React from "react";
import "./departments.css";
import { useNavigate } from "react-router-dom";

function Department(props) {
  const { departments } = props;
  const navigate = useNavigate();

  return (
    <div
      key={departments.categoryId}
      className="departmentBox"
      onClick={(e) => {
        e.preventDefault();
        navigate(`/product/${departments.categoryId}`);
      }}
    >
      <a className="departmentTitleLink">
        <h2 className="departmentTitle">{departments.categoryName}</h2>
      </a>
      <a className="departmentImageLink">
        <img
          src={departments.categoryImage}
          className="departmentImage"
          alt=""
        />
      </a>
      <br />
      <p
        className="departmentShopLink"
        onClick={(e) => {
          e.preventDefault();
          navigate(`/product/${departments.categoryId}`);
        }}
      >
        今すぐ買う
      </p>
    </div>
  );
}

export default Department;
