import { NavLink, Outlet } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="root-layout">
      <header>
        <nav>
          <h1>Navbar</h1>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/signin">Blogs </NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
