"use client";

import { apiClient } from "@/lib/api-client";
import { IProduct } from "@/models/Product";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiClient.getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return <div>Hello World</div>;
}
