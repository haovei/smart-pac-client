import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd-mobile';
import enUS from 'antd-mobile/es/locales/en-US';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ConfigProvider locale={enUS}>
            <App />
        </ConfigProvider>
    </React.StrictMode>
);
