import { Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar";
import HomeScreen from "./pages/home";
import Category from "../src/components/category";
import CartPage from "./pages/cart";
import Profile from "./pages/profile";
import Wishlist from "./components/wishlist";
import Search from "./components/search-page";
import Details from "./components/product-details";
import ProtectedRoute from "./components/protectecRoutes";
import TheSignin from "./pages/signin";
import useNetworkStatus from "./utilis/network-checking";
import Spinner from "./components/spinner.component";

function OfflineBanner() {
  const { isOffline } = useNetworkStatus();
  if (!isOffline) return null;
  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "#ff4444",
        color: "#fff",
        padding: "10px 20px",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      }}
    >
      You're offline. Please check your connection.
    </div>
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<HomeScreen />} />{" "}
          <Route path=":category" element={<Category />} />{" "}
          <Route path="cart/*" element={<CartPage />} />{" "}
          <Route
            path="profile/*"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="search/*" element={<Search />} />
          <Route path="product/:name" element={<Details />} />
          <Route path="signin/*" element={<TheSignin />} />
        </Route>
        <Route path="spinner" element={<Spinner />} />
      </Routes>
      <OfflineBanner />
    </>
  );
}

export default App;
