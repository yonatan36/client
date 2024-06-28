import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    catalogNumber: "",
    description: "",
    category: "פרי",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.catalogNumber || !formData.description) {
      toast.error("Please fill in all the required fields.");
      return;
    }

    setLoading(true);

    try {
      await axios.post("http://localhost:3000/products", formData);
      toast.success("Product created successfully! 👍");
      setFormData({
        name: "",
        catalogNumber: "",
        description: "",
        category: "פרי",
      });
      navigate("/");
    } catch (error) {
      console.error("Failed to create product:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to create product. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 2,
      }}
    >
      <IconButton component={Link} to="/" sx={{ mb: 2 }}>
        <HomeIcon />
      </IconButton>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
      >
        <TextField
          id="name"
          name="name"
          label="Name"
          variant="outlined"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          id="catalogNumber"
          name="catalogNumber"
          label="Catalog Number"
          variant="outlined"
          type="number"
          value={formData.catalogNumber}
          onChange={handleChange}
          required
        />
        <TextField
          id="description"
          name="description"
          label="Description"
          variant="outlined"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <TextField
          id="category"
          name="category"
          label="Category"
          variant="outlined"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </Box>
      <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
        <Button variant="contained" type="submit" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Submit"}
        </Button>
      </Box>
    </Box>
  );
};

export default CreateProduct;
