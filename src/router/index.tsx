import "@style/_common.scss";

import { Outlet, Route, Routes } from "react-router-dom";

import About from "@pages/About";
import CreateItem from "@pages/Item/Create";
import CreateUser from "@pages/User/Create";
import DefaultLayout from "@layout/DefaultLayout";
import Home from "@pages/Home";
import Item from "@pages/Item/index";
import Profile from "@pages/Profile";
import { ProtectedRoute } from "./ProtectedRoute";
import Report from "@pages/Report/index";
import User from "@pages/User/index";

export default function RouterRoute() {
  const routes = [
    { path: "home", name: "Home", element: Home },
    { path: "about", name: "About", element: About },
    { path: "profile", name: "Profile", element: Profile },
    {
      path: "report",
      name: "Report",
      element: Outlet,
      children: [{ path: "", name: "Report", element: Report }],
    },
    {
      path: "user",
      name: "User",
      element: Outlet,
      children: [
        { path: "", name: "User", element: User },
        { path: "create", name: "Home", element: CreateUser },
      ],
    },
    {
      path: "item",
      name: "Item",
      element: Outlet,
      children: [
        { path: "", name: "Item", element: Item },
        { path: "create", name: "CreateItem", element: CreateItem },
      ],
    },
  ];
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <Routes>
          {routes.map(
            (route, idx) =>
              route.element && (
                <Route key={idx} path={route.path} element={<route.element />}>
                  {route.children &&
                    route.children.map(
                      (childRoute, childIdx) =>
                        childRoute.element && (
                          <Route
                            key={childIdx}
                            path={childRoute.path}
                            element={<childRoute.element />}
                          />
                        )
                    )}
                </Route>
              )
          )}
        </Routes>
      </DefaultLayout>
    </ProtectedRoute>
  );
}
