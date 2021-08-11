import './App.css';
import Navbar from './components/Navbar/Navbar';
import Wrapper from './components/Wrapper/Wrapper';
import SpacesTable from './components/DataTable/SpacesTable';

function App() {
  return (
    <>

      <Navbar/>
      <Wrapper>
        <SpacesTable/>
      </Wrapper>
      
    </>
  );
}

export default App;
