import { useEffect, useState } from "react";
import API from "../services/api";
import TableSkeleton from "./TableSkeleton";
import { toast } from "react-toastify";
function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
const [imageFile, setImageFile] = useState(null);
const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  //  Fetch products with pagination
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(`/products?page=${page}`);
    setProducts(data.products);
    setPages(data.pages);
    } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
    
  };

  //  Fetch categories
  const fetchCategories = async () => {
    const { data } = await API.get("/categories");
    setCategories(data);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [page]);

  //  Submit (Add / Update)
 const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("description", form.description);
  formData.append("price", form.price);
  formData.append("category", form.category);
  formData.append("stock", form.stock);

  if (imageFile) {
    formData.append("image", imageFile);
  }

  try {
    if (editingId) {
      await API.put(`/products/${editingId}`, formData);
      toast.success("Product updated successfully");
    } else {
      await API.post("/products", formData);
       toast.success("Product created successfully");
    }

    resetForm();
    fetchProducts();
  } catch (error) {
     toast.error("Something went wrong ");
    console.error(error);
  }
};

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
    });
    setImageFile(null);
    setEditingId(null);
    setIsModalOpen(false);
  };

  //  Edit
  const handleEdit = (product) => {
      setForm({
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category?._id, 
    stock: product.stock,
  });
    setEditingId(product._id);
    setIsModalOpen(true);
  };

  //  Delete
  const deleteProduct = async (id) => {
    try {
        await API.delete(`/products/${id}`);
        toast.success("Product deleted");
    fetchProducts();

    } catch (error) {
       toast.error("Delete failed");
       console.log("error:",error);
    }
  
  };

  if (loading) {
  return (
    <div className="p-6">
      {/* Title & Button Placeholder */}
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 bg-gray-200 rounded-lg w-48 animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded-lg w-32 animate-pulse"></div>
      </div>

      {/* The Table Skeleton */}
      <TableSkeleton rows={8} columns={5} />
    </div>
  );
}
  return (
    <div>
  <div className="flex justify-between items-center mb-4">
  <h2 className="text-2xl mb-4">Products Management</h2>

  <button
     onClick={() => {
  resetForm(); 
  setIsModalOpen(true);
}}
    className="bg-violet-900 text-white px-4 py-2 rounded-sm"
  >
     + Add Product
  </button>
</div>
     

      {/* TABLE */}
      <table className="w-full border text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td className="p-2 border">{p.name}</td>

              <td className="p-2 border">
                <img
                   src={`http://localhost:5000${p.image}`}
                  className="w-16 h-16 object-cover mx-auto rounded-md"
                />
              </td>

              <td className="p-2 border">{p.category?.name}</td>

              <td className="p-2 border">₹{p.price}</td>

              <td className="space-x-2 border">
                <button
                  onClick={() => handleEdit(p)}
                  className="px-2"
                >
                  <svg class="w-6 h-6 text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
</svg>
                </button>

                <button
                  onClick={() => deleteProduct(p._id)}
                  className=" px-2"
                >
                    <svg class="w-6 h-6 text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
</svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-3 mt-5">

        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="border px-3 py-1"
        >
          Prev
        </button>

        <span className="px-4 py-1 border bg-black text-white">
    {page} 
  </span>

        <button
          disabled={page === pages}
          onClick={() => setPage((prev) => prev + 1)}
          className="border px-3 py-1"
        >
          Next
        </button>

      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

          <div className="bg-white p-5 w-[400px] rounded">

            <h3 className="text-xl mb-3">
              {editingId ? "Edit Product" : "Add Product"}
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2">

              <input
                placeholder="Name"
                className="border p-2"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <input
                placeholder="Price"
                className="border p-2"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
              />

             <input
  type="file"
  className="border p-2"
  onChange={(e) => setImageFile(e.target.files[0])}
/>

              <select
                className="border p-2"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
              >
                <option value="">Select Category</option>

                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <input
                placeholder="Stock"
                className="border p-2"
                value={form.stock}
                onChange={(e) =>
                  setForm({ ...form, stock: e.target.value })
                }
              />

              <textarea
                placeholder="Description"
                className="border p-2"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

     <div className="grid grid-cols-2 gap-4">
 <button className="bg-violet-900 text-white p-2 rounded-sm">
                {editingId ? "Update" : "Add"}
              </button>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-400 text-white p-2 rounded-sm"
              >
                Cancel
              </button>
     </div>
             

            </form>

          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProducts;
