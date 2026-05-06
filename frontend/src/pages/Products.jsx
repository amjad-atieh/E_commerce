import "./Products.css";
import ProductTable from "../components/products/ProductTable";

function Products() {
  try {
    return (
      <div className="cardGrid">
        <ProductTable />
      </div>
    );
  } catch (error) {
    return (
      <>
        <h1>Error</h1>
        <p>{error.message}</p>
      </>
    );
  }
}

export default Products;
