import Axios  from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';


function ProductDetailsPage(props) {
  const navigate = useNavigate();
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPrice, setNewPrice] = useState(0);
  const [name, setName] = useState(props.product.name);
  const [description, setDescription] = useState(props.product.description);
  const [price, setPrice] = useState(props.product.price);

  const updateProduct = () => {
    Axios.put(`http://localhost:3001/api/products/${props.product.id}`, {
      newName: newName,
      newDescription: newDescription,
      newPrice: newPrice
    }).then((response) => {
      if (response.status === 200) {
        alert("Data Updated");
        setName(newName);
        setDescription(newDescription);
        setPrice(newPrice);
        props.getProducts();
      }
    }).catch((err) => {
      if (err.response.status === 400 || err.response.status === 404 ||
        err.response.status === 500) {
        alert(err.response.data.message);
      }
    });
  }

  const deleteProduct = () => {
    Axios.delete(`http://localhost:3001/api/products/${props.product.id}`)
      .then((response) => {
        if (response.status === 200) {
          alert("Data Deleted");
          props.getProducts();
          navigate('/');
        }
      }
    ).catch((err) => {
      if (err.response.status === 404 || err.response.status === 500) {
        alert(err.response.data.message);
      } 
    });
  }

  return (
    <div className="productDetail">
      <p className="productDetail-name">Name: {name}</p>
      <p className="productDetail-description">Description: {description}</p>
      <p className="productDetail-price">Price: {price}</p>
      <div className="productUpdateInput">
        <input
          type="text"
          placeholder="Name"
          onChange={(event) => {
            setNewName(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Description"
          onChange={(event) => {
            setNewDescription(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Price"
          onChange={(event) => {
            setNewPrice(event.target.value);
          }}
        />
      </div>
      <div className="productUpdateButton">
        <button onClick={updateProduct}>Update Product</button>
        <button onClick={deleteProduct}>Delete Product</button>
      </div>
    </div>
  );
}

export default ProductDetailsPage;