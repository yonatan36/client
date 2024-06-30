import React, { useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  IconButton,
  CardMedia,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { format } from "date-fns";

function InputFields({
  submit,
  formData,
  setFormData,
  loading,
  setLoading,
  editMode,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    if (formData.dateSold) {
      setFormData((prevData) => ({
        ...prevData,
        formattedDateSold: format(new Date(formData.dateSold), "yyyy-MM-dd"),
      }));
    }
  }, [formData.dateSold, setFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await submit();
    if (success) {
      navigate("/");
    } else {
      setLoading(false);
    }
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
        <CardMedia
          height="260"
          component="img"
          image={
            formData.imgURL ||
            "https://pan-il.org/wp-content/uploads/fruit-5546813_1920SM.jpg"
          }
          className="card-image"
          sx={{
            filter: "brightness(100%)",
            transition: "filter 0.3s ease-in-out",
          }}
        />
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
          multiline
          minRows="5"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <TextField
          id="category"
          name="category"
          label="Category"
          variant="outlined"
          select
          value={formData.category}
          onChange={handleChange}
          required
          SelectProps={{
            native: true,
          }}
        >
          <option value="ירק">ירק</option>
          <option value="פרי">פרי</option>
          <option value="גידול שדה">גידול שדה</option>
        </TextField>

        <TextField
          id="dateSold"
          name="dateSold"
          label="Date Sold"
          variant="outlined"
          value={formData.formattedDateSold || ""}
          onChange={handleChange}
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>
      <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
        <Button variant="contained" type="submit" disabled={loading}>
          {loading ? (
            <CircularProgress size={24} />
          ) : editMode ? (
            "Update"
          ) : (
            "Create"
          )}
        </Button>
      </Box>
    </Box>
  );
}

export default InputFields;
