import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import {
  Button,
  Container,
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
  CardActions,
  InputAdornment,
  Divider,
} from "@mui/material";

import { addProduct } from "../../utils/api_products";
import Header from "../../components/Header";

export default function ProductsAddNew() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  // setup mutation for add new product
  const addNewMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      // if API call is success, do what?
      navigate("/");
      enqueueSnackbar("Product is added", {
        variant: "success",
      });
    },
    onError: (error) => {
      // if API call is error, do what?
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    },
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    addNewMutation.mutate({
      name: name,
      description: description,
      price: price,
      category: category,
    });
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ textAlign: "center", padding: "20px 0" }}>
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", fontStyle: "italic" }}
        >
          Add New Product
        </Typography>
        <Card
          raised
          sx={{
            marginTop: "30px",
            padding: "30px",
          }}
        >
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Product Name"
                  variant="outlined"
                  color="info"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label="Product Description"
                  variant="outlined"
                  color="info"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  required
                  label="Product Price (RM per unit)"
                  type="number"
                  min="1"
                  variant="outlined"
                  color="info"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">RM</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                {/* <TextField
                  required
                  select
                  label="Categories"
                  variant="outlined"
                  color="info"
                  fullWidth
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <MenuItem>All Categories</MenuItem>;
                </TextField> */}
                <TextField
                  label="Category"
                  variant="outlined"
                  fullWidth
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained" fullWidth onClick={handleFormSubmit}>
              Add
            </Button>
          </CardActions>
        </Card>
      </Container>
    </>
  );
}
