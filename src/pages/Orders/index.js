import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Button,
  Paper,
  MenuItem,
  Select,
} from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";

import Header from "../../components/Header";
import { getOrders, deleteOrder, updateOrder } from "../../utils/api_orders";

export default function Orders() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const { data: orderItems = [] } = useQuery({
    queryKey: ["order"],
    queryFn: getOrders,
  });
  const deleteOrderMutation = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      // display success message
      enqueueSnackbar("Order has been successfully deleted", {
        variant: "success",
      });
      // reset the cart
      queryClient.invalidateQueries({
        queryKey: ["order"],
      });
    },
    onError: (error) => {
      // display error message
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    },
  });

  const updateOrderMutation = useMutation({
    mutationFn: updateOrder,
    onSuccess: () => {
      // display success message
      enqueueSnackbar("Order status has been updated", {
        variant: "success",
      });
      // Invalidate the query to refetch the updated data
      queryClient.invalidateQueries({
        queryKey: ["order"],
      });
    },
    onError: (error) => {
      // display error message
      enqueueSnackbar(error.response.data.message, {
        variant: "error",
      });
    },
  });

  const handleRemoveFromOrder = (_id) => {
    const confirm = window.confirm(
      "Are you sure you want to remove this order?"
    );
    if (confirm) {
      deleteOrderMutation.mutate(_id);
    }
  };
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderMutation.mutateAsync({ id: orderId, status: newStatus });
    } catch (error) {
      console.error("Error updating order status:", error);
      throw error;
    }
  };

  return (
    <Container>
      <Header />
      {orderItems.length === 0 ? (
        <Box textAlign="center" mt={3}>
          <Typography variant="h5">You Have No Orders</Typography>
        </Box>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Customer</TableCell>
                  <TableCell align="center">Product</TableCell>
                  <TableCell align="center">Total Amount</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Payment Date</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderItems.map((item) => (
                  <TableRow
                    key={item._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {item.customerName}
                      <br />
                      {item.customerEmail}
                    </TableCell>
                    <TableCell align="center">
                      {item.products.map((product) => (
                        <div key={product._id}>{product.name}</div>
                      ))}
                    </TableCell>
                    <TableCell align="center">{item.totalPrice}</TableCell>
                    <TableCell align="center">
                      <Select
                        value={item.status}
                        onChange={(e) =>
                          handleStatusChange(item._id, e.target.value)
                        }
                        disabled={item.status === "pending"}
                      >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="failed">Failed</MenuItem>
                        <MenuItem value="success">Success</MenuItem>
                        <MenuItem value="Paid">Paid</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell align="center">{item.paid_at}</TableCell>
                    <TableCell align="center">
                      <Button
                        color="error"
                        variant="contained"
                        onClick={() => {
                          handleRemoveFromOrder(item._id);
                        }}
                        disabled={item.status !== "pending"}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Container>
  );
}
