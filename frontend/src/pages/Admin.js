import React, { useState,useEffect } from 'react';
import { getContacts } from '../api';
import './Admin.css';
import {
  getGalleryImages,
  uploadGalleryImage,
  deleteGalleryImage,
   // used for admin verification (re-using existing admin check)
} from "../api";

export default function Admin() {
  const [pass, setPass] = useState('');
  const [contacts, setContacts] = useState([]);


   const fetch = async () => {
    try {
      const res = await getContacts(pass);
      setContacts(res.data);
       console.log("CONTACT API RESPONSE:", res.data); 
    } catch (err) {
      console.error(err);
      alert('Failed to fetch. Check admin password.');
    }
  };

  //upload image

   const [images, setImages] = useState([]);
    const [file, setFile] = useState(null);
    const [category, setCategory] = useState("Wedding");
  
    // admin
    const [adminPass, setAdminPass] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
  
    // ui
    const [selectedImage, setSelectedImage] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const [filter, setFilter] = useState("All");
    const [loading, setLoading] = useState(false);

 

    // Load images from backend DB on mount
    useEffect(() => {
      const fetchImages = async () => {
        setLoading(true);
        try {
          const res = await getGalleryImages();
          // Expect res.data = array of {id, image_url, category, created_at}
          setImages(res.data || []);
        } catch (err) {
          console.error("Failed to load gallery images:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchImages();
    }, []);
  
    // admin verify (re-uses getContacts endpoint)
    const handleAdminLogin = async () => {
      try {
        await getContacts(adminPass);
        setIsAdmin(true);
        alert("Admin verified");
      } catch (err) {
        console.error(err);
        alert("Wrong admin password");
      }
    };
  
    // upload -> POST to backend which stores file and inserts DB row
    const handleUpload = async (e) => {
      e.preventDefault();
      if (!file) return alert("Select an image");
      const fd = new FormData();
      fd.append("image", file);
      fd.append("category", category);
  
      try {
        const res = await uploadGalleryImage(fd);
        // backend returns inserted row or at least { url, category } — adapt:
        // if backend returns { id, image_url, category, created_at } push that.
        const newItem =
          res.data && res.data.id
            ? { id: res.data.id, image_url: res.data.image_url, category: res.data.category, created_at: res.data.created_at }
            : { id: Date.now(), image_url: res.data.url || res.data.image_url || "", category: res.data.category || category };
        setImages((p) => [newItem, ...p]);
        setFile(null);
      } catch (err) {
        console.error(err);
        alert("Upload failed");
      }
    };
  
    // delete image (admin only)
    const handleDelete = async (id) => {
      if (!window.confirm("Delete this image?")) return;
      try {
        await deleteGalleryImage(id);
        setImages((p) => p.filter((img) => img.id !== id));
      } catch (err) {
        console.error(err);
        alert("Delete failed");
      }
    };
  
    // filtering & visible set
    const filtered = filter === "All" ? images : images.filter((i) => (i.category || i.category === "") ? i.category === filter : true);
    const visibleImages = showAll ? filtered : filtered.slice(0, 6);

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin Dashboard – Contacts</h2>

      <div className="admin-login">
        <input
          type="password"
          placeholder="🔐 Admin password"
          value={pass}
          onChange={e => setPass(e.target.value)}
        />
        <button onClick={fetch}>Load Contacts</button>
      </div>

      <div className="admin-table-wrapper">
        {contacts.length === 0 ? (
          <p className="no-data">No contacts loaded</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Service</th>
                <th>Message</th>
                <th>Event Date</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(c => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.phone}</td>
                  <td>{c.email}</td>
                  <td>{c.serviceType}</td>
                  <td>{c.message}</td>
                  <td>{c.event_date}</td>
                  <td>{c.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

       {/* Admin login */}
      {!isAdmin && (
        <div className="admin-login-box">
          <input
            type="password"
            placeholder="Admin password"
            value={adminPass}
            onChange={(e) => setAdminPass(e.target.value)}
          />
          <button onClick={handleAdminLogin}>Verify Admin</button>
        </div>
      )}

        {/* Upload UI (admin only) */}
      {isAdmin && (
        <form className="upload-form" onSubmit={handleUpload}>
          <label className="upload-label">
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
            Choose Image
          </label>

          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Wedding</option>
            <option>Birthday</option>
            <option>Corporate</option>
            <option>Anniversary</option>
            <option>Other</option>
          </select>

          <button type="submit" className="upload-btn">Upload</button>
        </form>
      )}

      {/* Filters */}
      <div className="filter-buttons">
        {["All", "Wedding", "Birthday", "Corporate", "Anniversary", "Other"].map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${filter === cat ? "active" : ""}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? <p>Loading images...</p> : null}

      {/* Grid */}
<div className="gallery-grid">
  {visibleImages.map((img) => {
    const newImgUrl = img.image_url || img.url || img.imageUrl
      ? `https://rbr-events-ofdj.vercel.app${img.image_url || img.url || img.imageUrl}`
      : "";

    return (
      <div className="gallery-card" key={img.id || img.image_url}>
        <img
          src={newImgUrl}
          alt={img.category || "event"}
          onClick={() => setSelectedImage(newImgUrl)}
        />

        {isAdmin && img.id && (
          <button
            className="delete-btn"
            onClick={() => handleDelete(img.id)}
          >
            ✕
          </button>
        )}
      </div>
    );
  })}
</div>


      {/* Show more */}
      {filtered.length > 6 && (
        <div className="show-more-box">
          <button className="show-more-btn" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show Less ▲" : `Show More ▼ (${filtered.length - 6} more)`}
          </button>
        </div>
      )}

      {/* Lightbox */}
      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="preview" />
            <button className="close-btn" onClick={() => setSelectedImage(null)}>✕</button>
          </div>
        </div>
      )}
    </div>
  );
}
