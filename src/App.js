import "./index.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Products from "./pages/Products";

// create a client
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<Products />}/>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
