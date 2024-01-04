import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import CreateTodo from "./Components/CreateTodo/CreateTodo.tsx";
import SeeAllTodos from "./Components/SeeAllTodos/SeeAllTodos.tsx";
//import FindTodo from "./Components/FindTodo/FindTodo.tsx.old";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLayerGroup,
    //faMagnifyingGlass,
    faSquarePlus,
} from '@fortawesome/free-solid-svg-icons';

function App() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showSeeAllForm, setShowSeeAllForm] = useState(false);
  //const [showFindForm, setShowFindForm] = useState(false);

  const toggleForm = (form: string) => {
      switch (form) {
          case 'create':
              setShowCreateForm(true);
              setShowSeeAllForm(false);
             //setShowFindForm(false);
              break;
          case 'seeAll':
              setShowSeeAllForm(true);
              setShowCreateForm(false);
              //setShowFindForm(false);
              break;
              /*
          case 'find':
              setShowFindForm(true);
              setShowSeeAllForm(false);
              setShowCreateForm(false);
              break;
              */
      }
  };

  return (
    <div>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="todos">
        <div className="aTodo" id="createTodo" onClick={() => toggleForm('create')}>
            <FontAwesomeIcon icon={faSquarePlus} size="2x" title="Create Todo"/>
        </div>
        <div className="aTodo"  id="seeAllTodos" onClick={() => toggleForm('seeAll')}>
            <FontAwesomeIcon icon={faLayerGroup} size="2x" title="See All Todos"/>
        </div>
            {/*
        <div className="aTodo"  id="findTodo" onClick={() => toggleForm('find')}>
            <FontAwesomeIcon icon={faMagnifyingGlass} size="2x" title="Find a Todo"/>
        </div>
            */}
      </div>
      {showCreateForm && <CreateTodo/>}
      {showSeeAllForm && <SeeAllTodos/>}
        {/*{showFindForm && <FindTodo/>} */}
    </div>
  )
}

export default App
