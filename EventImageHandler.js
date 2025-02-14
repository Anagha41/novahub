import { useState, useEffect } from "react";
import axios from "axios";

const EventImageHandler = ({ eventId }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(null);
  
  useEffect(() => {
    console.log("Received eventId:", eventId); // Debugging line
    if (eventId) fetchImages();
  }, [eventId]);
  
  const fetchImages = async () => {
    if (!eventId) return; // Prevent API call if eventId is undefined

    try {
      const response = await axios.get(`http://localhost:8080/api/image/event/${eventId}`);
      setImages(response.data);
      setError(""); // Clear previous errors
    } catch (err) {
      setError("Failed to load images.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Show preview before uploading
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select an image.");
      return;
    }
    if (!eventId) {
      console.log("Event ID is invalid:", eventId);  // Log eventId to check its value

      setError("Invalid event. Please try again.");
      return;
    }


    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setUploading(true);
      setError("");
      await axios.post(`http://localhost:8080/api/image/upload/${eventId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Image uploaded successfully!");
      setSelectedFile(null);
      setPreview(null);
      fetchImages(); // Refresh images after upload
    } catch (err) {
      setError("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Event Images</h2>

      {/* Upload Section */}
      <div className="mb-4 flex flex-col items-center">
        <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2" />
        {preview && (
          <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded mb-2" />
        )}
        <button
          onClick={handleUpload}
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
            uploading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {/* Image Gallery */}
      {loading ? (
        <p className="text-center">Loading images...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {images.map((image) => (
            <img
              key={image.id}
              src={image.imageUrl}
              alt="Event"
              className="w-full h-32 object-cover rounded shadow-md transition-transform transform hover:scale-105"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventImageHandler;
