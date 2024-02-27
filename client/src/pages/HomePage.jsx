import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const navigate = useNavigate();

  const navigateToCreateProducts = () => {
    navigate('/Product/Create');
  };

  const navigateToEditProducts = (id) => {
    navigate(`/Product/Edit/${id}`)
  };
  
  const navigateToViewProducts = (id) => {
    navigate(`/Product/View/${id}`)
  };

  const getProducts = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const results = await axios("http://localhost:4001/products");
      setProducts(results.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/products/${id}`);
      getProducts(); // Refresh the product list after deletion
    } catch (error) {
      setIsError(true);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);





  return (
    <div>
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
        <button onClick={navigateToCreateProducts}>Create Product</button>
      </div>
      <div className="product-list">
        {products.map((product) => {
          return (
            <div className="product">
              <div className="product-preview">
                <img
                  src={product.image}
                  alt="some product"
                  width="250"
                  height="250"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {product.name} </h1>
                <h2>Product price: {product.price}</h2>
                <p>Product description: {product.description} </p>
                <div className="product-actions">
                  <button onClick={() => navigateToViewProducts(product.id)} className="view-button">View</button>
                  <button onClick={() => navigateToEditProducts(product.id)} className="edit-button">Edit</button>
                </div>
              </div>

              <button className="delete-button" onClick={() => deleteProduct(product.id)}>x</button>
            </div>
          );
        })}
      </div>
      {isError ? <h1>Request failed</h1> : null}
      {isLoading ? <h1>Loading ....</h1> : null}
    </div>
  );
}

export default HomePage;
