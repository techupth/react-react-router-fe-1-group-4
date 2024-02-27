import "./App.css"; 
import HomePage from "./pages/HomePage";
import ViewProductPage from "./pages/ViewProductPage";
import CreateProductPage from "./pages/CreateProductPage";
import EditProductPage from "./pages/EditProductPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/Product/View/:id" element={<ViewProductPage />}/>
        <Route path="/Product/Create" element={<CreateProductPage />}/>
        <Route path="/Product/Edit/:id" element={<EditProductPage />}/>
      </Routes>
    </BrowserRouter>

  )
}

export default App;
