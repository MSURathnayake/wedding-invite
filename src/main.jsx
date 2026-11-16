import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import wedding from './config/wedding';
import { activeTemplateId } from './config/activeTemplate';
import './index.css';

// Set before the first paint so the page never flashes in another template's colours.
const root = document.documentElement;
root.dataset.template = activeTemplateId;

// The background illustration (wedding.heroImage) is shared with the CSS as --art.
// The address is made absolute because relative addresses inside CSS variables resolve against the stylesheet.
if (wedding.heroImage) {
  try {
    const href = new URL(wedding.heroImage, document.baseURI).href;
    root.style.setProperty('--art', `url("${href}")`);
    root.dataset.art = 'true';
  } catch {
    /* no background image */
  }
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
