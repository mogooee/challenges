import styled from 'styled-components';
import Presentation from './components/Presentation';

const LayOut = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
`;

const App = () => (
  <div id="App">
    <LayOut>
      <Presentation />
    </LayOut>
  </div>
);

export default App;
