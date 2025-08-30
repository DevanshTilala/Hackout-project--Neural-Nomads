import React, { useState } from "react";
import axios from "axios";

function Report() {
  const [form, setForm] = useState({
    userId: "",
    lat: "",
    lng: "",
    category: "",
    description: ""
  });
  const [photo, setPhoto] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let photoUrl = "";
    if (photo) {
      const formData = new FormData();
      formData.append("photo", photo);
      const uploadRes = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      photoUrl = uploadRes.data.photoUrl;
    }

    await axios.post("http://localhost:5000/api/reports", { ...form, photoUrl });
    alert("Report submitted!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submit Report</h2>
      <input name="userId" placeholder="User ID" onChange={handleChange} />
      <input name="lat" placeholder="Latitude" onChange={handleChange} />
      <input name="lng" placeholder="Longitude" onChange={handleChange} />
      <input name="category" placeholder="Category" onChange={handleChange} />
      <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>

      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button type="submit">Submit Report</button>
    </form>
  );
}

export default Report;
