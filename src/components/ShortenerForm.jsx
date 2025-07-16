import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Snackbar,
  Alert,
  Typography,
  Paper,
  CircularProgress,
  IconButton,
  InputAdornment,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useNavigate } from 'react-router-dom';

const ShortenerForm = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShortUrl('');
    setLoading(true);

    if (!url.trim()) {
      setError('Please enter a valid URL');
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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setSnackbar({ open: true, message: 'Copied to clipboard!', severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: 'Failed to copy', severity: 'error' });
    }
  };

  const handleClickRedirect = () => {
    if (shortUrl) {
      const code = shortUrl.split('/').pop();
      navigate(`/${code}`);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f0f2f5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Paper elevation={4} sx={{ p: 4, maxWidth: 500, width: '100%', borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom fontWeight={600}>
          🔗 URL Shortener
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Enter your long URL"
            variant="outlined"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            error={!!error}
            helperText={error}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? 'Shortening...' : 'Shorten URL'}
          </Button>
        </form>

        {shortUrl && (
          <Box mt={3} p={2} bgcolor="#e3f2fd" borderRadius={2}>
            <Typography variant="body1" fontWeight={500}>
              Short URL:
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: '#1565c0', cursor: 'pointer', wordBreak: 'break-all' }}
              onClick={handleClickRedirect}
            >
              {shortUrl}
            </Typography>
            <IconButton onClick={handleCopy} color="primary" size="small">
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Box>
        )}

        <Snackbar
          open={snackbar.open}
          autoHideDuration={2000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
};

export default ShortenerForm;
