// Import necessary libraries and components
import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    catalogNumber: "",
    description: "",
    category: "פרי",
  });

  // Handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const action = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/products",
          formData
        );
      } catch (error) {
        console.error(error);
      }
    };
    action();
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
        {/* TODO להשלים שדות  */}
      </div>
      <Button variant="contained" type="submit" sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
};

export default CreateProduct;
