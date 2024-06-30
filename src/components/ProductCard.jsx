import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { format } from "date-fns";
import DeleteDialog from "./DeleteDialog";
import ProductDialog from "./ProductDialog";

const ProductCard = ({ product, onDelete }) => {
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/products/${product._id}`);
      onDelete(product._id);
      handleCloseDeleteDialog();
      toast.success("Product deleted successfully!");
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast.error("Failed to delete product. Please try again.");
    }
  };

  const handleOpenDetailDialog = () => {
    setOpenDetailDialog(true);
  };

  const handleCloseDetailDialog = () => {
    setOpenDetailDialog(false);
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const formattedDateSold = format(new Date(product.dateSold), "MMMM dd, yyyy");

  return (
    <Grid item xs={12} sm={6} md={4} lg={4}>
      <Card
        sx={{
          transition: "transform 0.3s",
          "&:hover": { transform: "scale(1.05)" },
        }}
      >
        <CardContent onClick={handleOpenDetailDialog}>
          <CardMedia
            height="280"
            component="img"
            image={product.imgURL}
            sx={{
              filter: "brightness(100%)",
              transition: "filter 0.3s ease-in-out",
            }}
          />
          <Typography variant="h6" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Catalog Number: {product.catalogNumber}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Description: {product.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Category: {product.category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Date Sold: {formattedDateSold}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            component={Link}
            to={`/${product._id}`}
            size="small"
            aria-label="Edit"
          >
            <EditIcon />
          </Button>
          <Button
            size="small"
            onClick={handleOpenDeleteDialog}
            aria-label="Delete"
          >
            <DeleteIcon />
          </Button>
        </CardActions>
      </Card>

      {/* Detail Dialog */}
      <ProductDialog
        open={openDetailDialog}
        onClose={handleCloseDetailDialog}
        product={product}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onDelete={handleDelete}
      />
    </Grid>
  );
};

export default ProductCard;
