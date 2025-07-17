
import React, { useEffect, useState } from 'react';
import { Bar, Line, Doughnut, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';

ChartJS.register(
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const Analytic = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:3000/analytic', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        const data = res.data;
        console.log(" Analytics response from backend:", data);
        setAnalytics(data);
      } catch (error) {
        console.error(" Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { font: { size: 14 } } },
    },
    scales: {
      x: { ticks: { font: { size: 12 } } },
      y: { ticks: { font: { size: 12 } } },
    },
  };

  if (loading) return <div className="p-6 text-lg font-medium">Loading analytics...</div>;
  if (!analytics) return <div className="p-6 text-red-600 font-medium">Failed to load analytics data.</div>;

  // ✅ Prepare category chart data
  const categoryCounts = analytics.categorycount || {};
  const categoryLabels = Object.keys( categoryCounts);
  const categoryData = Object.values(categoryCounts);

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Shop Analytics Dashboard 📊</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* ✅ Stock Status Pie Chart */}
        <div className="bg-white p-5 rounded-xl shadow border border-gray-200 h-[350px]">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Inventory Status</h3>
          <Pie
            data={{
              labels: ['In Stock', 'Low Stock', 'Out of Stock'],
              datasets: [{
                label: 'Products',
                data: [
                  analytics.statusCounts?.inStock || 0,
                  analytics.statusCounts?.lowStock || 0,
                  analytics.statusCounts?.outOfStock || 0,
                ],
                backgroundColor: ['#2ecc71', '#f1c40f', '#e74c3c'],
              }],
            }}
            options={chartOptions}
          />
        </div>

        {/* ✅ Products by Category Doughnut Chart */}
        <div className="bg-white p-5 rounded-xl shadow border border-gray-200 h-[350px]">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Products by Category</h3>
          {categoryLabels.length === 0 || categoryData.every(val => val === 0) ? (
            <p className="text-gray-500">No category data available.</p>
          ) : (
            <Doughnut
              data={{
                labels: categoryLabels,
                datasets: [{
                  data: categoryData,
                  backgroundColor: [
                    '#FF6384', '#36A2EB', '#FFCE56', '#8E44AD',
                    '#2ecc71', '#f39c12', '#1abc9c', '#c0392b'
                  ],
                }]
              }}
              options={chartOptions}
            />
          )}
        </div>

        {/* ✅ Low Stock Products Bar Chart */}
<div className="bg-white p-5 rounded-xl shadow border border-gray-200 h-[350px] col-span-1 lg:col-span-2">
  <h3 className="text-lg font-semibold mb-4 text-gray-700">Top 5 Out of Stock  Products</h3>
  {analytics.low?.length === 0 ? (
    <p className="text-gray-500">No low stock products available.</p>
  ) : (
    <Bar
      data={{
        labels: analytics.low.map(p => p.productname),
        datasets: [{
          label:  'Price ₹',
          data: analytics.low.map(p => p.price),
          backgroundColor: '#e74c3c',
        }]
      }}
      options={{
        ...chartOptions,
        indexAxis: 'y' ,
        
        
      }}
    />
  )}
</div>



{/* ✅ Total Revenue by Product Bar Chart */}
<div className="bg-white p-5 rounded-xl shadow border border-gray-200 h-[350px] col-span-1 lg:col-span-2">
  <h3 className="text-lg font-semibold mb-4 text-gray-700">Total Revenue by Product</h3>
  {analytics.revenueByProduct?.length === 0 ? (
    <p className="text-gray-500">No revenue data available.</p>
  ) : (
    <Bar
      data={{
        labels: analytics.revenueByProduct.map(item => item._id), // product names
        datasets: [{
          label: 'Revenue (₹)',
          data: analytics.revenueByProduct.map(item => item.totalRevenue),
          backgroundColor: '#2ecc71',
        }]
      }}
      options={{
        ...chartOptions,
        
        plugins: {
          ...chartOptions.plugins,
          tooltip: {
            callbacks: {
              label: (context) => `₹${context.raw}`
            }
          }
        }
      }}
    />
  )}
</div>


      </div>
    </div>
  );
};

export default Analytic;
