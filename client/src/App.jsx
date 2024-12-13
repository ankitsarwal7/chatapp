
 
import { Outlet } from 'react-router-dom';
import './App.css';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 5000, // Toast duration in milliseconds
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
        }}
      />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
