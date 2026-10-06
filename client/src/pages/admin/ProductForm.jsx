import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios.js";

const empty = {
  name: "",
  description: "",
  price: "",
  image: "",
  category: "",
  stock: "",
};

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    const load = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setForm({
          name: data.name,
          description: data.description,
          price: data.price,
          image: data.image,
          category: data.category,
          stock: data.stock,
        });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load product");
      }
    };
    load();
  }, [id, isEdit]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      };
      if (isEdit) {
        await api.put(`/products/${id}`, payload);
      } else {
        await api.post("/products", payload);
      }
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Save failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card wide">
      <h1>{isEdit ? "Edit Product" : "Add Product"}</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input name="name" value={form.name} onChange={handleChange} required />

        <label>Description</label>
        <textarea
          name="description"
          rows="3"
          value={form.description}
          onChange={handleChange}
          required
        />

        <label>Image URL</label>
        <input name="image" value={form.image} onChange={handleChange} required />

        <label>Category</label>
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        />

        <div className="form-row">
          <div>
            <label>Price</label>
            <input
              type="number"
              step="0.01"
              min="0"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Stock</label>
            <input
              type="number"
              min="0"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button className="btn btn-block" disabled={loading}>
          {loading ? "Saving..." : isEdit ? "Update Product" : "Create Product"}
        </button>
      </form>
    </div>
  );
}
