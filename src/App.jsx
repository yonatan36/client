import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
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
  return <RouterProvider router={router} />;
}

export default App;
