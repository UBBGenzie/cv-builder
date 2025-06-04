'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('cv-user');
    if (user) {
      router.replace('/builder');
    }
  }, [router]);

  useEffect(() => {
    window.handleCredentialResponse = (response) => {
      const decodeJwt = (token) => JSON.parse(atob(token.split('.')[1]));
      const data = decodeJwt(response.credential);
      localStorage.setItem('cv-user', JSON.stringify(data));
      localStorage.setItem('cv-builder-email', data.email);
      router.replace('/builder');
    };

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      delete window.handleCredentialResponse;
    };
  }, [router]);

  return (
    <main
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#09090b',
        color: '#FAFAFA',
        fontFamily: 'IBM Plex Sans, sans-serif',
      }}
    >
      <div>
        <div
          id="g_id_onload"
          data-client_id="YOUR_GOOGLE_CLIENT_ID"
          data-callback="handleCredentialResponse"
        ></div>
        <div className="g_id_signin" data-type="standard"></div>
      </div>
    </main>
  );
}
