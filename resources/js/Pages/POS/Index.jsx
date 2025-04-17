import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function POS({ products, categories }) {
    const [cartItems, setCartItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [pointsWon, setPointsWon] = useState(0);
    const [totalPoints, setTotalPoints] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Calculate cart totals
    const cartTotal = cartItems.reduce((sum, item) => sum + item.total, 0).toFixed(2);
    const taxes = (cartTotal * 0.13).toFixed(2);

    // Filter products based on search and category
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !selectedCategory || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Add item to cart
    const addToCart = (product) => {
        const existingItem = cartItems.find(item => item.id === product.id);
        
        if (existingItem) {
            setCartItems(cartItems.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
                    : item
            ));
        } else {
            setCartItems([...cartItems, {
                id: product.id,
                name: product.name,
                quantity: 1,
                price: product.price,
                total: product.price
            }]);
        }

        // Update points (example: 1 point per dollar spent)
        const newPointsWon = Math.floor(product.price);
        setPointsWon(prevPoints => prevPoints + newPointsWon);
        setTotalPoints(prevTotal => prevTotal + newPointsWon);
    };

    // Handle quantity changes from numpad
    const handleQuantityChange = (value) => {
        if (!selectedItem) return;

        const updatedItems = cartItems.map(item => {
            if (item.id === selectedItem.id) {
                const newQuantity = parseFloat(value) || item.quantity;
                return {
                    ...item,
                    quantity: newQuantity,
                    total: (newQuantity * item.price).toFixed(2)
                };
            }
            return item;
        });
        setCartItems(updatedItems);
    };

    // Handle numpad input
    const handleNumpadClick = (value) => {
        if (!selectedItem) return;

        switch(value) {
            case 'Qty':
                // Toggle quantity mode
                break;
            case '⌫':
                handleQuantityChange(Math.floor(selectedItem.quantity / 10));
                break;
            default:
                if (!isNaN(value)) {
                    const newValue = selectedItem.quantity.toString() + value;
                    handleQuantityChange(parseFloat(newValue));
                }
        }
    };

    // Handle payment
    const handlePayment = () => {
        if (cartItems.length === 0) return;

        const orderData = {
            items: cartItems,
            total: parseFloat(cartTotal),
            taxes: parseFloat(taxes),
        };

        // Send order to backend
        fetch('/pos/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            },
            body: JSON.stringify(orderData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Clear cart and reset points
                setCartItems([]);
                setPointsWon(0);
                setSelectedItem(null);
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Point of Sale" />

            <div className="flex h-[calc(100vh-64px)]">
                {/* Left Side - Cart */}
                <div className="w-1/3 bg-white border-r flex flex-col">
                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto">
                        {cartItems.map((item) => (
                            <div 
                                key={item.id}
                                onClick={() => setSelectedItem(item)}
                                className={`p-3 border-b cursor-pointer ${selectedItem?.id === item.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                                        <div className="text-sm text-gray-600">
                                            {item.quantity.toFixed(2)} Units x ${item.price.toFixed(2)} / Units
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-gray-900">
                                            ${item.total}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Cart Total */}
                    <div className="bg-gray-50 p-4">
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Total:</span>
                            <span className="font-bold text-gray-900">${cartTotal}</span>
                        </div>
                        <div className="text-sm text-gray-500">
                            Taxes: ${taxes}
                        </div>

                        {/* Loyalty Points */}
                        <div className="mt-4 bg-gray-100 p-3 rounded-lg">
                            <div className="text-sm font-medium text-gray-700">Loyalty Points</div>
                            <div className="flex justify-between mt-2">
                                <div>
                                    <div className="text-sm text-gray-600">Points Won</div>
                                    <div className="text-green-600 font-medium">+{pointsWon}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600">New Total</div>
                                    <div className="font-medium text-gray-900">{totalPoints}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-3 gap-1 p-2 bg-white border-t">
                        <button className="p-2 text-sm bg-gray-100 hover:bg-gray-200 rounded">
                            Refund
                        </button>
                        <button className="p-2 text-sm bg-gray-100 hover:bg-gray-200 rounded">
                            Customer Note
                        </button>
                        <button className="p-2 text-sm bg-gray-100 hover:bg-gray-200 rounded">
                            Enter Code
                        </button>
                        <button className="p-2 text-sm bg-gray-100 hover:bg-gray-200 rounded">
                            Reset Programs
                        </button>
                        <button className="p-2 text-sm bg-gray-100 hover:bg-gray-200 rounded">
                            Reward
                        </button>
                        <button className="p-2 text-sm bg-gray-100 hover:bg-gray-200 rounded">
                            Quotation/Order
                        </button>
                    </div>

                    {/* Numpad */}
                    <div className="p-2 bg-white border-t">
                        <div className="grid grid-cols-4 gap-1">
                            {['7', '8', '9', 'Qty', '4', '5', '6', '% Disc', '1', '2', '3', 'Price', '+/-', '0', '.', '⌫'].map((btn) => (
                                <button
                                    key={btn}
                                    onClick={() => handleNumpadClick(btn)}
                                    className="p-4 text-center bg-white border rounded hover:bg-gray-50"
                                >
                                    {btn}
                                </button>
                            ))}
                        </div>
                        <button 
                            onClick={handlePayment}
                            className="w-full mt-2 p-4 text-white bg-purple-600 hover:bg-purple-700 rounded"
                        >
                            Payment
                        </button>
                    </div>
                </div>

                {/* Right Side - Products */}
                <div className="flex-1 bg-gray-100 flex flex-col">
                    {/* Categories and Search */}
                    <div className="bg-white p-4 shadow">
                        <div className="flex items-center justify-between">
                            <div className="flex space-x-4">
                                <button 
                                    onClick={() => setSelectedCategory(null)}
                                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                                        !selectedCategory ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    All
                                </button>
                                {categories.map(category => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.name)}
                                        className={`px-4 py-2 text-sm font-medium rounded-md ${
                                            selectedCategory === category.name ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search products..."
                                    className="w-64 pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                />
                                <div className="absolute left-3 top-2.5 text-gray-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1 p-6 overflow-y-auto">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredProducts.map((product) => (
                                <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
                                    <div className="p-4">
                                        <div className="aspect-w-4 aspect-h-3 bg-gray-200 rounded-lg mb-4">
                                            {product.image && (
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="object-cover w-full h-full"
                                                />
                                            )}
                                        </div>
                                        <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                                        <div className="text-sm text-gray-500 mb-2">{product.description}</div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                                            <button 
                                                onClick={() => addToCart(product)}
                                                className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 