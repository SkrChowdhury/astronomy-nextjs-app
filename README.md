# NASA Daily Image Viewer

This project is a Next.js app that displays NASA's daily images and allows users to explore previous images and add favorites.

## Features

1. **Server-Side Rendering (SSR)**:  
   - The home page is rendered using SSR to ensure fast initial load and SEO benefits.

2. **Client-Side Rendering (CSR)**:  
   - The explore and favorite pages are rendered using CSR to provide a more dynamic user experience.

3. **React Hooks**:  
   - This project makes use of `useState` and `useEffect` for state management and side effects.

4. **Data Fetching**:  
   - `useSWR` is used to fetch data from the NASA API and from `localStorage` for efficient data management and revalidation.

5. **Explore Page**:  
   - On the explore page, users can browse previous daily images uploaded by NASA and add their favorite images to the favorites page using the "Add to Favorite" button.

6. **Favorite Page**:  
   - All the images that the user adds to their favorites list are displayed here.

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/SkrChowdhury/astronomy-nextjs-app
   cd stronomy-nextjs-app

2. Install dependencies:

   ```bash
   yarn install
3. Create a .env file in the root directory and add the following line:

   ```bash
   NEXT_PUBLIC_NASA_API_KEY=OKvft4KRRAIm5LxjeFVoaIbAPlctazUawstuuo9e
4. Run the development server:

   ```bash
   yarn dev