import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
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

import { getProduct, updateProduct } from "../../utils/api_products";
import Header from "../../components/Header";

export default function ProductsAddNew() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  // get data from product api: /products/:id
  const {
    data: product = {},
    error,
    isLoading,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });
  // when data is fetched from API, set the states for all the fields with its current value
  useEffect(() => {
    // if product is not undefined
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
    }
  }, [product]);

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      enqueueSnackbar("Product is updated", {
        variant: "success",
      });
      navigate("/");
    },
    onError: (error) => {
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    },
  });
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // trigger the mutation to call the API
    updateProductMutation.mutate({
      id: id,
      name: name,
      description: description,
      price: price,
      category: category,
    });
  };
  // if API data haven't return yet
  if (isLoading) {
    return <Container>Loading...</Container>;
  }

  // if there is an error in API call
  if (error) {
    return <Container>{error.response.data.message}</Container>;
  }
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ textAlign: "center", padding: "20px 0" }}>
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", fontStyle: "italic" }}
        >
          Edit Product
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
