"use client";
import useSWR from "swr";
import { useState, ChangeEvent } from "react";
import APOMedia from "../components/APOMedia/APOMedia";
import APODExplanation from "../components/APODExplanation/APODExplanation";
import { ApodData } from "../utils/interfaces/ApodData.interface.";

// Fetcher function to be used with SWR for data fetching
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Component to add APOD data to localStorage favorites
const AddToFavoritesButton = ({ apod }: { apod: ApodData }) => {
  const addToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const newFavorite = {
      title: apod.title,
      url: apod.url,
      media_type: apod.media_type,
    };

    // Check if the item is already in the favorites list
    const isFavorite = favorites.some(
      (fav: any) => fav.url === newFavorite.url
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
};

// Main Explore component with date picker and SWR for fetching APOD
const Explore: React.FC = () => {
  const [date, setDate] = useState<string>(""); // State to store the selected date
  const today = new Date().toISOString().split("T")[0]; // Format today's date in YYYY-MM-DD format

  // Fetch APOD data based on selected date using SWR
  const { data, error } = useSWR<ApodData>(
    date
      ? `https://api.nasa.gov/planetary/apod?api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}&date=${date}`
      : null,
    fetcher
  );

  // Function to handle the change in date picker input
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  return (
    <div className="container mx-auto p-4 text-center bg-white shadow-lg rounded-lg mt-6">
      <h1 className="text-3xl font-bold mb-4">Explore Past Images</h1>

      {/* Date picker for selecting past dates */}
      <input
        type="date"
        value={date}
        onChange={handleDateChange}
        max={today} // Disable future dates
        className="border border-gray-300 rounded-lg p-2 mb-4"
      />

      {/* Error message if data fetching fails */}
      {error && <div className="text-red-500 mb-4">Error fetching data</div>}

      {/* If APOD data is available, render the media, details, and favorites button */}
      {data && (
        <div>
          {/* Render media (image or video) */}
          <APOMedia
            url={data.url}
            media_type={data.media_type}
            title={data.title}
          />

          {/* Render title and explanation */}
          <APODExplanation title={data.title} explanation={data.explanation} />

          {/* Add to favorites button */}
          <AddToFavoritesButton apod={data} />
        </div>
      )}
    </div>
  );
};

export default Explore;
