import React, { useState,useEffect } from 'react';
import { Row,Col } from 'react-bootstrap';

import StoreItem from './StoreItem';
import SearchBar from './SearchBar';
import SearchResultsList from './SearchResultsList';
import Skeleton from 'react-loading-skeleton';




const Store = () => {

const[data , setData]=useState([]);
const [results,setResults] = useState([]);
const [loading, setLoading] = useState(false);
const [filter,setFilter] =useState(data);
const [storeItems, setStoreItems] = useState([]);

let componentMounted =  true;

useEffect(() => {
  const getProducts = async() => {
    setLoading(true);
    const response = await fetch("http://fakestoreapi.com/products");
    if(componentMounted){
      setData(await response.clone().json());
      setStoreItems(await response.clone().json());
      setFilter(await response.json());
      setLoading(false);
      console.log(filter);
    }
    return () =>{
      componentMounted=false;
    }
  }

  getProducts();
},[]);


const Loading =() =>{
   return(
    <>
    <div className='col-md-3'>
      <Skeleton height={350}/>
    </div>
    <div className='col-md-3'>
      <Skeleton height={350}/>
    </div>
    <div className='col-md-3'>
      <Skeleton height={350}/>
    </div>
    </>
   );
}
const filterProduct = (cat) =>{
  const updatedList = data.filter((x)=> x.category === cat);
  setFilter(updatedList);
}

const ShowProducts =() => {
  return (
    <>
    <div className='buttons d-flex justify-content-center'>
    <button className='btn btn-outline-dark me-2' onClick={()=>setFilter(data)}>All</button>
    <button className='btn btn-outline-dark me-2' onClick={()=>filterProduct("food")} >Food</button>
    <button className='btn btn-outline-dark me-2' onClick={()=>filterProduct("clothes")}>Clothes</button>
    <button className='btn btn-outline-dark me-2' onClick={()=>filterProduct("electronics")}>Electronics</button>
    <button className='btn btn-outline-dark me-2' onClick={()=>filterProduct("body care")}>Body Care</button>

    </div>
    
    
    </>
    );
};
  return (
    <>
   

    <div>
      <div className='container my-5 my-5'>
        <div className='row'>
          <div className='col-12 mb-5'>
            <h1 className='display-6 fw-bolder text-center'>Latest Products</h1>
            <hr />
          </div>
        </div>
        <div className='row justify-content-center'>
          {loading? <Loading/> :<ShowProducts/>}

        </div>
      </div>
    </div>

    <div className='search-bar-container'>
      <SearchBar setResults={setResults} />
      <SearchResultsList results={results}/>
    </div>
    <Row md={2} xs={1} lg={3} className='g-3'>
      {filter.map((product)=>(
        <Col key={product.id}>
          <StoreItem {...product} />
          
        </Col>
      ))}
    </Row>
    </>
  );
};

export default Store




//md :how many item u want to see
//g-3 to separate