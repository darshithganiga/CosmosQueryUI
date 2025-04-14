import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConnectionPage from "./UIPage/CosmosQueryUI";
import "react-bootstrap";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ConnectionPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
