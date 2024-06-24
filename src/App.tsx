import './App.css';
import Header from './components/header/Header';
import Home from './pages/home/Home';

function App() {
  return (
    <div className="App">
      <div className='app-container'>
        <Header />
        <Home />
      </div>
    </div>
  );
}

export default App;
