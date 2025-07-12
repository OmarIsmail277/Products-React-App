import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { useCart } from "../contexts/useCart";

function ProductCard({ product }) {
  const { addToCart, getItemQuantity, updateQuantity } = useCart();
  const cartQuantity = getItemQuantity(product.id);

  const getStars = () => {
    const rating = product.rating || 0;
    const maxStars = 5;
    const filledStars = Math.round(rating);
    const stars = [];
    for (let i = 0; i < maxStars; i++) {
      stars.push(i < filledStars ? solidStar : regularStar);
    }
    return stars;
  };

  const increment = () => {
    if (cartQuantity === 0) {
      addToCart(product, 1);
    } else {
      updateQuantity(product.id, cartQuantity + 1);
    }
  };

  const decrement = () => {
    if (cartQuantity > 0) {
      updateQuantity(product.id, cartQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  return (
    <div className="card" style={{ 
      padding: "16px", 
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      height: "100%"
    }}>
      <img
        src={product.thumbnail}
        alt={product.title}
        style={{ 
          width: "100%", 
          height: "180px", 
          objectFit: "cover",
          borderRadius: "6px",
          marginBottom: "12px"
        }}
      />
      <h3 style={{ 
        fontSize: "16px", 
        fontWeight: "600", 
        marginBottom: "8px",
        color: "var(--dark-gray)"
      }}>
        {product.title}
      </h3>
      <p style={{ 
        fontSize: "14px", 
        color: "var(--gray)", 
        marginBottom: "12px",
        lineHeight: "1.4",
        flex: "1"
      }}>
        {product.description}
      </p>
      <p style={{ 
        fontSize: "18px", 
        fontWeight: "600", 
        color: "var(--primary-blue)",
        marginBottom: "8px"
      }}>
        ${product.price}
      </p>

      <div style={{ marginBottom: "12px", color: "#fbbf24" }}>
        {getStars().map((icon, index) => (
          <FontAwesomeIcon key={index} icon={icon} />
        ))}
      </div>

      {/* Stock Info */}
      <div style={{
        fontSize: "0.875rem",
        color: product.stock > 10 ? "var(--success)" : "var(--warning)",
        marginBottom: "12px",
        fontWeight: "600"
      }}>
        {product.stock > 10 ? "In Stock" : `Only ${product.stock} left`}
      </div>

      {/* Quantity Controls */}
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        gap: "8px",
        marginBottom: "12px"
      }}>
        <button
          onClick={decrement}
          className="btn btn-secondary"
          style={{
            width: "32px",
            height: "32px",
            padding: "0",
            borderRadius: "50%",
            fontSize: "1.25rem",
            opacity: cartQuantity === 0 ? "0.5" : "1"
          }}
          disabled={cartQuantity === 0}
        >
          -
        </button>
        
        <span style={{
          fontSize: "1.125rem",
          fontWeight: "600",
          color: "var(--gray-700)",
          minWidth: "30px"
        }}>
          {cartQuantity}
        </span>
        
        <button
          onClick={increment}
          className="btn btn-secondary"
          style={{
            width: "32px",
            height: "32px",
            padding: "0",
            borderRadius: "50%",
            fontSize: "1.25rem"
          }}
        >
          +
        </button>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="btn btn-primary"
        style={{
          width: "100%",
          padding: "var(--space-md)",
          fontSize: "1rem",
          fontWeight: "700"
        }}
      >
        {cartQuantity > 0 ? `Add More (${cartQuantity} in cart)` : "🛒 Add to Cart"}
      </button>
    </div>
  );
}

export default ProductCard;
