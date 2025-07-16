// import { useCart } from "../contexts/useCart";
import { useAuth } from "../contexts/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  // const { cartItems } = useCart();
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log(cartItems);

  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1 onClick={() => navigate("/")}>ProductsHub</h1>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Link className="cart" to="/cart">
          🛒 Cart ({cartItems.length})
        </Link>

        {isAuthenticated ? (
          <>
            <span
              style={{
                color: "var(--primary-blue)",
                fontWeight: "500",
                fontSize: "14px",
              }}
            >
              Welcome, {user.username}!
            </span>
            <button
              onClick={handleLogout}
              className="btn btn-secondary"
              style={{
                padding: "6px 12px",
                fontSize: "14px",
                color: "var(--error)",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{
                color: "var(--primary-blue)",
                textDecoration: "none",
                fontWeight: 500,
                padding: "8px 12px",
                borderRadius: 6,
                transition: "background 0.2s",
              }}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{
                color: "var(--primary-blue)",
                textDecoration: "none",
                fontWeight: 500,
                padding: "8px 12px",
                borderRadius: 6,
                transition: "background 0.2s",
              }}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
