import React, { useState } from "react";
import { VscCheck, VscClose } from "react-icons/vsc";

import "../styles/list-item.css";

function ListItem() {
  const [complete, setComplete] = useState(false);

  const toggleComplete = () => {
    setComplete(!complete);
  }

  return (
    <div className={`list-item-container ${complete && "complete"}`}>
      <button className={`checkmark ${complete && "checked"}`} onClick={toggleComplete}>
        <VscCheck color="#1DE9B6" size={20} className='check'/>
      </button>
      <p className="list-text">Buy shoes</p>
      <button className="delete-btn">
        <VscClose size={25} />
      </button>
    </div>
  )
}

export default ListItem;