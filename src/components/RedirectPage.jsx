import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './RedirectPage.css';

const RedirectPage = () => {
  const { shortcode } = useParams();
  const [message, setMessage] = useState('Redirecting...');

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const res = await fetch(`https://urldb.up.railway.app/${shortcode}`);
        const data = await res.json();

        if (data?.url) {
          setMessage('🔁 Taking you to the destination...');
          setTimeout(() => {
            window.location.href = data.url;
          }, 1200); // Smooth delay
        } else {
          setMessage('❌ Short link not found');
        }
      } catch {
        setMessage('⚠️ Failed to fetch the URL');
      }
    };

    fetchUrl();
  }, [shortcode]);

  return (
    <div className="redirect-container">
      <div className="spinner"></div>
      <p className="redirect-message">{message}</p>
    </div>
  );
};

export default RedirectPage;
