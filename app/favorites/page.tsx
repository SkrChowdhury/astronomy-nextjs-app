"use client";
import useSWR from "swr";
import { useEffect } from "react";
import { Favorite } from "../utils/interfaces/Favourite.interface";
import FavoriteCard from "../components/FavoriteCard/FavoriteCard";

// Function to fetch favorites from localStorage
const fetchFavorites = (): Favorite[] => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("favorites") || "[]") as Favorite[];
  }
  return [];
};

// Main Favorites component to display the list of saved favorites
const Favorites: React.FC = () => {
  const {
    data: favorites,
    error,
    mutate,
  } = useSWR("favorites", fetchFavorites);

  useEffect(() => {
    // Mutate the SWR data to keep it updated with localStorage
    mutate();
  }, [mutate]);

  if (error) return <div>Failed to load favorites</div>;
  if (!favorites) return <div>Loading favorites...</div>;

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h1 className="text-4xl font-bold text-center mb-6">
        Your Favorite Images
      </h1>

      {/* Display message if there are no favorites */}
      {favorites.length === 0 ? (
        <p className="text-gray-600 text-center">No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Render each favorite using the FavoriteCard component */}
          {favorites.map((favorite, index) => (
            <FavoriteCard key={index} favorite={favorite} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
