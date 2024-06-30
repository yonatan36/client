import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  CardMedia,
  Button,
} from "@mui/material";

function ProductDialog({ open, onClose, product }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Product Details</DialogTitle>
      <DialogContent>
        <CardMedia height="200" component="img" image={product.imgURL} />
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body1">
          Catalog Number: {product.catalogNumber}
        </Typography>
        <Typography variant="body1">
          Description: {product.description}
        </Typography>
        <Typography variant="body1">Category: {product.category}</Typography>
        <Typography variant="body1">Date Sold: {product.dateSold}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProductDialog;
