"use client";  // This ensures the entire file is treated as a client-side component
import React, { useState, useCallback, useEffect, CSSProperties } from "react";
import dynamic from "next/dynamic";
// import Retool from "react-retool";
import FullscreenRetoolComponent from './fullRetool'; // Adjust the path as necessary

import Image from 'next/image';
import myImage from '/public/kaz_real.png'; // Assuming the image is in the public folder

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';




// Define types for the parameters (you can adjust these types based on your needs)
type AuthError = any; // or define a more specific type if you know it
type AuthData = {
  account: {
    username: string;
  };
};

// Dynamically import the MicrosoftLogin component to disable SSR
const MicrosoftLogin = dynamic(() => import("react-microsoft-login"), {
  ssr: false,
});

// Define your component to use MicrosoftLogin
const MicrosoftAuthComponent: React.FC<{ onSignIn: (username: string) => void }> = ({ onSignIn }) => {

  // Define your auth handler function
  const authHandler = useCallback((err: AuthError, data: AuthData) => {
    console.log(err, data);

    if (!err) {
      // Extract the username from the data object
      const username = data.account.username;

    //   // Set the cookie with the username
    //   Cookies.set('username', username, {
    //     expires: 30, // Cookie expiry in days
    //     path: '/',   // Path where the cookie is available
    //   });

      // Invoke the onSignIn callback to update the state in the parent component
      onSignIn(username);
    } else {
      // Handle the error if needed
      console.error('Authentication error:', err);
    }
  }, [onSignIn]);

  return (
    <MicrosoftLogin
      clientId="baf7a588-35f1-4d62-a7a8-c3891541a28c"
      authCallback={authHandler}
      redirectUri="http://localhost:3000/api/auth/callback"
      buttonTheme="light" />
  );
};


  

export default function HomePage() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Track the sign-in state
  const [username, setUsername] = useState<string | null>(null); // Track the username

  // Function to handle sign-in state update
  const handleSignIn = (username: string) => {
    setUsername(username);
    setIsSignedIn(true);
  };


  // Retrieve the username from the cookie when the component mounts
  useEffect(() => {
    // const cookieUsername = Cookies.get("username2");
    // if (cookieUsername) {
    //     handleSignIn(cookieUsername);
    // }
  }, []);

//   const domain = username.split('@')[1];
const domain = getDomainFromEmail(username)
  const retoolData = { username: username }
  const url = `https://nextgenmsps.retool.com/embedded/public/c1f3b3e9-a463-4e5b-969d-3f8953447bff?username=${username}&domain=${domain}`
//   const url = `https://nextgenmsps.retool.com/form/c7a1a0f5-b587-43f1-8aaa-7faf0c04f34b?username=${username}`


  return (
    <main>
      <div>
        {isSignedIn ? ( 
            
            <FullscreenRetoolComponent url={url} retoolData={retoolData} />
            
           )  : (
        


            <div style={containerStyle}>
            <Card style={cardStyle} variant="outlined" raised={true} elevation={3} sx={{ boxShadow: 3 }}>
              <div style={imageStyle}>
                <Image 
                  src={myImage} 
                  alt="Description of image" 
                  layout="responsive"
                />
              </div>
              <MicrosoftAuthComponent onSignIn={handleSignIn} />
            </Card>
          </div>


        )}
      </div>
    </main>
  );
}

function getDomainFromEmail(email: string | null | undefined): string | null {
    // Check if the email is null or undefined
    if (!email) {
        return null;
    }

    // Split the email by the "@" symbol
    const parts = email.split('@');
    
    // Return the domain part
    return parts.length === 2 ? parts[1] : null;
}


const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
  };

  const imageStyle: CSSProperties = {
    marginBottom: '80px', // Adjust the value as needed
    width: '100%',        // Ensures the image fits within the card
    height: 'auto',       // Maintains aspect ratio
  };

  const cardStyle: CSSProperties = {
    padding: '20px',      // Adds padding inside the card
    minWidth: '40vw',    // Ensures minimum width for the card
    minHeight: '400px',   // Ensures minimum height for the card
    display: 'flex',
    flexDirection: 'column',
    marginTop: '-20vh',
    alignItems: 'center',
  };