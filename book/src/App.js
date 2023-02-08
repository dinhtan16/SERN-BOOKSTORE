import "./App.css";
import Layout from "./components/Layout";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AdminPage from "./pages/Admin";
import { Route, Routes } from "react-router-dom";
import publicRoutes from "./routes/Routes";
import { Fragment } from "react";
import DefaultLayout from "./components/Layout";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;

          let Layout = DefaultLayout;

          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }
          return (
            <Route path="/" element={<Layout />} key={index}>
              <Route path={route.path} element={<Page />} />
            </Route>
          );
        })}
      </Routes>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default App;
