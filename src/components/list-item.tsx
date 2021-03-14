import React, { useState } from "react";
import { VscCheck, VscClose } from "react-icons/vsc";

import "../styles/list-item.css";
import ToDo from "../ToDo";

function ListItem(props: {
    data: ToDo, 
    toggleStatus: Function, 
    deleteToDo: Function,
    editing: boolean,
    submitEdit: Function,
    toggleEditing: Function
  }): JSX.Element {

  const [todo, setTodo] = useState <string>(props.data.text);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTodo(event.currentTarget.value);
  }

  return (
    <div className={`list-item-container ${props.data.complete && "complete"} ${props.editing && "editing-mode"}`}>
      {!props.editing ? (
        <button 
          className={`checkmark ${props.data.complete && "checked"}`}
          onClick={() => props.toggleStatus(props.data)}
        >
          <VscCheck color="#1DE9B6" size={20} className='check'/>
        </button>
      ): (
        <div className="empty-space" onClick={() => props.toggleEditing()}></div>
      )}
      {props.editing ? (
        <form
          onSubmit={handleSubmit}
        >
          <input 
            id="form"
            type="text" 
            onChange={(event) => handleChange(event)} 
            autoComplete="off" 
            className="list-item-input" 
            value={todo}
            onBlur={() => props.toggleEditing()}
          />
        </form>
      ) : (
        <p className="list-text" onDoubleClick={() => props.toggleEditing()}>{props.data.text}</p>
      )}
      {!props.editing && (
        <button 
          className="delete-btn"
          onClick={() => props.deleteToDo(props.data)}
        >
          <VscClose size={24} />
        </button>
      )}
    </div>
  )
}

export default ListItem;