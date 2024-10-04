import React from 'react';
import APOMedia from '../components/APOMedia/APOMedia';
import APODExplanation from '../components/APODExplanation/APODExplanation';

// Define interface for NASA APOD data
interface ApodData {
  title: string;
  url: string;
  explanation: string;
  media_type: string; // To determine if it's an image or a video
}

// NASA API key from environment variables
const NASA_API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY;

// NASA APOD API endpoint
const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;

// Fetch APOD data from NASA API
async function fetchApod(): Promise<ApodData> {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json(); // Return JSON response
}

// Main Home component to render the APOD page
const Home = async () => {
  const apod = await fetchApod(); // Fetch APOD data

  return (
    <div className="container mx-auto p-4 text-center bg-white shadow-lg rounded-lg mt-6">
      <h1 className="text-3xl font-bold mb-4">Astronomy Picture of the Day</h1>

      {/* Render media (image or video) */}
      <APOMedia media_type={apod.media_type} url={apod.url} title={apod.title} />

      {/* Render title and explanation */}
      <APODExplanation title={apod.title} explanation={apod.explanation} />
    </div>
  );
};

export default Home;