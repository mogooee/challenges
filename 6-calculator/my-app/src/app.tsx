import styled from 'styled-components';
import Calculator from '@/Calculator';

const LayOut = styled.div`
  height: 100vh;
  display: grid;
  place-items: center;
`;

const App = () => (
  <div id="App">
    <LayOut>
      <Calculator />
    </LayOut>
  </div>
);

export default App;
