/* eslint-disable*/
import useData from "../../hooks/useData";
import "./ProductsList.css";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useSearchParams } from "react-router-dom";
// import Pagination from "./../Common/Pagination";
import { useEffect, useState } from "react";

const ProductsList = () => {
  const [page, setPage] = useState(1);
  const [serach, setSearch] = useSearchParams();
  const category = serach.get("category");
  const { data, error, isLoading } = useData(
    "/products",
    {
      params: {
        category,
        perPage: 10,
        page,
      },
    },
    [category, page]
  );
  useEffect(() => {
    setPage(1);
  }, [category]);
  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8];
  const handlePageChange = (page) => {
    const currentParams = Object.fromEntries([...serach]);
    setSearch({ ...currentParams, page: parseInt(currentParams.page) + 1 });
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight - 1 &&
        !isLoading &&
        data &&
        page < data.totalPages
      ) {
        console.log("Reach to bottom!");
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data, isLoading]);

  return (
    <section className="products_list_section">
      <header className="align_center products_list_header">
        <h2>Products</h2>
        <select name="sort" id="" className="products_sorting">
          <option value="">Relevance</option>
          <option value="price desc">Price HIGH to LOW</option>
          <option value="price asc">Price LOW to HIGH</option>
          <option value="rate desc">Rate HIGH to LOW</option>
          <option value="rate asc">Rate LOW to HIGH</option>
        </select>
      </header>

      <div className="products_list">
        {error && <em className="form_error">{error}</em>}
        {data?.products &&
          data.products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        {isLoading && skeleton.map((n) => <ProductCardSkeleton key={n} />)}
      </div>
      {/* {data && (
        <Pagination
          totalPosts={data.totalProducts}
          postsPerPage={8}
          onClick={handlePageChange}
          currentPage={page}
        />
      )} */}
    </section>
  );
};

export default ProductsList;
