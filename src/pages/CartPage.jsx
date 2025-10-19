import { useState } from 'react'; 
import { useAuth } from '../context/AuthContext'; 
import { useCart } from '../context/CartContext'; 

function Cart() { 
  const { user } = useAuth(); 
  const { cart, addToCart, removeFromCart } = useCart(); 

  // Sample products (replace with API fetch if needed) 
  const products = [ 
    { id: '1', name: 'Laptop', price: 999.99 }, 
    { id: '2', name: 'Phone', price: 499.99 }, 
    { id: '3', name: 'Headphones', price: 79.99 }, 
  ]; 

  // Calculate total price 
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2); 

  return ( 
    <div className="container mx-auto p-4"> 
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1> 

      {!user ? ( 
        <p className="text-red-500">Please log in to manage your cart.</p> 
      ) : ( 
        <> 
          {/* Products List */} 
          <div className="mb-8"> 
            <h2 className="text-xl font-semibold mb-2">Available Products</h2> 
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"> 
              {products.map((product) => ( 
                <div key={product.id} className="border p-4 rounded shadow"> 
                  <h3 className="text-lg font-medium">{product.name}</h3> 
                  <p className="text-gray-600">${product.price.toFixed(2)}</p> 
                  <button 
                    onClick={() => addToCart(product)} 
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" 
                  > 
                    Add to Cart 
                  </button> 
                </div> 
              ))} 
            </div> 
          </div> 

          {/* Cart Contents */} 
          <div> 
            <h2 className="text-xl font-semibold mb-2">Your Cart</h2> 
            {cart.length === 0 ? ( 
              <p className="text-gray-500">Your cart is empty.</p> 
            ) : ( 
              <div> 
                {cart.map((item) => ( 
                  <div 
                    key={item.id} 
                    className="flex justify-between items-center border-b py-2" 
                  > 
                    <div> 
                      <span>{item.name}</span> 
                      <span className="text-gray-600 ml-2"> 
                        (${item.price.toFixed(2)} x {item.quantity}) 
                      </span> 
                    </div> 
                    <button 
                      onClick={() => removeFromCart(item.id)} 
                      className="text-red-500 hover:text-red-700" 
                    > 
                      Remove 
                    </button> 
                  </div> 
                ))} 
                <div className="mt-4 text-lg font-bold"> 
                  Total: ${totalPrice} 
                </div> 
              </div> 
            )} 
          </div> 
        </> 
      )} 
    </div> 
  ); 
} 

export default Cart;