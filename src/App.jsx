import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/pages/website/home/Home";
import PageNotFound from "./components/partials/PageNotFound";
import DashboardHome from "./components/pages/developer/home/DashboardHome";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="*" element={<PageNotFound />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/dashboard" element={<DashboardHome />}></Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
