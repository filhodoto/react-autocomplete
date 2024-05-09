import './App.css';
import Autocomplete from './components/Autocomplete';
import data from './data.json';
function App() {
  console.log(data.results);
  return (
    <>
      <Autocomplete placeholder={'search...'} options={data.results} />
    </>
  );
}

export default App;
