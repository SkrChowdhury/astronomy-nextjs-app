'use client';
import useSWR from 'swr';
import { useState, ChangeEvent } from 'react';

interface ApodData {
  title: string;
  url: string;
  explanation: string;
  media_type: string; // Added media_type to handle videos
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const AddToFavoritesButton = ({ apod }: { apod: ApodData }) => {
  const addToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const newFavorite = {
      title: apod.title,
      url: apod.url,
      media_type: apod.media_type,
    };

    const isFavorite = favorites.some((fav: any) => fav.url === newFavorite.url);
    if (!isFavorite) {
      favorites.push(newFavorite);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert('Added to favorites!');
    } else {
      alert('Already in favorites!');
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

const Explore: React.FC = () => {
  const [date, setDate] = useState<string>('');
  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  const { data, error } = useSWR<ApodData>(
    date ? `https://api.nasa.gov/planetary/apod?api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}&date=${date}` : null,
    fetcher
  );

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  return (
    <div className="container mx-auto p-4 text-center bg-white shadow-lg rounded-lg mt-6">
      <h1 className="text-3xl font-bold mb-4">Explore Past Images</h1>
      <input
        type="date"
        value={date}
        onChange={handleDateChange}
        max={today} // Disable today and future dates
        className="border border-gray-300 rounded-lg p-2 mb-4"
      />
      {error && <div className="text-red-500 mb-4">Error fetching data</div>}
      {data && (
        <div>
          {data.media_type === 'image' ? (
            <img src={data.url} alt={data.title} className="mx-auto mb-4 rounded-lg" width={600} />
          ) : (
            <iframe
              width="600"
              height="400"
              src={data.url}
              title={data.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="mx-auto mb-4 rounded-lg"
            />
          )}
          <h2 className="text-2xl font-semibold mt-4">{data.title}</h2>
          <p className="mt-2 text-gray-700">{data.explanation}</p>
          <AddToFavoritesButton apod={data} /> {/* Add to favorites button */}
        </div>
      )}
    </div>
  );
};

export default Explore;
