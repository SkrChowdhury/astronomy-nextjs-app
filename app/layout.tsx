// app/layout.tsx
import React, { ReactNode } from 'react';
import './globals.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-800">
        <header className="bg-white shadow">
          <nav className="container mx-auto p-4">
            <ul className="flex space-x-4">
              <li>
                <a href="/home" className="text-blue-500 hover:underline">Home</a>
              </li>
              <li>
                <a href="/explore" className="text-blue-500 hover:underline">Explore</a>
              </li>
              <li>
                <a href="/favorites" className="text-blue-500 hover:underline">Favorites</a>
              </li>
            </ul>
          </nav>
        </header>
        <main className="container mx-auto p-4">{children}</main>
        <footer className="bg-white shadow mt-4">
          <div className="container mx-auto p-4 text-center">
            <p>© 2024 Astronomy Explorer</p>
          </div>
        </footer>
      </body>
    </html>
  );
};

export default Layout;
