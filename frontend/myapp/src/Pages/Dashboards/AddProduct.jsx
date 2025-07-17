import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = ({ addProduct, productToEdit, clearEdit ,updateproduct}) => {
  const [ productname, setproductname] = useState('');
  const [price, setPrice] = useState('');
  const [ stockQuantity, setstockQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [status, setstatus] = useState('In Stock');
  const navigate = useNavigate();

  useEffect(() => {
    if (productToEdit) {
      setproductname(productToEdit.productname || '');
      setPrice(productToEdit.price || '');
      setstockQuantity(productToEdit.stockQuantity || '');
      setDescription(productToEdit.description || '');
      setImage(productToEdit.image || '');
      setCategory(productToEdit.category || '');
      setstatus(productToEdit.status || 'In Stock');
    } else {
      setproductname('');
      setPrice('');
      setstockQuantity('');
      setDescription('');
      setImage('');
      setCategory('');
      setstatus('In Stock');
    }
  }, [productToEdit]);

 
  const handleSubmit = (e) => {
    e.preventDefault();
  
    
  
    const formData = new FormData();
    formData.append("productname", productname);
    formData.append("price", price);
    formData.append("stockQuantity", stockQuantity);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("status", status);
    
  
    if (image instanceof File) {
      formData.append("image", image); // actual file
    }
    if (productToEdit) {
      updateproduct(productToEdit._id, formData);
    } else {
      addProduct(formData);
    }
  
    clearEdit();
    navigate('/dashboard/product');
  };
  
   
  

 
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // store the actual File object, not base64
    }
  };
  
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{productToEdit ? 'Update Product' : 'Add New Product'}</h2>
      <form className="space-y-4 bg-white p-4 rounded shadow" onSubmit={handleSubmit}>
        <input placeholder="Product Name" className="w-full border p-2 rounded" value={productname} onChange={e => setproductname(e.target.value)} />
        <input type="number" placeholder="Price" className="w-full border p-2 rounded" value={price} onChange={e => setPrice(e.target.value)} />
        <input type="number" placeholder="Stock Quantity" className="w-full border p-2 rounded" value={stockQuantity} onChange={e => setstockQuantity(e.target.value)} />
        <input placeholder="Category" className="w-full border p-2 rounded" value={category} onChange={e => setCategory(e.target.value)} />
        <select
          className="w-full border p-2 rounded" 
          value={status}
          onChange={e => setstatus(e.target.value)}
        >
          <option value="In Stock">In Stock</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
        <textarea placeholder="Description" className="w-full border p-2 rounded" value={description} onChange={e => setDescription(e.target.value)} />
        <input type="file" accept="image/*" capture="environment" className="w-full" onChange={handleImage} />
       


        {image && typeof image !== 'string' && (
  <img src={URL.createObjectURL(image)} alt="Preview" className="w-full h-40 object-cover rounded" />
)}

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{productToEdit ? 'Update Product' : 'Add Product'}</button>
      </form>
    </div>
  );
};

export default AddProduct;




