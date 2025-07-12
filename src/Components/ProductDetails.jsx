import { useLocation, useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { useCart } from "../contexts/useCart";
import Navbar from "./Navbar";
import Footer from "./Footer";

function ProductDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = location.state?.product;

  const { quantity, setQuantity } = useCart();

  const getStars = () => {
    const rating = product?.rating || 0;
    const maxStars = 5;
    const filledStars = Math.round(rating);
    const stars = [];
    for (let i = 0; i < maxStars; i++) {
      stars.push(i < filledStars ? solidStar : regularStar);
    }
    return stars;
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  if (!product) {
    return (
      <>
        <Navbar />
        <div
          className="container"
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "var(--gray)",
          }}
        >
          <h2 style={{ marginBottom: "20px", color: "var(--dark-gray)" }}>
            Product not found
          </h2>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Back to Products
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container" style={{ padding: "20px 0" }}>
        {/* Back Button */}
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/")}
          style={{
            marginBottom: "30px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          ← Back to Products
        </button>

        {/* Product Details Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "40px",
            alignItems: "start",
          }}
        >
          {/* Product Image */}
          <div
            className="card"
            style={{
              padding: "20px",
              textAlign: "center",
            }}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{
                width: "100%",
                maxWidth: "400px",
                borderRadius: "8px",
              }}
            />
          </div>

          {/* Product Information */}
          <div style={{ padding: "20px 0" }}>
            <h1
              style={{
                fontSize: "28px",
                fontWeight: "700",
                marginBottom: "16px",
                color: "var(--dark-gray)",
                lineHeight: "1.3",
              }}
            >
              {product.title}
            </h1>

            <p
              style={{
                fontSize: "16px",
                color: "var(--gray)",
                marginBottom: "24px",
                lineHeight: "1.6",
              }}
            >
              {product.description}
            </p>

            {/* Price */}
            <div
              style={{
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span
                style={{
                  fontSize: "32px",
                  fontWeight: "700",
                  color: "var(--primary-blue)",
                }}
              >
                ${product.price}
              </span>
              {product.discountPercentage && (
                <span
                  style={{
                    fontSize: "18px",
                    color: "var(--gray)",
                    textDecoration: "line-through",
                  }}
                >
                  $
                  {(
                    product.price /
                    (1 - product.discountPercentage / 100)
                  ).toFixed(2)}
                </span>
              )}
            </div>

            {/* Rating */}
            <div
              style={{
                marginBottom: "24px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div style={{ color: "#fbbf24" }}>
                {getStars().map((icon, index) => (
                  <FontAwesomeIcon
                    key={index}
                    icon={icon}
                    style={{ fontSize: "18px" }}
                  />
                ))}
              </div>
              <span
                style={{
                  color: "var(--gray)",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                ({product.rating}/5)
              </span>
            </div>

            {/* Product Info */}
            <div
              className="card"
              style={{
                padding: "20px",
                marginBottom: "24px",
              }}
            >
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "16px",
                  color: "var(--dark-gray)",
                }}
              >
                Product Information
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}
              >
                <div>
                  <span
                    style={{
                      fontWeight: "600",
                      color: "var(--gray)",
                    }}
                  >
                    Brand:
                  </span>
                  <span style={{ marginLeft: "8px" }}>{product.brand}</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "600",
                      color: "var(--gray)",
                    }}
                  >
                    Category:
                  </span>
                  <span style={{ marginLeft: "8px" }}>{product.category}</span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "600",
                      color: "var(--gray)",
                    }}
                  >
                    Stock:
                  </span>
                  <span
                    style={{
                      marginLeft: "8px",
                      color:
                        product.stock > 10
                          ? "var(--success)"
                          : "var(--warning)",
                    }}
                  >
                    {product.stock} units
                  </span>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "600",
                      color: "var(--gray)",
                    }}
                  >
                    Product ID:
                  </span>
                  <span style={{ marginLeft: "8px" }}>{id}</span>
                </div>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "20px",
              }}
            >
              <span
                style={{
                  fontWeight: "600",
                  color: "var(--dark-gray)",
                }}
              >
                Quantity:
              </span>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="btn btn-secondary"
                style={{ width: "40px", height: "40px", padding: "0" }}
              >
                -
              </button>
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  minWidth: "30px",
                  textAlign: "center",
                }}
              >
                {quantity}
              </span>
              <button
                onClick={() =>
                  setQuantity(Math.min(product.stock, quantity + 1))
                }
                className="btn btn-secondary"
                style={{ width: "40px", height: "40px", padding: "0" }}
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="btn btn-primary"
              style={{
                width: "100%",
                padding: "16px",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              🛒 Add to Cart
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductDetails;
