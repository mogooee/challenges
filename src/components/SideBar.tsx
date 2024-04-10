import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CHALLENGE = [
  'producing-chart',
  'digital-clock',
  'star-rating',
  //   'presentation',
  'toast-notification',
  'calculator',
  'post-it',
];

const SideBar = () => {
  const navigate = useNavigate();

  const onClick = (challenge: string) => {
    navigate(`/${challenge}`);
  };

  return (
    <Aside>
      <ul>
        {CHALLENGE.map((e) => (
          <li key={e} onClick={() => onClick(e)}>
            {e}
          </li>
        ))}
      </ul>
    </Aside>
  );
};

export default SideBar;

const Aside = styled.aside`
  padding: 30px;

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    list-style: none;
    font-size: 24px;
    justify-content: center;

    li {
      cursor: pointer;
    }

    li:hover {
      color: blue;
    }
  }
`;
