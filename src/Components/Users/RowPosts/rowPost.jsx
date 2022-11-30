import React, { useEffect, useState } from 'react';
import './rowPost.css'
import axios from 'axios';
import LoadingBox from '../LoadingBox/loadingBox';
import MessageBox from '../MessageBox/messageBox';
import { useNavigate } from "react-router-dom";


function RowPost() {

    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
  
  
    useEffect(()=>{
      const fetchData = async ()=>{
  
        try{
          setLoading(false)
          const{data}=await axios.get('/app/api/product/getproductpresent')
          setLoading(false)
          setProducts(data)
          console.log("test1", data);
        }catch(err){
          setError(err.message)
          setLoading(false)
        }
      };
      fetchData();
    },[])

  return (
      <div>
          {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox>{error}</MessageBox>
        ) : (
            <div className="rowPosterSection">
            <div className='rowPosterContainer'>
                <div className="divRow">
                    <div className="posters">
                        {products.map(products=>(
                            <img key={products.productId} className='poster' src={products.imagePresent} alt="" onClick={(e)=>{
                              e.preventDefault()
                              navigate(`/products/${products.productId}`)
                            }}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
          )}
        
       
      </div>
  )
}

export default RowPost;
