import './App.css';
import { Calculator } from './Components/Calculator';
import { OperationsTable } from './Components/OperationsTable';
import { Reports } from './Components/Reports';

function App() {
  return (
    <div className="align-items-center
       container 
       content 
       d-flex 
       flex-column 
       justify-content-between">
      <div className="col text-center">
        <h1 className="text-white col">Calculator</h1>
      </div>

      <Calculator />
      
      <Reports/>
    </div>
  );
}

export default App;
