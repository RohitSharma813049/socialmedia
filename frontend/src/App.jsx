import { BrowserRouter, Routes, Route } from "react-router-dom";

import AccountLayout from "./accounts/accountlayout";
import Login from "./accounts/login";
import Register from "./accounts/register";

import Home from "./components/Home/home";
import Feed from "./components/feed/feed";

// Dummy pages (create these files)
import Profile from "./components/profile/profile";
import Explore from "./components/explore/explore";
import Reels from "./components/reels/reels";
import Messages from "./components/message/message";
import Create from "./components/create/create";
import Search from "./components/search/search";

function App() {
  return (
 
      <Routes>

        {/* Auth Pages */}
        <Route path="/" element={<AccountLayout />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Main App */}
        <Route path="/home" element={<Home />}>
          <Route index element={<Feed />} />
          <Route path="profile" element={<Profile />} />
          <Route path="explore" element={<Explore />} />
          <Route path="reels" element={<Reels />} />
          <Route path="messages" element={<Messages />} />
          <Route path="create" element={<Create />} />
          <Route path="search" element={<Search />} />
        </Route>

      </Routes>
  );
}

export default App;
