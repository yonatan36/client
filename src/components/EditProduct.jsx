import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Box } from "@mui/material";
import InputFields from "./InputFields";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditProduct() {
  // id route parmeter from app.jsx
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/products/${id}`
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
  }, [id]);

  if (loading) return <Typography variant="h6">Loading...</Typography>;
  if (error)
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );
  if (!product) return <Typography variant="h6">Product not found.</Typography>;

  const submit = async () => {
    try {
      await axios.put(`http://localhost:3000/products/${id}`, product);
      toast.success("Product edited successfully! 👍");
      return true;
    } catch (error) {
      toast.error(`Product edit failed.\n${error.message}`);
    }
  };

  return (
    <InputFields
      submit={submit}
      formData={product}
      setFormData={setProduct}
      loading={loading}
      setLoading={setLoading}
      editMode={true}
    />
  );
}

export default EditProduct;
