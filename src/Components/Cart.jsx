import { useCart } from "../contexts/useCart";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Cart() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (item, newQuantity) => {
    updateQuantity(item.id, newQuantity);
  };

  return (
    <>
      <Navbar />
      <div className="container" style={{ padding: "20px 0" }}>
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "600",
            marginBottom: "20px",
            color: "var(--dark-gray)",
          }}
        >
          Your Cart
        </h1>
        
        {cartItems.length === 0 ? (
          <p style={{ color: "var(--gray)" }}>No items in cart.</p>
        ) : (
          <div>
            {cartItems.map((item, index) => (
              <div
                key={index}
                style={{
                  padding: "15px",
                  borderBottom: "1px solid #e2e8f0",
                  marginBottom: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <div>
                  <h3 style={{ fontSize: "16px", marginBottom: "5px" }}>
                    {item.title}
                  </h3>
                  <p style={{ color: "var(--gray)" }}>${item.price}</p>
                </div>
                
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <button 
                    onClick={() => handleQuantityChange(item, (item.quantity || 1) - 1)}
                    className="btn btn-secondary"
                    style={{ width: "30px", height: "30px", padding: "0" }}
                  >
                    -
                  </button>
                  <span style={{ fontSize: "16px", fontWeight: "500", minWidth: "20px" }}>
                    {item.quantity || 1}
                  </span>
                  <button 
                    onClick={() => handleQuantityChange(item, (item.quantity || 1) + 1)}
                    className="btn btn-secondary"
                    style={{ width: "30px", height: "30px", padding: "0" }}
                  >
                    +
                  </button>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="btn btn-secondary"
                    style={{ 
                      padding: "4px 8px", 
                      fontSize: "12px",
                      color: "var(--error)"
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Cart;
