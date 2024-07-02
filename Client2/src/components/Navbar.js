import { NavLink, Outlet } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="root-layout">
      <header>
        <nav>
          <h1>Blogell &copy;</h1>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/posts">Blogs </NavLink>
          <NavLink to="/signin">Sign In</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      
    </div>
  );
}
