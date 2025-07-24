
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';


function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        query: '',
        phone: ''
    });

    const notify = () => {
        toast("Query has been Submitted", {
            theme: "light",
            position: 'top-right',
            autoClose: 3000,
            pauseOnHover: false,
            style: {
                backgroundColor: "rgb(219, 214, 214)",
                color: "#000",
                fontWeight: "600",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)"
            },
            progressStyle: {
                background: "#fca5a5",
            }
        });
    };

    const submitted = e => {
        e.preventDefault();
        notify();
        setFormData({ name: '', email: '', phone: '', query: '' });
    };

    return (
        <>
            <div className="contact  bg-gray-100 p-6">
                <div className="form flex items-center justify-center min-h-screen">


                    <form onSubmit={submitted} className=' bg-white p-6 md:p-8 rounded-xl shadow-lg w-full max-w-md'>
  

                        <h2 className='     text-2xl font-semibold text-center text-gray-800 mb-6'>Contact Us</h2>

                        {['name', 'email', 'phone'].map((field, index) => (
                            <div key={index}>
                                <span className='text-md'>{field.charAt(0).toUpperCase() + field.slice(1)}</span>
                                <input
                                    name={field}
                                    type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                                    pattern={field === 'phone' ? "[0-9]{10}" : undefined}
                                    value={formData[field]}
                                    onChange={e => setFormData(prev => ({
                                        ...prev,
                                        [e.target.name]: e.target.value
                                    }))}
                                    className='border shadow-lg border-gray-400 p-1 px-3 text-black w-full mb-3 rounded-2xl'
                                    placeholder={`Enter your ${field}`}
                                    required
                                />
                            </div>
                        ))}

                        <span className='text-md'>Query</span>
                        <textarea
                            name="query"
                            rows="3"
                            className='border shadow-lg border-gray-400 w-full rounded-2xl p-1 px-3 mb-3 text-black resize-none'
                            placeholder="Your Query"
                            value={formData.query}
                            onChange={e => setFormData(prev => ({
                                ...prev,
                                query: e.target.value
                            }))}
                            required
                        />

                        <div className="flex justify-center">
                            <button type='submit' className='        w-full bg-red-500 text-white p-3 rounded-lg font-semibold hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 '>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    );
}

export default Contact;
