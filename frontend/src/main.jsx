// DEPENDENCIES
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { Suspense, lazy } from "react";
import "tailwindcss/tailwind.css";

// LAYOUT
import Layout from "./components/Layout";

// PAGE
import Page_Home from "./pages/Home/Page_Home";
import Page_About from "./pages/About/Page_About";
import Page_Login from "./pages/Login/Page_Login";
import Page_Register from "./pages/Register/Page_Register";
import Page_CreateAndUpdate from "./pages/CreateAndUpdate/Page_CreateAndUpdate";
import Page_LinkCollection from "./pages/LinkCollection/Page_LinkCollection";
import Page_SpecificLink from "./pages/SpecificLink/Page_SpecificLink";
import Page_NotFound from "./pages/NotFound/Page_NotFound";
import Page_Profile from "./pages/Profile/Page_Profile";
import Page_ChangeName from "./pages/ChangeProfile/Page_ChangeName";
import Page_ChangeEmail from "./pages/ChangeProfile/Page_ChangeEmail";
import Page_ChangeUsername from "./pages/ChangeProfile/Page_ChangeUsername";
import Page_ChangePassword from "./pages/ChangeProfile/Page_ChangePassword";
import Page_ForgetPassword from "./pages/ForgetPassword/Page_ForgetPassword";
import ProtectedPage from "./components/ProtectedPage";

// CONTEXT
import AuthProvider from "./contexts/AuthProvider";
import LinkProvider from "./contexts/LinkProvider";
import UrlProvider from "./contexts/UrlProvider";
import ProfileProvider from "./contexts/ProfileProvider";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <AuthProvider>
            <Layout />
          </AuthProvider>
        }
      >
        <Route path="home" element={<Page_Home />} />
        <Route path="guide" element={<Page_NotFound />} />
        <Route path="about" element={<Page_About />} />
        <Route path="login" element={<Page_Login />} />
        <Route path="register" element={<Page_Register />} />
        <Route path="forget-password" element={<Page_ForgetPassword />} />
        <Route
          element={
            <AuthProvider>
              <ProtectedPage />
            </AuthProvider>
          }
        >
          <Route path="create" element={<Page_CreateAndUpdate />} />
          <Route
            path="collection"
            element={
              <LinkProvider>
                <Page_LinkCollection />
              </LinkProvider>
            }
          />
          <Route
            path="collection/:userLink"
            element={
              <UrlProvider>
                <Page_SpecificLink />
              </UrlProvider>
            }
          />
          <Route
            path="update/:userLink"
            element={
              <UrlProvider>
                <Page_CreateAndUpdate />
              </UrlProvider>
            }
          />
          <Route
            path="profile"
            element={
              <ProfileProvider>
                <Page_Profile />
              </ProfileProvider>
            }
          />
          <Route path="change-email" element={<Page_ChangeEmail />} />
          <Route path="change-password" element={<Page_ChangePassword />} />
          <Route path="change-username" element={<Page_ChangeUsername />} />
          <Route path="change-name" element={<Page_ChangeName />} />
        </Route>
        <Route path="*" element={<Page_NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
