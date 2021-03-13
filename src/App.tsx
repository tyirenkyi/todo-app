import React, { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';

import './App.css';
import ListItem from "./components/list-item";

function App() {
  const [all, setAll] = useState <Array<any>>(['in']);
  const [active, setActive] = useState <Array<any>>(['in', 'yo']);
  const [complete, setComplete] = useState <Array<any>>(['in', 'yo']);
  const [activeList, setActiveList] = useState <Array<any>>([all]);

  const changeList = (list: string) => {
    switch (list) {
      case 'all':
        setActiveList(all);
        break;
      case 'active':
        setActiveList(active);
        break;
      case 'complete':
        setActiveList(complete);
        break;
      default:
        break;
    }
  }

  return (
    <div className="App">
      <h1>todos</h1>
      <div className="list-stack">
        <div className="input-box">
          <button>
            <BiChevronDown size={35} color="#616161"/>
          </button>
          <input 
            placeholder="What needs to be done?"
          />
        </div>
        <div className="list-content">
          {activeList.map((item, index) => (
            <ListItem />
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
