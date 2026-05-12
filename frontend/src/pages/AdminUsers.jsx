import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import TableSkeleton from "./TableSkeleton";
function AdminUsers() {
  const [users, setUsers] = useState([]);
const [editingUser, setEditingUser] = useState(null);
const [loading, setLoading] = useState(true);
  const fetchUsers = async () => {

    try {
       setLoading(true);
       const { data } = await API.get("/users");  
    setUsers(data);
    }catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
    
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await API.delete(`/users/${id}`);
    fetchUsers();
    } catch (error) {
       toast.error("Something went wrong");
       console.error(err);
    setLoading(false);
    }finally {
    setLoading(false);
  }
    
  };

  const handleEdit = (user) => {
  setEditingUser(user);
};

const updateUser = async () => {
  try {
    setLoading(true);
    await API.put(`/users/${editingUser._id}`, {
      role: editingUser.role,
    });

    setEditingUser(null);
    fetchUsers();

  } catch (error) {
    toast.error("Something went wrong");
    console.log(error.response?.data?.message);
    setLoading(false);
  }
};

if (loading) {
  return (
   <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 bg-gray-200 rounded-lg w-48 animate-pulse"></div>
      </div>
        <TableSkeleton rows={8} columns={5}/>
    </div>
  );
};
  return (
  <div>
    <h2 className="text-lg md:text-2xl mb-4">User Management</h2>

    <table className="w-full border border-gray-300 ">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Email</th>
          <th className="p-2 border">Role</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user._id} className="text-center">
            <td className="p-2 border">{user.name}</td>
            <td className="p-2 border">{user.email}</td>

            <td className="p-2 border">
              {user.role === "admin" ? (
                <span className="text-green-600 font-bold">Admin</span>
              ) : (
                <span className="text-blue-600">User</span>
              )}
            </td>

            <td className="p-2 border flex justify-center gap-2">
              <button
                className=" px-2 py-1 text-white"
                onClick={() => handleEdit(user)}
              >
                <svg class="w-6 h-6 text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
</svg>
              </button>

              <button
                onClick={() => deleteUser(user._id)}
                className=" px-2 py-1"
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

    {editingUser && (
  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-5 rounded w-80">
      <h3 className="mb-3">Edit User</h3>

      <select
        className="border p-2 w-full mb-3"
        value={editingUser.role}
        onChange={(e) =>
          setEditingUser({ ...editingUser, role: e.target.value })
        }
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <div className="flex justify-between">
        <button
          className="bg-violet-900 text-white px-4 py-2 rounded-md"
          onClick={updateUser}
        >
          Update
        </button>

        <button
          className="bg-gray-400 text-white p-2 rounded-md"
          onClick={() => setEditingUser(null)}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
  </div>
);
}

export default AdminUsers;  