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
      navigate('/home')
    }
  }, [location.pathname]);
  return (
    <>
      <Header className="">
        <Box className="px-3 items-center border-b border-gray-500 bg-neutral-300">
          <Typograph
            label="Nesting"
            className="text-3xl font-bold font-mono text-emerald-800"
          />
          <Menu>
            <List label="Home" redirect="/home" />
            {isAuth ? (
              <>
                <List label="Create" redirect="/create" />
                <List label="Collection" redirect="/collection" />
                <List label="Profile" redirect="/profile" />
                <List label="About" redirect="/about" />
                <button onClick={handleLogout} type="button">
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

      <Outlet />
    </>
  );
}

export default Layout;
