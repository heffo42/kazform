import React, { useEffect } from 'react';
import Retool from "react-retool" // Ensure you have this import for Retool


interface FullscreenRetoolComponentProps {
    url: string;         // The URL should be a string
    retoolData: any;     // Replace 'any' with a more specific type if possible
  }
  
  const FullscreenRetoolComponent: React.FC<FullscreenRetoolComponentProps> = ({ url, retoolData }) => {
   
  useEffect(() => {
    // Disable body scroll when the component is mounted
    document.body.style.overflow = 'hidden';

    // Re-enable body scroll when the component is unmounted
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.fullscreen}>
        <Retool 
          url={url}
          data={retoolData}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 9999, // Ensures the component is on top
    overflow: 'hidden', // Ensure no scrollbars appear
    display: 'flex',
    flexDirection: 'column',
  } as React.CSSProperties,
  fullscreen: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
};

export default FullscreenRetoolComponent;
