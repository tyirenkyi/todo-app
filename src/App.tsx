import React, { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';

import './App.css';
import ToDo from "./ToDo";
import ListItem from "./components/list-item";

function App() {
  const [newTodo, setNewTodo] = useState <string>('');
  const [all, setAll] = useState <Array<ToDo>>([]);
  const [active, setActive] = useState <Array<ToDo>>([]);
  const [complete, setComplete] = useState <Array<ToDo>>([]);
  const [activeTab, setActiveTab] = useState <number>(0);

  const changeList = (list: string) => {
    switch (list) {
      case 'all':
        setActiveTab(0);
        break;
      case 'active':
        setActiveTab(1);
        break;
      case 'complete':
        setActiveTab(2);
        break;
      default:
        break;
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(newTodo === "")
      return;
    event.currentTarget.reset();
    setNewTodo("");
    addToDo({text: newTodo, complete: false});
  }

  const addToDo = (todo: ToDo) => {
    setActive([...active, todo]);
    setAll([...all, todo]);
  }

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setNewTodo(event.currentTarget.value);
  }
  
  const testHooks = () => {
    setComplete([{text: 'in', complete: true}]);
  }

  return (
    <div className="App">
      <h1>todos</h1>
      <div className="list-stack">
        <div className="input-box">
          <button onClick={testHooks}>
            <BiChevronDown size={35} color="#616161"/>
          </button>
          <form
            onSubmit={(event) => handleSubmit(event)}
            id="form"
          >
            <input 
              placeholder="What needs to be done?"
              id="todo"
              onChange={(event) => handleChange(event)}
              autoComplete={"off"}
            />
            <button 
              hidden type="submit" 
            />
          </form>
        </div>
        <div className="list-content">
          {[all, active, complete][activeTab].map((item, index) => (
            <ListItem data={item} key={index} />
          ))}
          <div className="list-actions">
            <p className="list-count">100 items left</p>
            <div className="list-tabs">
              <button className="list-tab" onClick={() => changeList('all')}>
                All
              </button>
              <button className="list-tab" onClick={() => changeList('active')}>
                Active
              </button>
              <button className="list-tab" onClick={() => changeList('complete')}>
                Completed
              </button>
            </div>
            <p className="clear-btn">Clear completed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
