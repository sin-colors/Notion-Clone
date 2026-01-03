import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "@/Layout";
import Home from "@/pages/Home";
import NoteDetail from "@/pages/NoteDetail";
import Signup from "@/pages/Signup";
import Signin from "@/pages/Signin";

function App() {
  return (
    <BrowserRouter>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/notes/:id" element={<NoteDetail />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
