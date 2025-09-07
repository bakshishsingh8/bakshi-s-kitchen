import { Routes, Route } from "react-router-dom";
import FrontPage from "./components/FrontPage.jsx";
import Footer from "./components/footer.jsx";
import MenuPage from "./components/MenuPage.jsx";
import { CartProvider } from "./context/CartContext";
import CartPanel from "./components/CartPanel.jsx";
import "./App.css";
// import { useState, useEffect } from "react";
import Navbar from './layout/Header.jsx';
import About from "./components/about.jsx";
import Contects from "./components/contects.jsx";

export default function App() {

  return (
    <CartProvider>
      <Navbar />
      <Routes>
      <Route path="about" element={<About/>}/>
      <Route path="contects" element={<Contects/>}/>
      </Routes> 
      
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/CC" element={<FrontPage />} />
        <Route path="/menu/:id" element={<MenuPage />} />
        
      </Routes>

      {/* Floating Cart */}
      <CartPanel />

      {/* Footer */}
      <Footer />
    </CartProvider>
  );
}



////////////////////////////////////////////////////////////////////////////////////////////////////////
// import { Routes, Route } from "react-router-dom";
// import FrontPage from "./components/FrontPage.jsx"; // New combined file
// import Footer from "./components/footer.jsx";
// import MenuPage from "./components/MenuPage.jsx";
// import { CartProvider } from "./context/CartContext";
// import CartPanel from "./components/CartPanel.jsx";
// import "./App.css";
// import { useState, useEffect } from "react";


// export default function App() {

//   const [theme, setTheme] = useState("dark"); // default dark

//   useEffect(() => {
//     if (theme === "light") {
//       document.body.classList.add("light-theme");
//     } else {
//       document.body.classList.remove("light-theme");
//     }
//   }, [theme]);
//   return (
//     <div>
//       <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
//         Switch to {theme === "light" ? "Dark" : "Light"} Mode
//       </button>

//       <h1 className="menu-title">Menu</h1>
//       {/* your cards/components here */}
//     <CartProvider>
//       <Routes>
//         {/* Front page with Home + Cards */}
//         <Route path="/" element={<FrontPage />} />

//         {/* Optional: Keep /CC for backward compatibility, also show FrontPage */}
//         <Route path="/CC" element={<FrontPage />} />

//         {/* Menu page for selected category */}
//         <Route path="/menu/:id" element={<MenuPage />} />
//       </Routes>

//       <CartPanel />
//       <Footer />
//     </CartProvider>
//     <div>
//       <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
//         Switch to {theme === "light" ? "Dark" : "Light"} Mode
//       </button>

//       <h1 className="menu-title">Menu</h1>
//       {/* your cards/components here */}
//     </div>
//   );
// }




