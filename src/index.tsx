import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Layout from '@/layout';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <StrictMode>
    <Layout />
  </StrictMode>,
);
