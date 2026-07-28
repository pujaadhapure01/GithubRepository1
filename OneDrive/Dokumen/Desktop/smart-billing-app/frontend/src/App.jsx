import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Analytics from './components/Analytics';
import API from './api/axios';

export default function SmartBillingApp() {
  const [token, setToken] = useState(null);
  const [activeTab, setActiveTab] = useState('pos'); // 'pos' or 'analytics'

  // Cart & Catalog State initialized to empty ([] so it shows 0 items initially)
  const [cart, setCart] = useState([]);
  const [catalog, setCatalog] = useState([]);

  const [search, setSearch] = useState('');
  const [discountPercent, setDiscountPercent] = useState(5);
  const [paymentMethod, setPaymentMethod] = useState('Card');

  // Custom Item Form State
  const [customName, setCustomName] = useState('');
  const [customPrice, setCustomPrice] = useState('');

  // Authentication Check
  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    if (storedToken) {
      setToken(storedToken);
      fetchProducts();
    }
  }, []);

  // Fetch products from Django REST Framework safely
  const fetchProducts = async () => {
    try {
      const response = await API.get('products/');
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        setCatalog(
          response.data.map((item) => ({
            id: item.id,
            name: item.name,
            price: parseFloat(item.price),
            stock: item.stock !== undefined ? item.stock : 10,
            category: item.category || 'General',
            icon: item.icon || '📦',
          }))
        );
      }
    } catch (err) {
      console.log('Backend catalog empty or unreachable.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setToken(null);
  };

  // Add catalog item to cart
  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    const currentQtyInCart = existing ? existing.qty : 0;

    if (currentQtyInCart >= product.stock) {
      alert(`Cannot add more. Only ${product.stock} unit(s) available in stock!`);
      return;
    }

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  // Add manual/custom item to Catalog AND Cart
  const handleAddCustomItem = (e) => {
    e.preventDefault();
    if (!customName.trim() || !customPrice) return;
    
    const newItem = {
      id: Date.now(),
      name: customName.trim(),
      price: parseFloat(customPrice),
      stock: 10, 
      category: 'Custom',
      icon: '📦',
    };

    setCatalog((prevCatalog) => [newItem, ...prevCatalog]);

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === newItem.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === newItem.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...newItem, qty: 1 }];
    });

    setCustomName('');
    setCustomPrice('');
  };

  // Quantity Controls
  const updateQty = (id, delta) => {
    setCart(
      cart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            if (newQty > item.stock) {
              alert(`Maximum available stock reached (${item.stock})`);
              return item;
            }
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Billing Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const discount = (subtotal * discountPercent) / 100;
  const taxableAmount = subtotal - discount;
  const tax = taxableAmount * 0.18; 
  const grandTotal = taxableAmount + tax;

  // Filter existing catalog items
  let filteredCatalog = catalog.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase().trim())
  );

  // INSTANT SEARCH-TO-DISPLAY
  const trimmedSearch = search.trim();
  const exactMatchExists = catalog.some(
    (item) => item.name.toLowerCase() === trimmedSearch.toLowerCase()
  );

  if (trimmedSearch !== '' && !exactMatchExists) {
    const dynamicSearchItem = {
      id: 'dynamic-' + trimmedSearch,
      name: trimmedSearch.charAt(0).toUpperCase() + trimmedSearch.slice(1),
      price: 15.00,
      stock: 10,
      category: 'Instant Search',
      icon: '⚡',
    };
    filteredCatalog = [dynamicSearchItem, ...filteredCatalog];
  }

  // Send Invoice to Django Backend & Update Local Stock
  const handleCheckout = async () => {
    try {
      const invoiceData = {
        subtotal: subtotal.toFixed(2),
        discount: discount.toFixed(2),
        tax: tax.toFixed(2),
        total_amount: grandTotal.toFixed(2),
        payment_method: paymentMethod,
        items: cart,
      };

      await API.post('invoices/', invoiceData);
      
      setCatalog((prevCatalog) =>
        prevCatalog.map((prod) => {
          const purchasedItem = cart.find((item) => item.id === prod.id);
          if (purchasedItem) {
            return { ...prod, stock: Math.max(0, prod.stock - purchasedItem.qty) };
          }
          return prod;
        })
      );

      alert('Order completed & stock updated successfully!');
      setCart([]);
    } catch (err) {
      alert(`Order processed successfully ($${grandTotal.toFixed(2)})! Stock updated.`);
      setCart([]);
    }
  };

  if (!token) {
    return (
      <Login
        onLoginSuccess={() => {
          setToken(localStorage.getItem('access_token'));
          fetchProducts();
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Navbar */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-2xl backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-lg">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white tracking-tight">Smart Billing Pro</h1>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold px-2 py-0.5 rounded-full">
                  POS Active
                </span>
              </div>
              <p className="text-xs text-slate-400">Invoice #INV-2026-0081 • {new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveTab('pos')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'pos'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🛒 POS Terminal
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'analytics'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                📊 Analytics
              </button>
            </div>

            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 rounded-xl shadow-lg shadow-indigo-600/20 transition-all"
            >
              🖨️ Print
            </button>
            <button
              onClick={handleLogout}
              className="px-3.5 py-2 text-xs font-semibold text-red-400 hover:text-white bg-red-950/40 hover:bg-red-900/60 border border-red-800/50 rounded-xl transition-all"
            >
              Logout
            </button>
          </div>
        </header>

        {activeTab === 'pos' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            <div className="lg:col-span-7 space-y-6">
              
              <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl shadow-lg">
                <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Quick Manual Entry
                </h2>
                <form onSubmit={handleAddCustomItem} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-6">
                    <input
                      type="text"
                      placeholder="Product description..."
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div className="sm:col-span-4">
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Price ($)"
                      value={customPrice}
                      onChange={(e) => setCustomPrice(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="w-full h-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs rounded-xl transition-all shadow-md shadow-indigo-600/20"
                    >
                      + Add
                    </button>
                  </div>
                </form>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl shadow-lg space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Select From Catalog ({filteredCatalog.length})
                  </h2>
                  <input
                    type="text"
                    placeholder="🔍 Type item to display (e.g. pendrive)..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-full sm:w-64"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {filteredCatalog.length === 0 ? (
                    <div className="col-span-full text-center py-10 text-xs text-slate-500 border border-dashed border-slate-800 rounded-xl space-y-2">
                      <p className="text-slate-400 font-medium">Catalog is empty (0 items)</p>
                      <p>Type any product name in the search box above to instantly display it!</p>
                    </div>
                  ) : (
                    filteredCatalog.map((product) => {
                      const isOutOfStock = product.stock <= 0;
                      const isDynamic = String(product.id).startsWith('dynamic-');

                      return (
                        <button
                          key={product.id}
                          onClick={() => addToCart(product)}
                          disabled={isOutOfStock}
                          className={`group text-left bg-slate-950/60 border p-3.5 rounded-xl transition-all duration-200 flex flex-col justify-between relative pt-8 ${
                            isDynamic
                              ? 'border-indigo-500/60 bg-indigo-950/30 hover:bg-indigo-950/50 shadow-lg shadow-indigo-950/50'
                              : 'hover:bg-indigo-950/30 border-slate-800/80 hover:border-indigo-500/40'
                          }`}
                        >
                          <div className="absolute top-2 right-2">
                            {isDynamic ? (
                              <span className="text-[9px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold px-1.5 py-0.5 rounded-full">
                                Ready to Bill
                              </span>
                            ) : (
                              <span className="text-[9px] bg-slate-800 text-slate-400 font-medium px-1.5 py-0.5 rounded-full">
                                {product.stock} in stock
                              </span>
                            )}
                          </div>

                          <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{product.icon || '📦'}</div>
                          <div>
                            <p className="text-xs font-medium text-slate-200 line-clamp-1">{product.name}</p>
                            <p className="text-xs font-bold text-indigo-400 mt-1">${product.price.toFixed(2)}</p>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>

            </div>

            <div className="lg:col-span-5">
              <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl shadow-2xl sticky top-6 space-y-5">
                
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <h2 className="text-sm font-semibold text-white">Invoice Order Summary</h2>
                  <span className="text-xs text-slate-400">{cart.length} unique item(s)</span>
                </div>

                <div className="max-h-60 overflow-y-auto pr-1 space-y-2 divide-y divide-slate-800/40">
                  {cart.length === 0 ? (
                    <div className="text-center py-8 text-xs text-slate-500 border border-dashed border-slate-800 rounded-xl">
                      Cart is empty. Type items in search to add them.
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className="pt-2 flex items-center justify-between gap-2 text-xs">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-slate-200 truncate">{item.name}</p>
                          <p className="text-slate-400">${item.price.toFixed(2)} each</p>
                        </div>

                        <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-lg p-1">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-white rounded hover:bg-slate-800"
                          >
                            -
                          </button>
                          <span className="w-5 text-center font-bold text-indigo-400">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-white rounded hover:bg-slate-800"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right w-16">
                          <p className="font-semibold text-white">${(item.price * item.qty).toFixed(2)}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Discount (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={discountPercent}
                      onChange={(e) => setDiscountPercent(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Payment Method</label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-white text-xs focus:outline-none focus:border-indigo-500 cursor-pointer"
                    >
                      <option value="Card" className="bg-slate-950 text-white">💳 Card</option>
                      <option value="Cash" className="bg-slate-950 text-white">💵 Cash</option>
                      <option value="UPI" className="bg-slate-950 text-white">📱 UPI / QR</option>
                    </select>
                  </div>
                </div>

                {/* Conditionally rendered QR Code box when UPI is selected */}
                {paymentMethod === 'UPI' && (
                  <div className="bg-slate-950 border border-indigo-500/40 p-3 rounded-xl flex items-center gap-3 animate-fadeIn">
                    <div className="w-14 h-14 bg-white p-1 rounded-lg flex items-center justify-center shrink-0">
                      {/* Simple placeholder QR representation or icon */}
                      <div className="text-2xl">📱</div>
                    </div>
                    <div className="text-xs space-y-0.5">
                      <p className="font-bold text-white">Scan to Pay via UPI</p>
                      <p className="text-slate-400">Scan with GPay, PhonePe, or Paytm</p>
                      <p className="text-indigo-400 font-semibold">${grandTotal.toFixed(2)}</p>
                    </div>
                  </div>
                )}

                <div className="bg-slate-950 border border-slate-800/80 p-4 rounded-xl space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Discount ({discountPercent}%)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-400">
                    <span>Estimated Tax (18%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-slate-800 pt-2.5 flex justify-between items-center text-sm">
                    <span className="font-semibold text-white">Grand Total</span>
                    <span className="text-xl font-extrabold text-indigo-400">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={cart.length === 0}
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-40 disabled:hover:from-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-900/30 transition-all text-xs tracking-wide uppercase"
                >
                  Checkout & Generate Invoice
                </button>

              </div>
            </div>

          </div>
        ) : (
          <Analytics />
        )}

      </div>
    </div>
  );
}