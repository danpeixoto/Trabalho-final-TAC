import React, { useState, useEffect } from "react";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

const AdminProduct = ({ id, updateStates }) => {
  useEffect(() => {
    if (id) {
      requestProduct();
    }
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    total_available: 0,
    value: 0.0,
  });

  const requestProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/product/search-one/${id}`,
      );
      const { name, category, description, total_available, value } = res.data;
      setFormData({ name, category, description, total_available, value });
    } catch (err) {
      updateStates(false, false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(formData);
    try {
      if (id) {
        await axios.put(`http://localhost:4000/product/${id}`, body, config);
      } else {
        await axios.post("http://localhost:4000/product", body, config);
      }
      updateStates(false, false);
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { name, category, description, total_available, value } = formData;

  return (
    <form className="admin__form" onSubmit={(e) => onSubmit(e)}>
      <label htmlFor="name">Nome:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={(e) => onChange(e)}
      />
      <label htmlFor="category">Categoria:</label>
      <input
        type="text"
        id="category"
        name="category"
        value={category}
        onChange={(e) => onChange(e)}
      />
      <label htmlFor="category">Descrição:</label>
      <input
        type="text"
        id="description"
        name="description"
        value={description}
        onChange={(e) => onChange(e)}
      />
      <label htmlFor="total_available">Total disponível:</label>
      <input
        type="number"
        name="total_available"
        id="total_available"
        min="0"
        value={total_available}
        onChange={(e) => onChange(e)}
      />
      <label htmlFor="name">Valor:</label>
      <input
        type="text"
        name="value"
        id="value"
        value={value}
        onChange={(e) => onChange(e)}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};

export default AdminProduct;
