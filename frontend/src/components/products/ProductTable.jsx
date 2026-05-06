import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import { useState } from "react";
import useGetProduct from "../../hooks/useGetProduct";
import "./ProductTable.css";

export default function ProductTable() {
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 24;
  const data = useGetProduct(pageNumber, pageSize);
  if (data === "Loading...")
    return (
      <div className="product container">
        {Array.from({ length: pageSize }, (_, i) => (
          <SkeletonCard key={i} index={i} />
        ))}
      </div>
    );
  if (typeof data == "string") return data;
  if (typeof data == "unknown") return "Error";
  console.log(typeof(data));
  console.log(data);
  console.log(data.payload);
  return (
    <div>
      <h1>count {data.count}</h1>
      <p>pagecount: {data.pageCount}</p>
      <div className="product container">
        {data.payload.map((card) => (
          <ProductCard key={card.id} {...card} />
        ))}
      </div>
      {data.hasPrev && (
        <button
          className="next"
          onClick={() => setPageNumber((page) => page - 1)}
        >
          previous
        </button>
      )}
      {pageNumber}
      {data.hasNext && (
        <button
          className="next"
          onClick={() => setPageNumber((page) => page + 1)}
        >
          next
        </button>
      )}
    </div>
  );
}
