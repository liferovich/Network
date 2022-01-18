import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { useRoutes } from './routes/routes';
import './App.css';
import { isActivated, isAuth, isLoading } from './features/AuthSlice';

function App() {
  const authenticated = useSelector(isAuth);
  const loading = useSelector(isLoading);
  const activated = useSelector(isActivated);
  const routes = useRoutes(authenticated, activated);

  return (
    <Router>
      <header>
        <Header authenticated={authenticated} activated={activated} />
      </header>
      <main>
        <div className='container'>
          {loading ? <h1>Loading...</h1> : routes}
        </div>
      </main>
      <footer className='page-footer blue darken-1'>
        <Footer />
      </footer>
    </Router>
  );
}

export default App;
