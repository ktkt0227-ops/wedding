window.__WEDDING_BUILD__ = 'SUPABASE-RSVP-20260901';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import SupabaseTest from './SupabaseTest';
import './styles.css';

const isSupabaseTest = new URLSearchParams(window.location.search).get('rsvp-test') === '1';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isSupabaseTest ? <SupabaseTest /> : <App />}
  </React.StrictMode>,
);
