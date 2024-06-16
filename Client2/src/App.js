import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Home from "./components/Home.js";

import "bootstrap/dist/css/bootstrap.css";
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

// import pages
import Register from "./pages/Register.js";
import Secrets from "./pages/Secrets.js";
import AccountPage from "./pages/AccountPage.js";

// import layouts
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar />}>
      <Route index element={<Home />} />
      <Route path="register" element={<Register />} />
      <Route path="secrets" element={<Secrets />} />
      <Route path="/signin" element={<Home />} />
      <Route path="/posts" element={<AccountPage />} />
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
