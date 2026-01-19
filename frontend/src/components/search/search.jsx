import React, { useState, useRef } from "react";
import api from "@/axios/axios";
import { useNavigate } from "react-router-dom";

function Search() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const timer = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (timer.current) clearTimeout(timer.current);

    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    timer.current = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await api.get("/auth/search", {
          params: { q: value },
        });
        setSuggestions(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);
  };

  return (
    <div className="max-w-md mx-auto p-4 relative">
      <input
        value={query}
        onChange={handleChange}
        onBlur={() => setTimeout(() => setSuggestions([]), 200)}
        placeholder="Search users"
        className="w-full border px-3 py-2 rounded"
      />

      {loading && (
        <p className="text-sm text-gray-500 mt-1">Searching...</p>
      )}

      {suggestions.length > 0 && (
        <div className="absolute w-full bg-white border rounded mt-1 shadow">
          {suggestions.map((user) => (
            <div
              key={user._id}
              onClick={() => navigate(`/profile/${user.nickname}`)}
              className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100"
            >
              <img
                src={user.profilePic || "/avatar.png"}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="font-medium">{user.username}</p>
                <p className="text-sm text-gray-500">
                  @{user.nickname}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && query.length > 1 && suggestions.length === 0 && (
        <p className="text-sm text-gray-500 mt-2">No users found</p>
      )}
    </div>
  );
}

export default Search;
