import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VerifyEmail = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');

    const verifyEmail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/auth/verify`, {
          params: { token }
        });
        setMessage(response.data.message);
      } catch (error) {
        //setMessage('Verification failed. Please try again later.');
        setMessage(error.message);
      }
    };

    verifyEmail();
  }, []);

  return (
    <div>
      {message ? (
        <p>{message}</p>
      ) : (
        <p>Verifying...</p>
      )}
    </div>
  );
};

export default VerifyEmail;
