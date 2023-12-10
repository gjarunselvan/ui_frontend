// Wishlist.js
import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import "../Wishlist.css"; // Import your stylesheet

const Wishlist = () => {
  const [wishlistData, setWishlistData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWishlistData = async () => {
    try {
      const user = AuthService.getCurrentUser();

      if (!user) {
        throw new Error("User not authenticated");
      }

      setLoading(true);

      const response = await fetch(`http://52.142.30.237:9004/wishlist/fetch/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok. Status: ${response.status}`);
      }

      const data = await response.json();

      if (!data || !Array.isArray(data.products)) {
        console.error("Fetched data is not in the expected format. Received data:", data);
        setWishlistData({});
        throw new Error("Fetched data is not in the expected format");
      }

      setWishlistData(data);
    } catch (error) {
      setError(`Error fetching wishlist data: ${error.message}`);
      console.error("Error fetching wishlist data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlistData();
  }, []);

  const getProductDetailsUrl = (productId) => `http://proddetails.eastus.cloudapp.azure.com:3000/?id=${productId}`;

  const handleRemoveItem = async (itemId) => {
    try {
      const user = AuthService.getCurrentUser();

      if (!user) {
        throw new Error("User not authenticated");
      }

      const response = await fetch(`http://52.142.30.237:9004/wishlist/remove`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email, id: itemId }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok. Status: ${response.status}`);
      }

      // Refresh wishlist data after removal
      fetchWishlistData();
    } catch (error) {
      setError(`Error removing item from wishlist: ${error.message}`);
      console.error("Error removing item from wishlist:", error);
    }
  };

  return (
    <div className="wishlist-container">
      <h2>My Wishlist</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : Object.keys(wishlistData).length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div>
          <p>
            <strong>Email:</strong> {wishlistData.email}
          </p>
          <p>
            <strong>Cart ID:</strong> {wishlistData.cartId || 'N/A'}
          </p>
          {wishlistData.products.map((item) => (
            <div key={item.id} className="wishlist-item">
              <p>
                <strong>Product ID:</strong> {item.id}
              </p>
              <iframe
                src={getProductDetailsUrl(item.id)}
                title={`Product ${item.id} Details`}
                width="100%"
                height="300px"
              ></iframe>
              <button className="remove-button" onClick={() => handleRemoveItem(item.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
