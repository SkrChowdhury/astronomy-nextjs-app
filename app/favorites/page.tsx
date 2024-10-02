'use client';
import useSWR from 'swr';
import { useEffect } from 'react';

interface Favorite {
  title: string;
  url: string;
  media_type: string;
}
const fetchFavorites = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('favorites') || '[]') as Favorite[];
  }
  return [];
};

const Favorites: React.FC = () => {
  // Use SWR to manage fetching favorites
  const { data: favorites, error, mutate } = useSWR('favorites', fetchFavorites);

  useEffect(() => {
    // Mutate the SWR data when the component mounts or localStorage updates
    mutate();
  }, [mutate]);

  if (error) return <div>Failed to load favorites</div>;
  if (!favorites) return <div>Loading favorites...</div>;

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h1 className="text-4xl font-bold text-center mb-6">Your Favorite Images</h1>
      {favorites.length === 0 ? (
        <p className="text-gray-600 text-center">No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {favorites.map((fav, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
              {fav.media_type === 'image' ? (
                // Render image if it's an image
                <img
                  src={fav.url}
                  alt={fav.title}
                  className="w-full h-48 object-cover rounded-md mb-2"
                />
              ) : (
                // Render iframe for YouTube video if it's a video
                <iframe
                  width="100%"
                  height="200"
                  src={fav.url}
                  title={fav.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-md mb-2"
                />
              )}
              <h2 className="text-lg font-semibold">{fav.title}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
