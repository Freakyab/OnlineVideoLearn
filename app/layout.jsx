'use client';

import './globals.css';
import { createContext, useState } from 'react';

export const UserContext = createContext();

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta
            name="description"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>WebLearn</title>
        </head>    
        <body
          
        >{children}</body>
      </html>
    </UserContext.Provider>
  );
}