import React, { useEffect } from 'react';
import './products.css'
import {useNavigate} from 'react-router-dom'
import LoadingBox from '../LoadingBox/loadingBox';
import MessageBox from '../MessageBox/messageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../../actions/productActions';

function Products() {

    const navigate = useNavigate()

    const dispatch = useDispatch()
    const productList = useSelector((state)=> state.productList)
    const {loading, error, products} = productList
    
    useEffect(() => {
        dispatch(listProducts())
    }, [])

    return (
        <div className='productsSectionContainer'>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox>{error}</MessageBox>
            ) : (
                <div className="productsContainer">
                    {products.map(product => (
                        <div key={product.productId} className="productBox" onClick={(e)=>{
                            navigate(`/products/${product.productId}`)
                        }}>
                            <div className="productsImageDiv">
                                <a className='productsImageLink'><img className='productsImage' src={product.imagePresent} alt="" /></a>
                            </div>
                            <div className='productsTitleDiv'>
                                <a className='productsTitleLink'><p className='productsTitle'>{product.productName}</p></a>
                            </div>

                            <div className="productsRatingDiv">
                                <span> <i className={product.ratingValue >= 1 ? "fa fa-star" : product.ratingValue >= 0.5 ? "fa fa-star-half" : "fa fa-star-o"}></i> </span>
                                <span> <i className={product.ratingValue >= 2 ? "fa fa-star" : product.ratingValue >= 1.5 ? "fa fa-star-half" : "fa fa-star-o"}></i> </span>
                                <span> <i className={product.ratingValue >= 3 ? "fa fa-star" : product.ratingValue >= 2.5 ? "fa fa-star-half" : "fa fa-star-o"}></i> </span>
                                <span> <i className={product.ratingValue >= 4 ? "fa fa-star" : product.ratingValue >= 3.5 ? "fa fa-star-half" : "fa fa-star-o"}></i> </span>
                                <span> <i className={product.ratingValue >= 5 ? "fa fa-star" : product.ratingValue >= 4.5 ? "fa fa-star-half" : "fa fa-star-o"}></i> </span>
                            </div>
                            <div className='productsReviewDiv'><span className='productsReviewText'>{200}</span></div>
                            <br />
                            <div className='productsPriceDiv'>
                                <p className='productsPrice'><span className='productsPriceDollar'>$</span><span className='productsPriceText'>{product.priceValue}</span></p>
                            </div>
                            <hr />
                        </div>
                    ))}

                </div>
            )}

        </div>
    )
}

export default Products;
