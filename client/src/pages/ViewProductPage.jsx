import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ViewProductPage() {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate('/');
  };
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true); 
        const response = await axios(`http://localhost:4001/products/${id}`);
        setProduct(response.data.data);
        setIsLoading(false); 
      } catch (error) {
        console.error("Error fetching product:", error);
        setError(error); 
      }
    };

    fetchProduct();
  }, [id]); 

  if (isLoading) {
    return <div>Loading product...</div>; 
  }

  if (error) {
    return <div>Error: {error.message}</div>; 
  }

  return (
    <div>
    <h1> View Product Page</h1>
    <div className="view-product-container">
      <h1>{product.name}</h1>
      <p>{product.price} THB</p>
      <p>{product.description}</p>
      </div>
      <button onClick={navigateToHome}>Back to Home</button>
    </div>

  );
}

export default ViewProductPage;
