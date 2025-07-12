import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './RedirectPage.css';

const RedirectPage = () => {
  const { shortcode } = useParams();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const res = await fetch(`https://urldb.up.railway.app/${shortcode}`);
        const data = await res.json();

        if (data?.url) {
          window.location.href = data.url;
        } else {
          setStatus('notfound');
        }
      } catch {
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
