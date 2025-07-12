import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './RedirectPage.css';

const RedirectPage = () => {
  const { shortcode } = useParams();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const response = await fetch(`https://urldb.up.railway.app/${shortcode}`);

        if (!response.ok) {
          // Handle 404 or 500 errors
          setStatus('notfound');
          return;
        }

        const data = await response.json();

        if (data.url && typeof data.url === 'string') {
          // Safe redirect
          window.location.href = data.url;
        } else {
          setStatus('notfound');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setStatus('error');
      }
    };

    fetchUrl();
  }, [shortcode]);

  return (
    <div className="redirect-page">
      {status === 'loading' && (
        <>
          <div className="spinner"></div>
          <p>Redirecting...</p>
        </>
      )}
      {status === 'notfound' && <p>❌ Link not found</p>}
      {status === 'error' && <p>⚠️ Failed to fetch URL</p>}
    </div>
  );
};

export default RedirectPage;
