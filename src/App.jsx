import { Button } from 'primereact/button';
import './App.css'

function App() {

  return (
    <div className="p-4"> 
      {/* Usamos una clase de PrimeFlex (p-4) para dar padding */}
      <h1 style={{ color: '#333' }}>Hola con PrimeReact</h1>
      
      <Button label="Click aquí" icon="pi pi-check" />
      
      <p className="mt-3">
        Configuracion exitosa
      </p>
    </div>
  )
}

export default App
