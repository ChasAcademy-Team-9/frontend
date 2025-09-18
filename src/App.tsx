import './App.css';
import { FaBeer } from 'react-icons/fa';
import { PrimaryButton } from './components/PrimaryButton/PrimaryButton';
import { SecondaryButton } from './components/SecondaryButton/SecondaryButton';

function App() {
  return (
    <>
      <h1 className='text-6xl'>
        hej <FaBeer />
      </h1>
      {/* <!-- TODO ta bort button test */}
      <PrimaryButton onClick={()=>alert(123)} text="Abc" />
      <SecondaryButton onClick={()=>alert('SecondaryBtn')} text="Secondary Button" />
    </>
  );
}

export default App;
