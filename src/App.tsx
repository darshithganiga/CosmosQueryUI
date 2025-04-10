import "./App.css";
import CosmosQueryUI from "./UIPage/CosmosQueryUI";
import "react-bootstrap";

function App() {
  return (
    <>
      <div className="p-4">
        <h2 className="mb-4">CosmoBridge</h2>
        <CosmosQueryUI />
      </div>
    </>
  );
}

export default App;
