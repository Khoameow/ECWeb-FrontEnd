const apiCategoryPath = "/app/api/category";
const apiProductPath = "/app/api/product";
const apiDeliveryPath = "/app/api/delivery";

export const apiGetAllCategoryPath = apiCategoryPath + "/getallcategory";
export const apiGetAllProductPath = apiProductPath + "/getallproduct";
export const apiGetProductPresentPath = apiProductPath + "/getproductpresent";
export const apiInsertDeliveryPath = apiDeliveryPath + "/insertdelivery";


export const apiGetProductDetailPath = (productId)   => {
    return apiProductPath + `/getproductdetail?productId=${productId}`;
}
export const apiGetProductByCategoryPath = (categoryId) => {
    return apiProductPath + `/getproductbycategoryId?categoryId=${categoryId}`;
}
export const apiGetDeliverybyIdsPath = (deliveryId) => {
    return apiDeliveryPath + `/getdeliverybyid?deliveryId=${deliveryId}`;
}

export const apiGetDeliveryByUserNamePath = (userName) => {
    return apiDeliveryPath + `/getdeliverybyusername?userName=${userName}`;
}

