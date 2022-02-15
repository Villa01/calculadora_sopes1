import './App.css';
import { Calculator } from './Components/Calculator';

function App() {
  return (
    <div className="align-items-center
       container 
       content 
       d-flex 
       flex-column 
       justify-content-evenly">
      <div className="col text-center">
        <h1 className="text-white col">Calculator</h1>
      </div>

      <Calculator />
    </div>
  );
}

export default App;
