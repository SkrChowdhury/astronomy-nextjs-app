import { ApodData } from "@/app/utils/interfaces/ApodData.interface.";
import { Favorite } from "@/app/utils/interfaces/Favourite.interface";
import React from "react";

export default function AddToFavoritesButton({ apod }: { apod: ApodData }) {
  const addToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const newFavorite = {
      title: apod.title,
      url: apod.url,
      media_type: apod.media_type,
    };

    // Check if the item is already in the favorites list
    const isFavorite = favorites.some(
      (fav: Favorite) => fav.url === newFavorite.url
    );
    if (!isFavorite) {
      favorites.push(newFavorite);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert("Added to favorites!");
    } else {
      alert("Already in favorites!");
    }
  };
  return (
    <button
      onClick={addToFavorites}
      className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
    >
      Add to Favorites
    </button>
  );
}
