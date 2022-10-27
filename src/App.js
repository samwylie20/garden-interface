import { Routes, Route } from "react-router-dom";
// import Navigation from "./routes/navigation/navigation.component";
import NavigationDaisy from "./routes/navigation/navigation-daisy.component";
import Home from "./routes/home/home.component";
// import PlantLibrary from "./components/plantLibrary.component";
import PlantLibraryDaisy from "./components/plantLibraryDaisy.component";
import About from "./routes/about/about.component";
import Section from "./routes/home/section.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavigationDaisy />}>
        {/* <Route path="/" element={<Navigation />}> */}
        <Route index element={<Home />} />
        {/* <Route path="/plantlibrary" element={<PlantLibrary />} /> */}
        <Route path="/plantlibrary" element={<PlantLibraryDaisy />} />
        <Route path="/about" element={<About />} />
        <Route path="/section" element={<Section />} />
      </Route>
    </Routes>
  );
}

export default App;
