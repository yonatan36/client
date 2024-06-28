import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Box } from "@mui/material";

function EditProduct() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/products/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setError("Failed to fetch product. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <Typography variant="h6">Loading...</Typography>;
  if (error)
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );
  if (!product) return <Typography variant="h6">Product not found.</Typography>;

  return (
    <Box maxWidth="600px" mx="auto" mt={4}>
      <Typography variant="h4" gutterBottom>
        Edit Product
      </Typography>
      <Typography variant="h6" gutterBottom>
        {product.name}
      </Typography>
      {/* Render other fields for editing */}
    </Box>
  );
}

export default EditProduct;
