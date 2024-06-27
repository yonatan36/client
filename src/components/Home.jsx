import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loader = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    loader();
  }, []);

  return (
    <>
      {products.map((product) => {
        return (
          <div key={product._id}>
            <p>{product.name}</p>
          </div>
        );
      })}
    </>
  );
}

export default Home;
