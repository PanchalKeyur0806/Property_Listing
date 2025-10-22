import { BrowserRouter, Outlet } from "react-router-dom";
import ListProperties from "./components/ListProperties";

function App() {
  return (
    <>
      <BrowserRouter>
        <ListProperties />
      </BrowserRouter>
    </>
  );
}

export default App;
