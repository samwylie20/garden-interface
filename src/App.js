import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import PlantLibrary from "./components/plantLibrary.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/plantlibrary" element={<PlantLibrary />} />
      </Route>
    </Routes>
  );
}

export default App;
