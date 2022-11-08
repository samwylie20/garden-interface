import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/body/home.component";
import PlantLibrary from "./routes/body/plantLibrary.component";
import About from "./routes/body/about.component";
import Section from "./routes/body/section.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        {/* <Route path="/" element={<Navigation />}> */}
        <Route index element={<Home />} />
        {/* <Route path="/plantlibrary" element={<PlantLibrary />} /> */}
        <Route path="/plantlibrary" element={<PlantLibrary />} />
        <Route path="/about" element={<About />} />
        <Route path="/section" element={<Section />} />
      </Route>
    </Routes>
  );
}

export default App;
