import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// 自动获取深色模式
const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.setAttribute('data-prefers-color-scheme', darkMode ? 'dark' : 'light');

// 监听深色模式变化
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    document.documentElement.setAttribute(
        'data-prefers-color-scheme',
        e.matches ? 'dark' : 'light'
    );
});

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
