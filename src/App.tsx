import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "@/Layout";
import Home from "@/pages/Home";
import NoteDetail from "@/pages/NoteDetail";
import Signup from "@/pages/Signup";
import Signin from "@/pages/Signin";
import { useEffect, useState } from "react";
import { useCurrentUserStore } from "./lib/jotai/current-user.state";
import { supabase } from "./lib/supabase";
import LoaderPage from "./pages/LoaderPage";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const currentUserStore = useCurrentUserStore();

  useEffect(() => {
    async function setSession() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error(error.message);
          return;
        }
        if (data.session) {
          currentUserStore.set(data.session.user);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    setSession();
  }, []);
  if (isLoading) return <LoaderPage />;
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
