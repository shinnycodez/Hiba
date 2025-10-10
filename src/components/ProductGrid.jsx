import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ProductGrid({ filters = {} }) {
  const queryParams = useQuery();
  const categoryFromURL = queryParams.get('category');
  const searchFromURL = queryParams.get('search')?.toLowerCase().trim();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    category = [],
    size = [],
    color = [],
    available = [],
    priceRange = [0, Infinity],
  } = filters;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const cacheKey = categoryFromURL ? `products_${categoryFromURL}` : 'products_all';
        const timestampKey = `${cacheKey}_timestamp`;
        const cachedProducts = localStorage.getItem(cacheKey);
        const lastFetched = localStorage.getItem(timestampKey);
        const now = Date.now();

        // ⏱️ 30 minutes in milliseconds
        const cacheExpiry = 30 * 60 * 1000;

        // ✅ Use cache if within 30 minutes
        if (cachedProducts && lastFetched && now - parseInt(lastFetched) < cacheExpiry) {
          setProducts(JSON.parse(cachedProducts));
          setLoading(false);
          return;
        }

        // 🔥 Otherwise, fetch fresh data
        let q;
        if (categoryFromURL) {
          q = query(collection(db, 'products'), where('category', '==', categoryFromURL));
        } else {
          q = collection(db, 'products');
        }

        const snapshot = await getDocs(q);
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(items);

        // 💾 Cache new data + timestamp
        localStorage.setItem(cacheKey, JSON.stringify(items));
        localStorage.setItem(timestampKey, now.toString());
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryFromURL]);

  // 🔍 Apply filters locally
  const filteredProducts = products.filter((product) => {
    const matchesCategory = categoryFromURL
      ? product.category === categoryFromURL
      : category.length
      ? category.includes(product.category)
      : true;

    const matchesSize = size.length ? size.includes(product.size) : true;
    const matchesColor = color.length ? color.includes(product.color) : true;
    const matchesAvailability = available.length
      ? available.includes(product.available)
      : true;
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    const matchesSearch = searchFromURL
      ? product.title?.toLowerCase().includes(searchFromURL) ||
        product.description?.toLowerCase().includes(searchFromURL)
      : true;

    return (
      matchesCategory &&
      matchesSize &&
      matchesColor &&
      matchesAvailability &&
      matchesPrice &&
      matchesSearch
    );
  });

  const title =
    categoryFromURL ||
    (searchFromURL ? `Results for "${searchFromURL}"` : 'All Products');

  if (loading) {
    return <p className="text-center p-8">Loading products...</p>;
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="flex flex-wrap gap-2 p-4">
        <Link
          to="/"
          className="text-[#757575] text-base font-medium hover:text-[#0c77f2] transition"
        >
          Home
        </Link>
        <span className="text-[#757575] text-base font-medium">/</span>
        <span className="text-[#141414] text-base font-medium">{title}</span>
      </div>

      {/* Page Title */}
      <div className="flex items-center gap-3">
        <p className="text-[#141414] text-[32px] font-bold">{title}</p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="h-full">
              <div className="flex flex-col h-full gap-3 pb-3 group shadow-md rounded-lg overflow-hidden transition-transform duration-300 hover:shadow-lg bg-[#FFF2EB]">
                {/* Product Image */}
                <div className="w-full aspect-square overflow-hidden">
                  <img
                    src={product.coverImage || product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Product Info */}
                <div className="px-3 pb-4 flex flex-col justify-between h-[130px]">
                  <div className="min-h-[60px] overflow-hidden">
                    <p className="text-[#141414] text-base font-medium line-clamp-2">
                      {product.title}
                    </p>
                    <p className="text-[#757575] text-sm font-normal mt-1">
                      PKR {product.price}
                    </p>
                  </div>
                  <button className="mt-auto py-2 px-1 rounded-full bg-[#FCBACB] text-white text-sm font-semibold shadow-md hover:bg-gray-900 transition-all duration-200">
                    Buy Now
                  </button>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center col-span-full text-[#757575] text-lg font-medium">
            No products found.
          </p>
        )}
      </div>
    </>
  );
}

export default ProductGrid;
