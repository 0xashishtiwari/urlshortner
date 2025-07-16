import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Container,
} from '@mui/material';

const RedirectPage = () => {
  const { shortcode } = useParams();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const res = await fetch(`https://urldb.up.railway.app/${shortcode}`);
        const data = await res.json();

        setTimeout(() => {
          if (data.url) {
            window.location.href = data.url;
          } else {
            setStatus('notfound');
          }
        }, 800);
      } catch {
        setStatus('error');
      }
    };

    fetchUrl();
  }, [shortcode]);

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <>
            <CircularProgress size={60} thickness={4} color="primary" />
            <Typography mt={2} variant="h6">
              Redirecting you safely...
            </Typography>
          </>
        );
      case 'notfound':
        return (
          <Typography variant="h6" color="error">
            ❌ Sorry, this link doesn’t exist.
          </Typography>
        );
      case 'error':
        return (
          <Typography variant="h6" color="warning.main">
            ⚠️ Couldn’t fetch the link. Please try again later.
          </Typography>
        );
      default:
        return null;
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {renderContent()}
    </Container>
  );
};

export default RedirectPage;
