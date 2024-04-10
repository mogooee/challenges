import styled from 'styled-components';
import Routers from './router';

const LayOut = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: min-content;
  place-items: center;
`;

const App = () => {
  return (
    <LayOut>
      <Routers />
    </LayOut>
  );
};

export default App;
