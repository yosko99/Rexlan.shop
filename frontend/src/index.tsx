import React from 'react';

// @ts-ignore
import { loadProgressBar } from 'axios-progress-bar';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import 'axios-progress-bar/dist/nprogress.css';
import './styles/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

loadProgressBar();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <App />
      <ReactQueryDevtools initialIsOpen/>
    </React.StrictMode>
  </QueryClientProvider>,
  document.getElementById('root')
);

reportWebVitals();
