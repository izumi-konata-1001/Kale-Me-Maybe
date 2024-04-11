import { Routes, Route } from "react-router-dom";
import React from "react";
import HomePage from "./HomePage";
import PageLayout from "./PageLayout";
import PageNotFound from "./PageNotFound";
import Discover from "./Discover.jsx";
import BrowsingHistory from "./BrowsingHistory.jsx";
import Favorites from "./Favorites.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Profile from "./Profile.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<HomePage />} />
        <Route path="discover" element={<Discover />} />
        <Route path="browsing-history" element={<BrowsingHistory />} />
        <Route path="favorites" element={<Favorites/>} />
        <Route path="log-in" element={<Login />} />
        <Route path="sign-up" element={<Signup />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
