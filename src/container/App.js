import { APIProvider } from 'context/apiContext';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query-devtools';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import Router from 'routes/router';

const queryCache = new QueryCache();

function App() {
        return (
                <ReactQueryCacheProvider queryCache={queryCache}>
                        <APIProvider>
                                <BrowserRouter>
                                        <Router />
                                </BrowserRouter>
                        </APIProvider>
                        <ReactQueryDevtools initialIsOpen />
                </ReactQueryCacheProvider>
        );
}

export default App;
