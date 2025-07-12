import React, { useState } from 'react';
import axios from 'axios';
import './ShortenerForm.css';
import { useNavigate } from 'react-router-dom';

const ShortenerForm = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const navigate = useNavigate();

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

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      alert('Failed to copy');
    }
  };

  const handleClickRedirect = () => {
    if (shortUrl) {
      const code = shortUrl.split('/').pop();
      navigate(`/${code}`);
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
          🔗 Short URL:{' '}
          <span
            onClick={handleClickRedirect}
            className="short-url-link"
            style={{ cursor: 'pointer', color: '#3498db', textDecoration: 'underline' }}
          >
            {shortUrl}
          </span>
          <button className="copy-button" onClick={() => handleCopy(shortUrl)}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}

      {error && <div className="form-error">❌ {error}</div>}
    </div>
  );
};

export default ShortenerForm;
