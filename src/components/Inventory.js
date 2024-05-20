import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";

export default function Inventory() {
  const [medicines, setMedicines] = useState([]);

  const medicinesCollectionRef = collection(db, "medicine_inventory");

  const getTypes = async () => {
    const data = await getDocs(medicinesCollectionRef);
    setMedicines(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleDeleteButton = async (id) => {
    const medDoc = doc(medicinesCollectionRef, id);
    await deleteDoc(medDoc);
    getTypes();
  };

  useEffect(() => {
    getTypes();
  }, []);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h4>Medicine Inventory</h4>
        <table style={{ margin: "auto", border: "1px solid black", borderCollapse: "collapse", width: "80%" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Medicine Name</th>
              <th>Medicine Category</th>
              <th>Medicine Type</th>
              <th>Medicine Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine, index) => (
              <tr key={medicine.id}>
                <td>{index + 1}</td>
                <td>{medicine.name}</td>
                <td>{medicine.category}</td>
                <td>{medicine.type}</td>
                <td>₹{medicine.price}</td>
                <td>{medicine.stock}</td>
                <td>
                  <Link to="/updatemedicine">
                    <button
                      type="button"
                      style={{ marginRight: "5px" }}
                      onClick={() => {
                        localStorage.setItem("medicine_obj", JSON.stringify(medicine));
                      }}
                    >
                      Edit
                    </button>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      handleDeleteButton(medicine.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <Link to="/addmedicine">Add new Medicine</Link>
        </div>
      </div>
    </>
  );
}
