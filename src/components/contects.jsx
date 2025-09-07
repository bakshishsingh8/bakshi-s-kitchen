import { useState } from "react";
import "../style/contects.css";

function Contects() {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  return (
    <div className="contectssssss">
      <h2>Choose an Option</h2>
      <select value={selectedValue} onChange={handleChange} className="dropdown">
        <option value="">-- Select --</option>
        <option value="call">Call</option>
        <option value="email">Email</option>
        <option value="chat">Chat</option>
      </select>

      {selectedValue && (
        <p className="selected-text">You selected: {selectedValue}</p>
      )}
    </div>
  );
}

export default Contects;
