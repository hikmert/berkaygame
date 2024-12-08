import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Playground } from "./pages/Playground/Playground";
import { UserProfile } from "./pages/UserProfile/UserProfile";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<div>Not Found</div>} />
          <Route path="playground" element={<Playground />} />
          <Route path="userProfile" element={<UserProfile />} />
        </Route>
      </Routes>
    </Router>
  );
};
