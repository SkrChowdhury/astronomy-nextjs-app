import React from 'react';
import Image from 'next/image';

interface ApodData {
  title: string;
  url: string;
  explanation: string;
  media_type: string; // Add this field to check if it's a video or image
}

const NASA_API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY;
const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;

async function fetchApod(): Promise<ApodData> {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

const Home = async () => {
  const apod = await fetchApod(); // Fetching data server-side

  return (
    <div className="container mx-auto p-4 text-center bg-white shadow-lg rounded-lg mt-6">
      <h1 className="text-3xl font-bold mb-4">Astronomy Picture of the Day</h1>
      <div className="flex justify-center">
        {apod.media_type === 'image' ? (
          // Render image if it's an image
          <Image
            src={apod.url}
            alt={apod.title}
            width={600}
            height={400}
            className="rounded-lg"
          />
        ) : (
          // Render iframe for YouTube video if it's a video
          <iframe
            width="600"
            height="400"
            src={apod.url}
            title={apod.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          />
        )}
      </div>
      <h2 className="text-2xl font-semibold mt-4">{apod.title}</h2>
      <p className="mt-2 text-gray-700">{apod.explanation}</p>
    </div>
  );
};

export default Home;
