// Not used imports should be removed, the order are also not good (CSS file should be at the bottom)
import React from 'react';
import logo from '../../logo.svg';
import './App.css';
import MainApp from '../MainApp';
import {
    useSelector,
} from 'react-redux';

function App() {
    const todos = useSelector((state: {list: { todos: any[] }}) => state.list.todos);
  return (
    // Comment on the code should be English, especially for a global company. Even in a 100% Vietnamese environment we use English for nearly everything.
      // туду лист для юзеров:
    <div className="App main">
      <header className="App-header">
        TODO list with users:
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
      </header>
      {/* Unnecessary comment as the component name is self-explanatory */}
        {/* MAIN APP: */}
        <MainApp todos={todos}/>

        <footer className='App-footer'>
              <a
                href="https://example.org"
                target="_blank"
                // Because the className is only `string`, it doesn't need to be wrapped in curly braces
                className={"App-footer-link"}
              >
                All right reserved
              </a>
        </footer>
    </div>
  );
}

export default App;
