import { lazy } from "react";
import { AuthenticatProvider } from "./context/AuthenticationProvider";
import { CitiesProvider } from "./context/CitiesProvider";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import CityList from "./Components/CityList";
import CountryList from "./Components/CountryList";
import CitySelected from "./Components/CitySelected";
import Form from "./Components/Form";
import ProtectRoute from "./Pages/ProtectRoute";
import { Suspense } from "react";
import FullPageLoader from "./Components/FullPageLoader";

const Home = lazy(() => import("./Pages/Home"));
const Product = lazy(() => import("./Pages/Product"));
const Pricing = lazy(() => import("./Pages/Pricing"));
const PageNotFound = lazy(() => import("./Pages/PageNotFound"));
const Application = lazy(() => import("./Pages/Application"));
const Login = lazy(() => import("./Pages/Login"));

function App() {
  return (
    <>
      <AuthenticatProvider>
        <CitiesProvider>
          <BrowserRouter>
            <Suspense fallback={<FullPageLoader />}>
              <Routes>
                <Route index path="/world_tour/" element={<Home />} />
                <Route path="/world_tour/Product" element={<Product />} />
                <Route path="/world_tour/Pricing" element={<Pricing />} />
                <Route path="/world_tour/Login" element={<Login />} />
                <Route path="*" element={<PageNotFound />} />
                <Route
                  path="App"
                  element={
                    <ProtectRoute>
                      <Application />
                    </ProtectRoute>
                  }
                >
                  <Route index element={<Navigate replace to="cities" />} />
                  <Route path="cities" element={<CityList />} />
                  <Route path="cities/:id" element={<CitySelected />} />
                  <Route path="countries" element={<CountryList />} />
                  <Route path="form" element={<Form />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </CitiesProvider>
      </AuthenticatProvider>
    </>
  );
}

export default App;
