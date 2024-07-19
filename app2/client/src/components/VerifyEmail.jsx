// VerifyEmail.js
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const VerifyEmail = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const verifyEmail = async () => {
      const queryParams = new URLSearchParams(location.search);
      const token = queryParams.get('token');

      try {
        const res = await fetch(`/api/auth/verify?token=${token}`);
        const data = await res.json();
        setResponse(data);
      } catch (err) {
        setError(err);
      }
    };

    verifyEmail();
  }, [location]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {response ? (
        <pre>{JSON.stringify(response, null, 2)}</pre>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default VerifyEmail;