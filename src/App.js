import logo from '../src/assets/logo.png';
import '../src/styles/App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>
          Flash Food
        </h2>
        <a>
          Satisfaction at lightning speed
        </a>
      </header>
    </div>
  );
}

export default App;
