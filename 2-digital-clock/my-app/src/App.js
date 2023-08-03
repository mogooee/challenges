import styled from 'styled-components';
import DigitalClock from './components/DigitalClock';

const LayOut = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
`;

function App() {
  return (
    <div className="App">
      <LayOut>
        <DigitalClock />
      </LayOut>
    </div>
  );
}

export default App;
