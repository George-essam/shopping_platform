import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import StoreItem from './StoreItem';
import SearchBar from './SearchBar';
import SearchResultsList from './SearchResultsList';
import Skeleton from 'react-loading-skeleton';

const Store = () => {
  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Failed to fetch products");

        const products = await response.json();
        setData(products);
        setFilter(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const Loading = () => (
    <>
      <div className="col-md-3">
        <Skeleton height={350} />
      </div>
      <div className="col-md-3">
        <Skeleton height={350} />
      </div>
      <div className="col-md-3">
        <Skeleton height={350} />
      </div>
      <div className="col-md-3">
        <Skeleton height={350} />
      </div>
    </>
  );

  const filterProduct = (cat) => {
    if (cat === "all") {
      setFilter(data);
    } else {
      const updatedList = data.filter((x) => x.category === cat);
      setFilter(updatedList);
    }
  };

  const ShowProducts = () => (
    <>
      <div className="buttons d-flex justify-content-center mb-4">
        <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("all")}>
          All
        </button>
        <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("men's clothing")}>
          Men's Clothing
        </button>
        <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("women's clothing")}>
          Women's Clothing
        </button>
        <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("electronics")}>
          Electronics
        </button>
        <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("jewelery")}>
          Jewelery
        </button>
      </div>

      <Row md={2} xs={1} lg={3} className="g-3">
        {filter.map((product) => (
          <Col key={product.id}>
            <StoreItem {...product} />
          </Col>
        ))}
      </Row>
    </>
  );

  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>

      <div className="search-bar-container">
        <SearchBar setResults={setResults} />
        <SearchResultsList results={results} />
      </div>
    </>
  );
};

export default Store;