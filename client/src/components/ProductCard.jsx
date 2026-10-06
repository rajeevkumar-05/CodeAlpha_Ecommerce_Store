import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="card">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} className="card-img" />
      </Link>
      <div className="card-body">
        <span className="card-category">{product.category}</span>
        <Link to={`/product/${product._id}`} className="card-title">
          {product.name}
        </Link>
        <div className="card-footer">
          <span className="price">${product.price.toFixed(2)}</span>
          <button
            className="btn btn-sm"
            disabled={product.stock === 0}
            onClick={() => addToCart(product)}
          >
            {product.stock === 0 ? "Out of stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
