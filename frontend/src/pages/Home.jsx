import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import { getCategories } from "../services/categoryService";
import InfiniteScroll from "react-infinite-scroll-component";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
function Home() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const [currentSlide, setCurrentSlide] = useState(0);

  //  Slider images
 const banners = [
  {
    img: "/images/laptop.jpg",
    title: "Laptop Deals",
    subtitle: "Up to 40% off",
  },
  {
    img: "/images/shoes.jpg",
    title: "New Shoes",
    subtitle: "Comfort + Style",
  },
  {
    img: "/images/mobile.jpg",
    title: "Smartphones",
    subtitle: "Latest models",
  },
   {
    img: "/images/cloths.jpg",
    title: "Fashion Clothes",
    subtitle: "Trendy outfits for everyone",
  },
  {
    img: "/images/bag.jpg",
    title: "Stylish Bags",
    subtitle: "Carry your world in style",
  },
];

  //  Auto slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === banners.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  //  Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await getCategories();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  //  Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 500);

    return () => clearTimeout(handler);
  }, [keyword]);

  //  Fetch products
  const fetchProducts = async () => {
    setLoading(true);

    const { data } = await getProducts({
      page,
      keyword: debouncedKeyword,
      category,
    });

    setProducts((prev) => [...prev, ...data.products]);

    if (page >= data.pages) {
      setHasMore(false);
    }

    setLoading(false);
  };

  //  Trigger fetch
  useEffect(() => {
    fetchProducts();
  }, [page, debouncedKeyword, category]);

  //  Reset on filter
  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [keyword, category]);

  //  Skeleton
  const SkeletonCard = () => (
    <div className="border p-4 rounded shadow animate-pulse">
      <div className="w-full h-40 bg-gray-300"></div>
      <div className="h-4 bg-gray-300 mt-2 w-3/4"></div>
      <div className="h-4 bg-gray-300 mt-2 w-1/2"></div>
      <div className="h-8 bg-gray-300 mt-3"></div>
    </div>
  );

  return (
    <div>

      {/*  Banner Slider */}
     <Swiper
  modules={[Autoplay, Pagination, Navigation]}
  spaceBetween={0}
  slidesPerView={1}
  loop={true} 
  autoplay={{
    delay: 3000,
    disableOnInteraction: false,
  }}
  pagination={{ clickable: true }}
  navigation={true}
  className="w-full h-[300px]"
>
  {banners.map((banner, index) => (
  <SwiperSlide key={index}>
    <div className="relative w-full h-[300px]">
      <img
        src={banner.img}
        className="w-full h-[300px] object-cover"
      />

      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/40 text-white">
        <h2 className="text-3xl font-bold">{banner.title}</h2>
        <p className="mt-2">{banner.subtitle}</p>
      </div>
    </div>
  </SwiperSlide>
))}
</Swiper>

      <div className="p-5">

        {/*  Categories Row */}
        <div className="flex gap-2 overflow-x-auto mb-5 mt-10">
          {/* All */}
          <div
            onClick={() => setCategory("")}
            className={`min-w-[100px] cursor-pointer text-center ${
              category === "" ? "font-bold" : ""
            }`}
          >
            <img
              src="/images/all.jpg"
              className="w-12 h-12 object-cover rounded-full mx-auto"
            />
            <p>All</p>
          </div>

          {categories.map((cat) => (
            <div
              key={cat._id}
              onClick={() => setCategory(cat._id)}
              className={`min-w-[100px] cursor-pointer text-center ${
                category === cat._id ? "font-bold" : ""
              }`}
            >
              <img
                  src={
                    cat.image
                      ? `${process.env.REACT_APP_API_URL.replace("/api", "")}${cat.image}`
                      : "https://via.placeholder.com/100"
                  }

                className="w-12 h-12 object-cover rounded-full mx-auto"
              />
              <p>{cat.name}</p>
            </div>
          ))}
        </div>

        <input
          placeholder="Search products..."
          className="border px-4 py-2 w-full mb-5 rounded-full"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        {/*  Products */}
        <InfiniteScroll
          dataLength={products.length}
          next={() => setPage((prev) => prev + 1)}
          hasMore={hasMore}
          loader={
            <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              {[...Array(4)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          }
          endMessage={
            <p className="text-center mt-4 text-gray-500">
              No more products
            </p>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </InfiniteScroll>

        {/* Initial loading */}
        {loading && products.length === 0 && (
          <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;