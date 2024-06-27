import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
/*toast*/
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
/*pages*/
import Home from "./components/Home";
import CreateProduct from "./components/CreateProduct";
import EditProduct from "./components/EditProduct";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="create" element={<CreateProduct />} />
      <Route path=":id" element={<EditProduct />} />
    </Route>
  )
);
function App() {
  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <RouterProvider router={router} />
    </>
  );
}
export default App;
