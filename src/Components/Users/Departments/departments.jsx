import React, { useEffect, useState } from 'react';
import './departments.css'
import axios from 'axios';
import Department from './department';
import LoadingBox from '../LoadingBox/loadingBox';
import MessageBox from '../MessageBox/messageBox';
import Banner from '../Banner/Banner';


function Departments() {

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  useEffect(()=>{
    const fetchData = async ()=>{

      try{
        setLoading(true)
        const {data} =await axios.get('/apicategory/getallcategory')
      //   const data = [
      //     {
      //         _id:'1',
      //         title:'Electronics',
      //         image:'https://s16458.pcdn.co/wp-content/uploads/2019/11/Anker-Charger-250x300.jpg'
      //     },
      //     {
      //         _id:'2',
      //         title:'Smartwatches',
      //         image:'https://cf1.s3.souqcdn.com/item/2020/10/14/13/19/07/98/9/item_L_131907989_d72314784445f.jpg'
      //     },
      //     {
      //         _id:'3',
      //         title:'Laptops',
      //         image:'https://images-na.ssl-images-amazon.com/images/I/91MW2X7lrfL.__AC_SX300_SY300_QL70_ML2_.jpg'
      //     },
      //     {
      //         _id:'4',
      //         title:'Smartphones',
      //         image:'https://s3b.cashify.in/gpro/uploads/2020/10/13211658/iphone-12-pro-family-250x300.jpeg'
      //     },
      //     {
      //         _id:'5',
      //         title:'Clothes',
      //         image:'http://www.countryboylifestyle.com/UserPanel/UserPanel/Uploads/432637553103879714328_small_MI.jpg'
      //     },
      //     {
      //         _id:'6',
      //         title:'SmartTv',
      //         image:'http://www.krisons.com/product_images/KR-32-LED-TV-T.jpg'
      //     },
      //     {
      //         _id:'7',
      //         title:'Computers',
      //         image:'https://aigostore.b-cdn.net/wp-content/uploads/2020/10/HTB1F4_vclCw3KVjSZR0q6zcUpXau-250x300.jpg'
      //     },
      //     {
      //         _id:'8',
      //         title:'Shoes',
      //         image:'http://tirupurbrands.in/wp-content/uploads/2018/07/5-250x300.jpg'
      //     },
          
      // ]
        setLoading(false)
        setDepartments(data)
        console.log("data", data)
      }catch(err){
        setError(err.message)
        setLoading(false)
        console("aaa", err.message)
      }
    };
    fetchData();
  },[])

  

  return (
      <div className='departmentRootSection'>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox>{error}</MessageBox>
        ) : (
          <div>
            <Banner/>
          <section className='departmentsSectionContainer'>
            
            <div className="departmentsDivContainer">

              {departments.map(departments=>(
                <Department key={departments._id} departments={departments}></Department>
              ))}
            </div>
          </section>
          </div>
          )}
      </div>
  )
}

export default Departments;
