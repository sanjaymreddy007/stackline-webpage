import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store/store';
import { fetchSalesData } from './features/salesSlice';
import ProductDetails from './components/ProductDetails';
import SalesGraph from './components/SalesGraph';
import SalesTable from './components/SalesTable';

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status } = useSelector((state: RootState) => state.sales);

    useEffect(() => {
        dispatch(fetchSalesData());
    }, [dispatch]);

    if (status === 'loading') return <p>Loading...</p>;
    if (status === 'failed') return <p>Failed to fetch sales data. Please try again later.</p>;
    if (!data || data.length === 0) return <p>No product data available.</p>;

    const product = data[0];

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Navbar */}
            <div className="bg-[#00284d] p-6 flex items-center justify-between">
                <img src="/stackline_logo.svg" alt="Stackline Logo" className="h-6" />
            </div>

            {/* Main Content */}
            <div className="w-full mx-auto px-2 lg:px-4 py-4 grid grid-cols-1 lg:grid-cols-4 gap-2 mt-8 gap-x-4">
                {/* Left Side: Product Details */}
                <div className="lg:col-span-1 bg-white border-b border-gray-300 rounded-md pt-4">
                    <ProductDetails
                        title={product.title}
                        subtitle={product.subtitle}
                        image={product.image}
                        tags={product.tags}
                    />
                </div>

                {/* Right Side: Graph and Table */}
                <div className="lg:col-span-3">
                    {/* Graph */}
                    <div className="bg-white shadow-md p-4 mb-14 rounded-md">
                        <h2 className="text-lg mb-4" style={{ color: '#4B4B4B' }}>Retail Sales</h2>
                        <SalesGraph data={product.sales} />
                    </div>

                    {/* Table */}
                    <div className="bg-white shadow-md rounded-md">
                        <SalesTable data={product.sales} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
