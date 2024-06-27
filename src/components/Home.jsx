import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, IconButton } from "@mui/material";
import ProductCard from "./ProductCard";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loader = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        setProducts(response.data);
      } catch (error) {
        console.error(error);
        // Optionally, handle error state or display an error message to the user
      }
    };
    loader();
  }, []);

  return (
    <div>
      <IconButton
        component={Link}
        to="/create"
        aria-label="Add Product"
        edge="start"
        color="inherit"
      >
        <AddIcon />
      </IconButton>

      <Grid container spacing={3} style={{ marginTop: 50 }}>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Grid>
    </div>
  );
}

export default Home;
