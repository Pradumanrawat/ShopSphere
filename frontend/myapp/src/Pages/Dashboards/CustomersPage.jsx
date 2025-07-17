

import React, { useEffect, useState } from "react";
import searchIcon from '../../assets/search.png';
import axios from 'axios';

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/admindata', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCustomers(res.data.customers || []);
      } catch (err) {
        console.error('Error loading customers:', err);
      }
    };
    fetchCustomers();
  }, []);

  const filtered = customers.filter(c =>
    c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  return (
    <>
      <div className="relative w-full max-w-md mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <img src={searchIcon} alt="Search Icon" className="w-5 h-5" />
        </div>
        <input
          placeholder="Search customers..."
          className="pl-10 pr-4 py-2.5 border rounded-lg w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="bg-white shadow-md rounded-lg border">
        <table className="w-full">
          <thead className="bg-gray-100  ml-0">
            <tr>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c._id} className="hover:bg-gray-50">
                <td className="px-4 py-2">{c.fullName}</td>
                <td className="px-4 py-2">{c.email}</td>
                <td className="px-4 py-2">
                  {c.address}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CustomersPage;
