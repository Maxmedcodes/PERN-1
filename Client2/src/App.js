import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useParams,
} from "react-router-dom";

import Home from "./components/Home.js";

import "bootstrap/dist/css/bootstrap.css";
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

// import pages
import Register from "./pages/Register.js";
import Secrets from "./pages/Secrets.js";
import Posts from "./pages/Posts.js";
import SignIn from "./pages/SignIn.js";
import Edit from "./pages/Edit.js";

// import layouts
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar />}>
      <Route index element={<Home />} />
      <Route path="register" element={<Register />} />
      <Route path="secrets" element={<Secrets />} />
      <Route path="/home" element={<Home />} />
      <Route path="signin" element={<SignIn/>}/>
      <Route path="/posts" element={<Posts />} />
      <Route path="edit/:id" element={<Edit/>}/>
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
