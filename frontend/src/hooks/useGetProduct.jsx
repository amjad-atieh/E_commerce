import { useQuery } from "@tanstack/react-query";

export default function getProducts(page, pageSize) {
  const { isPending, error, data } = useQuery({
    queryKey: ["product", page, pageSize],
    queryFn: () => {
      const params = new URLSearchParams({ page, pageSize });
      return fetch(
        `http://${import.meta.env.VITE_BACKEND_URL}:${import.meta.env.VITE_BACKEND_PORT}/products?${params}`,
        {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        },
      ).then((res) => res.json());
    },
  });

  if (isPending) return "Loading...";

  if (error) {
    return "An error has occurred: " + error.message;
  }

  return data;
}
