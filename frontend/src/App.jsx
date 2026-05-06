import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Test from "./pages/test";
import Products from "./pages/Products";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="products" element={<Products />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
