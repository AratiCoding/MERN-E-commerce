import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import TableSkeleton from "./TableSkeleton";
function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);
const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
const [selectedId, setSelectedId] = useState(null);
const [loading, setLoading] = useState(true);
  const fetchCategories = async () => {
    try {
       setLoading(true);
       const { data } = await API.get("/categories");
    setCategories(data);
    } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
    
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);

    try {
       if (editingId) {
      await API.put(`/categories/${editingId}`, formData);
        toast.success("Category updated successfully");
    } else {
      await API.post("/categories", formData);
       toast.success("Category created successfully");
    }

    setName("");
    setImage(null);
    setEditingId(null);
    setIsModalOpen(false);
    fetchCategories();
    } catch (error) {
       toast.error("Something went wrong ");
    console.error(error);
    }
   
  };

  const handleEdit = (cat) => {
    setName(cat.name);
    setEditingId(cat._id);
  };

 const confirmDelete = async () => {
  try {
    await API.delete(`/categories/${selectedId}`);
    toast.success("Category deleted");

    setIsDeleteModalOpen(false);
    setSelectedId(null);

    fetchCategories();
  } catch (error) {
    toast.error("Delete failed");
    console.log("error :", error);
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
  <h2 className="text-lg md:text-2xl">Category Management</h2>

  <button
    onClick={() => {
      setIsModalOpen(true);
      setEditingId(null);
      setName("");
      setImage(null);
    }}
    className="bg-violet-900 text-white px-4 py-2 rounded-sm"
  >
    + Create
  </button>
</div>

     {isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded w-96">
      <h3 className="text-lg mb-3">
        {editingId ? "Edit Category" : "Add Category"}
      </h3>

      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Name"
          className="border p-2 w-full mb-3  rounded-md"
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-3"
        />

        <div className="flex justify-between">
          <button className="bg-violet-900 text-white px-4 py-1 rounded-sm">
            {editingId ? "Update" : "Create"}
          </button>

          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-500 text-white px-4 py-1 rounded-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}

{isDeleteModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded w-80 text-center">
      <h3 className="text-lg mb-4 text-red-600 font-bold">Confirm Delete</h3>
      <p className="mb-5">Are you sure you want to delete this category?</p>

      <div className="flex justify-between">
        <button
          onClick={confirmDelete}
          className="bg-red-600 text-white px-4 py-2 rounded-sm flex"
        >
              <svg class="w-5 h-5 text-white mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
</svg> <span>Delete</span>
        </button>

        <button
          onClick={() => setIsDeleteModalOpen(false)}
          className="bg-gray-400 text-white px-4 py-2 rounded-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
      {/* TABLE */}
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id} className="text-center">
              <td className="p-2 border">{cat.name}</td>

              <td className="p-2 border">
                <img
                  src={`${process.env.REACT_APP_API_URL.replace("/api", "")}${cat.image}`}
                  className="w-16 h-16 object-cover mx-auto rounded-lg"
                />
              </td>

              <td className="p-2 border space-x-6">
                <button   onClick={() => {
    handleEdit(cat);
    setIsModalOpen(true);
  }}><svg class="w-6 h-6 text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
</svg>
</button>
                <button  onClick={() => {
    setSelectedId(cat._id);
    setIsDeleteModalOpen(true);
  }}>
                <svg class="w-6 h-6 text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
</svg>


                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminCategories;