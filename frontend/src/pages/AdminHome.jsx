import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function AdminHome() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState(0);
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [usersData, productsData, ordersData, categoriesData] =
        await Promise.all([
          API.get("/users"),
          API.get("/products"),
          API.get("/orders"),
          API.get("/categories"),
        ]);

      setUsers(usersData.data);
      setProducts(productsData.data.total);
      setOrders(ordersData.data);
      setCategories(categoriesData.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) return <div className="p-6">Loading dashboard...</div>;

  // === Users by Last 6 Months Bar Chart ===
  const now = new Date();
  const last6Months = [...Array(6)].map((_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    return `${d.toLocaleString("default", { month: "short" })} ${d.getFullYear()}`;
  }).reverse(); // Oldest first

  const usersPerMonth = last6Months.map((monthLabel) => {
    const [monthName, year] = monthLabel.split(" ");
    const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth();
    return users.filter(u => {
      const d = new Date(u.createdAt);
      return d.getFullYear() === parseInt(year) && d.getMonth() === monthIndex;
    }).length;
  });

  const userBarChartData = {
    labels: last6Months,
    datasets: [
      {
        label: "New Users",
        data: usersPerMonth,
        backgroundColor: "#1bd152",
        borderRadius: 6,
      },
    ],
  };

  const userBarChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Users Registered in Last 6 Months" },
    },
     scales: {
    x: {
      // Controls width of bars relative to category
      barPercentage: 0.2,       // 50% of available category width
      categoryPercentage: 0.2,  // 50% of the category spacing
    },
  },
  };

  // === Donut Charts ===
  const doughnutOptions = { responsive: true, plugins: { legend: { position: "bottom" } } };

  const productsChartData = {
    labels: ["Products"],
    datasets: [{ data: [products], backgroundColor: ["#7ab8fa"] }],
  };

  const categoriesChartData = {
    labels: ["Categories"],
    datasets: [{ data: [categories.length], backgroundColor: ["#9f70ba"] }],
  };

  const ordersChartData = {
    labels: ["Orders"],
    datasets: [{ data: [orders.length], backgroundColor: ["#a475fa"] }],
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-100 text-dark p-5 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Users</h3>
          <p className="text-3xl font-bold mt-2">{users.filter(u => u.role === "user").length}</p>
        </div>
        <div className="bg-blue-100 text-dark p-5 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Products</h3>
          <p className="text-3xl font-bold mt-2">{products}</p>
        </div>
        <div className="bg-blue-100 text-dark p-5 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Orders</h3>
          <p className="text-3xl font-bold mt-2">{orders.length}</p>
        </div>
        <div className="bg-blue-100 text-dark p-5 rounded-xl shadow">
          <h3 className="text-lg font-semibold">Categories</h3>
          <p className="text-3xl font-bold mt-2">{categories.length}</p>
        </div>
      </div>

      {/* USERS LAST 6 MONTHS BAR CHART */}
      <div className="bg-white mt-8 p-6 rounded-xl shadow hidden sm:block">
        <Bar data={userBarChartData} options={userBarChartOptions} />
      </div>

      {/* DONUT CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <Doughnut data={productsChartData} options={doughnutOptions} />
          <p className="text-center mt-2 font-semibold">Products</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <Doughnut data={categoriesChartData} options={doughnutOptions} />
          <p className="text-center mt-2 font-semibold">Categories</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <Doughnut data={ordersChartData} options={doughnutOptions} />
          <p className="text-center mt-2 font-semibold">Orders</p>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;