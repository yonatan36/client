import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ProductCard = ({ product, onDelete }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/products/${product._id}`);
      onDelete(product._id); // Notify parent component to update state
      handleCloseDialog(); // Close dialog after deletion
      toast.success("Product deleted successfully!"); // Show success toast
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast.error("Failed to delete product. Please try again."); // Show error toast
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Category: {product.category}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            component={Link}
            to={`/products/${product._id}`}
            size="small"
            aria-label="Edit"
          >
            <EditIcon />
          </Button>
          <Button size="small" onClick={handleOpenDialog} aria-label="Delete">
            <DeleteIcon />
          </Button>
        </CardActions>
      </Card>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default ProductCard;
