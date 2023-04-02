import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBjALdW73bVlvjzV6kFxNDJgWl04u80pXc",
  authDomain: "lenggiauit-portfolio.firebaseapp.com",
  projectId: "lenggiauit-portfolio",
  storageBucket: "lenggiauit-portfolio.appspot.com",
  messagingSenderId: "193179830743",
  appId: "1:193179830743:web:f19ae0dbb1b92c64486392",
  measurementId: "G-7J67T6KKVS"
};
export const metadata = {
  title: 'Lenggiauit Portfolio',
  description: 'Lenggiauit Portfolio Website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css" />
        <link href="/assets/css/base.css" rel="stylesheet" type="text/css" media="all" />
        <link href="/assets/css/main.css" rel="stylesheet" type="text/css" media="all" />
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossOrigin="anonymous" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossOrigin="anonymous" />
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
