import { Outlet, useLocation, useNavigate } from "react-router";
import Header from "./Header";
import Box from "./Box";
import List from "./List";
import Menu from "./Menu";
import Typograph from "./Typograph";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import api_collection from "../api/api_collection";
import hit_api from "../utils/fetcher";
import { Helmet } from "react-helmet";
import favicon from "../../public/link.svg";

function Layout() {
  const { isAuth } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const net = api_collection.auth.logout;
    hit_api(net, "DELETE")
      .then(() => {
        setTimeout(() => navigate("/home"), 500);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (location.pathname == "/") {
      navigate("/home");
    }
  }, [location.pathname]);
  return (
    <>
      <Header>
        <Box className="px-3 items-center border-b border-zinc-700 bg-zinc-900">
          <h1 className="text-2xl font-bold font-mono text-green-400">
            Nesting <span className="text-sm">V.1.0</span>
          </h1>
          <Menu>
            <List label="Home" redirect="/home" />
            {isAuth ? (
              <>
                <List label="Create" redirect="/create" />
                <List label="Collection" redirect="/collection" />
                <List label="Profile" redirect="/profile" />
                <List label="About" redirect="/about" />
                <button
                  className="text-red-500"
                  onClick={handleLogout}
                  type="button"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <List label="About" redirect="/about" />
                <List label="Login" redirect="/login" />
                <List label="Register" redirect="/register" />
              </>
            )}
          </Menu>
        </Box>
      </Header>

      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Playwrite+AU+SA:wght@100..400&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href={favicon} type="image/svg" />
        <title>{`Nesting | ${location.pathname
          .split("/")[1]
          .split("")
          .map((char, charIndex) =>
            charIndex === 0 ? char.toUpperCase() : char
          )
          .join("")}`}</title>
        <meta
          name="description"
          content="Gratis. Mengelola tautan kini menjadi lebih mudah, kumpulkan semuanya kedalam satu link dan nikmati kemudahan dalam mengaturnya."
        />
      </Helmet>

      <Outlet />
    </>
  );
}

export default Layout;
