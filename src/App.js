import {
  BrowserRouter as Router,
  Route,
  HashRouter,
  Routes,
} from "react-router-dom";
import "./App.css";
import Admin from "./pages/admin/admin";

function App() {
  return (
    <Admin />
    // <Router>
    //   <Routes>
    //     <Route exact path="/" element={}></Route>
    //   </Routes>
    // </Router>
  );
}

export default App;
