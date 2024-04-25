import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import PageLayout from "./PageLayout";
import PageNotFound from "./component/PageNotFound.jsx";
import Discover from "./Discover.jsx";
import BrowsingHistory from "./BrowsingHistory.jsx";
import Favorites from "./Favorites.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Profile from "./Profile.jsx";
import RecipeDetails from "./RecipeDetails.jsx";
import SearchFavorites from "./SearchFavorites.jsx";
import LoginSuccess from "./thirdparty/LoginSuccess.jsx";
import About from "./About.jsx";
import ContactUs from "./ContactUs.jsx";
import CollectionDetail from "./CollectionDetail.jsx";

function App() {
  return (
    <Routes>
      <Route path="/log-in" element={<Login />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/login-success" element={<LoginSuccess />} />
      <Route path="/" element={<PageLayout />}>
        <Route index element={<HomePage />} />
        <Route path="recipe/:id" element={<RecipeDetails />} />
        <Route path="discover" element={<Discover />} />
        <Route path="browsing-history" element={<BrowsingHistory />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="favorites/search" element={<SearchFavorites />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="collection/:userid/:id" element={<CollectionDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
