import Axios from "axios";
import { useState } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import ProductDetailsPage from './ProductDetailsPage';

function HomePage() {
  const navigate = useNavigate();
  const [nameProduct, setNameProduct] = useState("");
  const [descriptionProduct, setDescriptionProduct] = useState("");
  const [priceProduct, setPriceProduct] = useState("");
  const [productList, setProductList] = useState([]);

  const addProduct = () => {
    Axios.post("http://localhost:3001/api/products", {
      name: nameProduct,
      description: descriptionProduct,
      price: priceProduct
    }).then((response) => {
      if (response.status === 200) {
        alert("Success to add the product");
        getProducts();
      }
    }).catch((err) => {
      if (err.response.status === 400 || 
        err.response.status === 500) {
        alert(err.response.data.message);
      }
    });
  }

  const getProducts = () => {
    Axios.get("http://localhost:3001/api/products")
      .then((response) => {
        setProductList(response.data);
    }).catch((err) => {
      if (err.response.status === 500) {
        alert(err.response.data.message);
      }
    });
  }
  
  return (
    <div className="HomePage">
      <Routes>
        {productList.map((val, key) => {
          const path = `product/${val.id}`;
          return (
            <Route key={val.id} path={path} element={
              <ProductDetailsPage
                product={val}
                setProductList={setProductList}
                productList={productList}
                getProducts={getProducts}
              />
            } />
          );
        })}
        <Route path='/' element= {
          <div className="HomePage">
            <div className="add-product">
              <label>Name:</label>
              <input type={'text'} onChange={(event) => {
                setNameProduct(event.target.value);
              }}/>
      
              <label>Description:</label>
              <input type={'text'} onChange={(event) => {
                setDescriptionProduct(event.target.value);
              }}/>
      
              <label>Price:</label>
              <input type={'number'} onChange={(event) => {
                setPriceProduct(event.target.value);
              }}/> 
      
              <button onClick={addProduct}>Add Product</button>
            </div>
      
            <hr />
      
            <div className="products-show">
              <button onClick={getProducts}>Show Products</button>
      
              {productList.map((val, key) => {
                const path = `product/${val.id}`;
                return (
                  <div className="product-show" key={val.name}>
                    <h3>Name: {val.name}</h3>
                    <h3>Price: {val.price}</h3>
                    
                    <button onClick={ () => {navigate(path); }} >Show Details</button>
                  </div>
                );
              })}
            </div>
          </div>
        } />
      </Routes>
    </div>
  );
}

export default HomePage;