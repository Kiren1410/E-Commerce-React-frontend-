import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../utils/api_products";
import { getCategories } from "../../utils/api_categories";
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import ProductCard from "../../components/ProductCard";
import Header from "../../components/Header";
import Select from "@mui/material/Select";

export default function Products() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [perPage] = useState(6);
  const { data: items = [] } = useQuery({
    queryKey: ["products", category, perPage, page],
    queryFn: () => {
      return getProducts(category, perPage, page);
    },
  });
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <>
      <Container>
        <Header />
        <Box style={{ marginBottom: "20px" }}>
          <Container
            style={{
              display: "flex",
              alignItems: "center",
              margin: "10px",
              paddingLeft: 0,
              paddingRight: 0,
              width: "100%",
            }}
          >
            <Typography variant="h5" style={{ margin: 0 }}>
              Products
            </Typography>
            <Box sx={{ marginLeft: "auto" }}>
              <Button
                variant="contained"
                color="success"
                size="small"
                onClick={() => {
                  navigate("/add");
                }}
              >
                Add New
              </Button>
            </Box>
          </Container>
          <Box sx={{ maxWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                All Categories
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                label="Category"
                id="demo-simple-select"
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value);
                  // reset the page to 1
                  setPage(1);
                }}
              >
                <MenuItem value="all">All Categories</MenuItem>
                {categories.map((category) => {
                  return (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Grid container spacing={2}>
          {items.map((item) => (
            <Grid key={item._id} item xs={12} sm={6} md={4}>
              <ProductCard item={item} />
            </Grid>
          ))}
          {items.length === 0 ? (
            <Grid item xs={12}>
              <Typography align="center" sx={{ padding: "10px 0" }}>
                No items found.
              </Typography>
            </Grid>
          ) : null}
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            marginTop: "10px",
            padding: "20px 0",
          }}
        >
          <Button
            disabled={page === 1 ? true : false}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>
          <span>Page: {page}</span>
          <Button
            disabled={items.length === 0 ? true : false}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </Box>
      </Container>
    </>
  );
}
