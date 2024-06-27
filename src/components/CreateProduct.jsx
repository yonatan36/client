import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    catalogNumber: "",
    description: "",
    category: "פרי",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3000/products", formData);

      toast.success("Product created successfully! 👍");
      console.log("ok!");
    } catch (error) {
      console.error("Failed to create product:", error);
      toast.error("Failed to create product. Please try again.");
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
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div>
        <TextField
          id="name"
          name="name"
          label="Name"
          variant="outlined"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          id="catalogNumber"
          name="catalogNumber"
          label="Catalog Number"
          variant="outlined"
          type="number"
          value={formData.catalogNumber}
          onChange={handleChange}
        />
        <TextField
          id="description"
          name="description"
          label="Description"
          variant="outlined"
          value={formData.description}
          onChange={handleChange}
        />
        <TextField
          id="category"
          name="category"
          label="Category"
          variant="outlined"
          value={formData.category}
          onChange={handleChange}
        />
      </div>
      <Button variant="contained" type="submit" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
};

export default CreateProduct;
