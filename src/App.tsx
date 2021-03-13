import React, { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { v4 as uuidv4 } from 'uuid';

import './App.css';
import ToDo, { ToDoClass } from "./ToDo";
import ListItem from "./components/list-item";

function App() {
  const [newTodo, setNewTodo] = useState <string>('');
  const [all, setAll] = useState <Array<ToDo>>([]);
  const [active, setActive] = useState <Array<ToDo>>([]);
  const [complete, setComplete] = useState <Array<ToDo>>([]);
  const [activeTab, setActiveTab] = useState <number>(0);
  const [toggled, setToggled] = useState <boolean>(false);

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
    addToDo({id: uuidv4(), text: newTodo, complete: false});
  }

  const addToDo = (todo: ToDo) => {
    setActive([...active, todo]);
    setAll([...all, todo]);
  }


  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setNewTodo(event.currentTarget.value);
  }

  const toggleToDoStatus = (todo: ToDo) => {
    if(todo.complete) {
      const index = complete.findIndex((element) => element.id === todo.id);
      const newComplete = [...complete.slice(0, index), ...complete.slice(index + 1)];
      setComplete(newComplete);
      todo.complete = false;
      setActive([...active, todo]);
      const newAll = [...all];
      newAll.forEach((element) => {
        if(element.id === todo.id)
          element.complete = false;
      })
      setAll([...newAll]);
    } else {
      const activeIndex = active.findIndex((element) => element.id === todo.id);
      const allIndex = all.findIndex((element) => element.id === todo.id);
      const newActive = [...active.slice(0, activeIndex), ...active.slice(activeIndex + 1)];
      setActive(newActive);
      todo.complete = true;
      const newAll = [...all.splice(0, allIndex), todo, ...all.slice(allIndex + 1)];
      setAll(newAll);
      setComplete([...complete, todo]);
    }
  }

  const toggleAllToDos = () => {
    if(toggled) {
      const newList = all.map((element) => new ToDoClass(element.id, element.text, false));
      setActive([...newList]);
      setAll([...newList]);
      setComplete([]);
    } else {
      const newList = all.map((element) => new ToDoClass(element.id, element.text, true));
      setComplete([...newList]);
      setAll([...newList]);
      setActive([]);
    }

    setToggled(!toggled);
  }

  const deleteToDo = (todo: ToDo) => {
    if(todo.complete) {
      const allIndex = all.findIndex((element) => element.id ===  todo.id);
      const completeIndex = complete.findIndex((element) => element.id === todo.id);
      setAll([...all.splice(0, allIndex), ...all.slice(allIndex + 1)]);
      setComplete([...complete.slice(0, completeIndex), ...complete.slice(completeIndex + 1)])
    } else {
      const allIndex = all.findIndex((element) => element.id ===  todo.id);
      const activeIndex = active.findIndex((element) => element.id === todo.id);
      setAll([...all.splice(0, allIndex), ...all.slice(allIndex + 1)]);
      setActive([...active.splice(0, activeIndex), ...active.slice(activeIndex + 1)]);
    }
  }

  const deleteCompleted = () => {
    const newList = [...all].filter((element) => element.complete === false);
    setAll([...newList]);
    setComplete([]);
  }

  return (
    <div className="App">
      <h1>todos</h1>
      <div className="list-stack">
        <div className="input-box">
          <button onClick={toggleAllToDos}>
            <BiChevronDown size={35} color={ toggled ? "#616161" : "#E0E0E0"}/>
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
            <ListItem data={item} key={index} toggleStatus={toggleToDoStatus} deleteToDo={deleteToDo}/>
          ))}
          <div className="list-actions">
            <p className="list-count">100 items left</p>
            <div className="list-tabs">
              <button 
                className={`list-tab ${activeTab === 0 && 'active-tab'}`}
                onClick={() => changeList('all')}
              >
                All
              </button>
              <button 
                className={`list-tab ${activeTab === 1 && 'active-tab'}`}
                onClick={() => changeList('active')}
              >
                Active
              </button>
              <button 
                className={`list-tab ${activeTab === 2 && 'active-tab'}`}
                onClick={() => changeList('complete')}
              >
                Completed
              </button>
            </div>
            <p className="clear-btn" onClick={deleteCompleted}>Clear completed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
