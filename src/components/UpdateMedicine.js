import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function UpdateMedicine() {
  const navigate = useNavigate();
  const [medicine, setMedicine] = useState(JSON.parse(localStorage.getItem("medicine_obj")));
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleUpdateMedicine = async () => {
    if (
      medicine.name &&
      medicine.power &&
      medicine.category &&
      medicine.type &&
      medicine.price &&
      medicine.stock
    ) {
      const medDocRef = doc(db, "medicine_inventory", medicine.id);
      await updateDoc(medDocRef, medicine);
      setErrorMsg("");
      setSuccessMsg("Medicine updated Successfully!");
      setTimeout(() => {
        setSuccessMsg("");
        navigate("/inventory");
      }, 1000);
    } else {
      setErrorMsg("Please fill out all the required fields!");
    }
  };

  return (
    <div>
      <h4>Update Medicine</h4>
      <div style={{ width: "60%", margin: "auto" }}>
        <div>
          <label>Medicine Name</label>
          <input
            type="text"
            value={medicine.name}
            onChange={(event) => setMedicine({ ...medicine, name: event.target.value })}
            placeholder="Enter Medicine Name"
          />
        </div>
        <div>
          <label>Medicine Power</label>
          <input
            type="text"
            value={medicine.power}
            onChange={(event) => setMedicine({ ...medicine, power: event.target.value })}
            placeholder="Enter Medicine Power"
          />
        </div>
        <div>
          <label>Medicine Category</label>
          <input
            type="text"
            value={medicine.category}
            onChange={(event) => setMedicine({ ...medicine, category: event.target.value })}
            placeholder="Enter Medicine Category"
          />
        </div>
        <div>
          <label>Medicine Type</label>
          <input
            type="text"
            value={medicine.type}
            onChange={(event) => setMedicine({ ...medicine, type: event.target.value })}
            placeholder="Enter Medicine Type"
          />
        </div>
        <div>
          <label>Medicine Price (in ₹.)</label>
          <input
            type="text"
            value={medicine.price}
            onChange={(event) => setMedicine({ ...medicine, price: event.target.value })}
            placeholder="Enter Medicine Price"
          />
        </div>
        <div>
          <label>Stock</label>
          <input
            type="text"
            value={medicine.stock}
            onChange={(event) => setMedicine({ ...medicine, stock: event.target.value })}
            placeholder="Enter Stock"
          />
        </div>
        <div>{errorMsg}</div>
        <div>{successMsg}</div>
        <button onClick={handleUpdateMedicine}>
          Update Medicine
        </button>
        <Link to="/inventory">
          Go Back
        </Link>
      </div>
    </div>
  );
}
