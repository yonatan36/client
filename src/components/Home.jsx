import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, IconButton, Typography, Box } from "@mui/material";
import ProductCard from "./ProductCard";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = (deletedProductId) => {
    setProducts(products.filter((product) => product._id !== deletedProductId));
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box width="100%" maxWidth="800px">
        <IconButton
          component={Link}
          to="/create"
          aria-label="Add Product"
          edge="start"
          color="inherit"
          style={{ marginTop: 20 }}
        >
          <AddIcon />
        </IconButton>

        {loading ? (
          <Typography variant="h6" align="center" style={{ marginTop: 20 }}>
            Loading...
          </Typography>
        ) : error ? (
          <Typography
            variant="h6"
            align="center"
            style={{ marginTop: 20, color: "red" }}
          >
            {error}
          </Typography>
        ) : (
          <Grid container spacing={2} style={{ marginTop: 20 }}>
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onDelete={handleDelete}
              />
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}

export default Home;
