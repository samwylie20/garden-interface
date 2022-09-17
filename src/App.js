import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation.component";
import NavigationDaisy from "./routes/navigation/navigation-daisy.component";

import Home from "./routes/home/home.component";
import PlantLibrary from "./components/plantLibrary.component";
import PlantLibraryDaisy from "./components/plantLibraryDaisy.component";

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<NavigationDaisy />}> */}
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/plantlibrary" element={<PlantLibrary />} />
        {/* <Route path="/plantlibrary" element={<PlantLibraryDaisy />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
