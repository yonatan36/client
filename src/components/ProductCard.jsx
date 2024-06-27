import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";

const ProductCard = ({ product }) => {
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
          {/* Add more fields as needed */}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProductCard;
