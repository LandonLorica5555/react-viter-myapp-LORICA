import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/pages/website/home/Home";
import PageNotFound from "./components/partials/PageNotFound";
import DashboardHome from "./components/pages/developer/home/DashboardHome";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<PageNotFound />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/dashboard" element={<DashboardHome />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
