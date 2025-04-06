import Editor from './components/editor.jsx';
import './App.css';
import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom"

import {v4 as uuid} from "uuid";

function App() {
  return <Router>
            <Routes>
               <Route path="/"element={<Navigate replace to={`/docs/${uuid()}`} />}></Route>
               <Route path="/docs/:id"element={<Editor/>}></Route>
            </Routes>
         </Router>

}

export default App;
