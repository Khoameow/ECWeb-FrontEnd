const apiCategoryPath = "/app/api/category";
const apiProductPath = "/app/api/product";

export const apiGetAllCategoryPath = apiCategoryPath + "/getallcategory";
export const apiGetAllProductPath = apiProductPath + "/getallproduct";
export const apiGetProductPresentPath = apiProductPath + "/getproductpresent";
export const apiGetProductDetailPath = (productId) => {
    return apiProductPath + `/getproductdetail?productId=${productId}`;
}
export const apiGetProductByCategoryPath = (categoryId) => {
    return apiProductPath + `/getproductbycategoryId?categoryId=${categoryId}`;
}

