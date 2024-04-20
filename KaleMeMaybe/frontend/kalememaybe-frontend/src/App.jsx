import {Routes, Route, useParams} from "react-router-dom";
import React from "react";
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

function App() {
  return (
    <Routes>
      <Route path="/log-in" element={<Login />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/" element={<PageLayout />}>
        <Route index element={<HomePage />} />
        <Route path="recipe/:id" element={<RecipeDetails/>} />
        <Route path="discover" element={<Discover />} />
        <Route path="browsing-history" element={<BrowsingHistory />} />
        <Route path="favorites" element={<Favorites/>} />
        <Route path="favorites/search" element={<SearchFavorites />}/>
        <Route path="Profile" element={<Profile />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
