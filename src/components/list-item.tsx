import React from "react";
import { VscCheck, VscClose } from "react-icons/vsc";

import "../styles/list-item.css";
import ToDo from "../ToDo";

function ListItem(props: {data: ToDo, toggleStatus: Function}): JSX.Element {
  return (
    <div className={`list-item-container ${props.data.complete && "complete"}`}>
      <button 
        className={`checkmark ${props.data.complete && "checked"}`}
        onClick={() => props.toggleStatus(props.data)}
      >
        <VscCheck color="#1DE9B6" size={20} className='check'/>
      </button>
      <p className="list-text">{props.data.text}</p>
      <button className="delete-btn">
        <VscClose size={24} />
      </button>
    </div>
  )
}

export default ListItem;