import React, { useState } from 'react';
import axios from 'axios';
import './ShortenerForm.css';

const ShortenerForm = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // 🌀 loader state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShortUrl('');
    setLoading(true);

    if (!url) {
      setError('Please enter a URL');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('https://urldb.up.railway.app/', { url });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} className="shortener-form">
        <input
          type="text"
          placeholder="Enter a long URL (e.g. https://example.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="form-input"
        />
        <button type="submit" className="form-button" disabled={loading}>
          {loading ? <div className="button-spinner"></div> : 'Shorten'}
        </button>
      </form>

      {shortUrl && (
        <div className="form-result">
          🔗 Short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
        </div>
      )}

      {error && <div className="form-error">❌ {error}</div>}
    </div>
  );
};

export default ShortenerForm;
