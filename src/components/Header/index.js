import { Typography, Divider, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <>
      <Typography
        variant="h3"
        style={{ display: "flex", justifyContent: "center", margin: "10px" }}
      >
        Welcome to our store
      </Typography>
      <Box
        style={{ display: "flex", justifyContent: "center", margin: "10px" }}
      >
        <Button
          variant="contained"
          style={{ margin: "10px" }}
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </Button>
        <Button
          variant="outlined"
          style={{ margin: "10px" }}
          onClick={() => {
            navigate("/cart");
          }}
        >
          Cart
        </Button>
      </Box>
      <Divider />
    </>
  );
}
