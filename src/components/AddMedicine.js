import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

export default function AddMedicine() {
  const navigate = useNavigate();
  const [medicine, setMedicine] = useState({
    name: "",
    power: "",
    category: "",
    type: "",
    price: "",
    stock: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleAddMedicine = async () => {
    if (
      medicine.name &&
      medicine.power &&
      medicine.category &&
      medicine.type &&
      medicine.price &&
      medicine.stock
    ) {
      setErrorMsg("");
      const medicinesCollectionRef = collection(db, "medicine_inventory");
      await addDoc(medicinesCollectionRef, medicine);
      setSuccessMsg("Medicine added successfully!");
      setTimeout(() => {
        setSuccessMsg("");
        navigate("/inventory");
      }, 1000);
    } else {
      setErrorMsg("Please fill out all the required fields!");
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const storageRef = ref(storage, 'bills/' + file.name);
    try {
      await uploadBytes(storageRef, file);
      console.log('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file: ', error);
    }
  };

  return (
    <>
      <div>
        <h4>Add Medicine</h4>
        <div>
          <div>
            <div>
              <label>Medicine Name</label>
              <input
                type="text"
                value={medicine.name}
                onChange={(event) => setMedicine((prev) => ({ ...prev, name: event.target.value }))}
                placeholder="Enter Medicine Name"
              />
            </div>
            <div>
              <label>Medicine Power</label>
              <input
                type="text"
                value={medicine.power}
                onChange={(event) => setMedicine((prev) => ({ ...prev, power: event.target.value }))}
                placeholder="Enter Medicine Power"
              />
            </div>
            <div>
              <label>Medicine Category</label>
              <input
                type="text"
                value={medicine.category}
                onChange={(event) => setMedicine((prev) => ({ ...prev, category: event.target.value }))}
                placeholder="Enter Medicine Category"
              />
            </div>
            <div>
              <label>Medicine Type</label>
              <input
                type="text"
                value={medicine.type}
                onChange={(event) => setMedicine((prev) => ({ ...prev, type: event.target.value }))}
                placeholder="Enter Medicine Type"
              />
            </div>
            <div>
              <label>Medicine Price (in ₹.)</label>
              <input
                type="text"
                value={medicine.price}
                onChange={(event) => setMedicine((prev) => ({ ...prev, price: event.target.value }))}
                placeholder="Enter Medicine Price"
              />
            </div>
            <div>
              <label>Medicine Stock</label>
              <input
                type="text"
                value={medicine.stock}
                onChange={(event) => setMedicine((prev) => ({ ...prev, stock: event.target.value }))}
                placeholder="Enter Medicine Stock"
              />
            </div>
            <div>
              <label>Upload Bill (PDF/Image)</label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
              />
            </div>
            <div>{errorMsg}</div>
            <div>{successMsg}</div>
            <button onClick={handleAddMedicine}>Add Medicine</button>
            <Link to="/inventory">
              Go Back
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
