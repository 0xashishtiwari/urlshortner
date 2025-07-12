import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './RedirectPage.css';

const RedirectPage = () => {
  const { shortcode } = useParams();

  useEffect(() => {
    const redirectToBackend = async () => {
      window.location.href = `https://urldb.up.railway.app/${shortcode}`;
    };

    redirectToBackend();
  }, [shortcode]);

  return (
    <div className="redirect-loader-wrapper">
      <div className="redirect-spinner"></div>
      <p>Redirecting to your destination...</p>
    </div>
  );
};

export default RedirectPage;
