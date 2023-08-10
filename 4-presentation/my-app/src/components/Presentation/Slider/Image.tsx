import styled from 'styled-components';

const StyledImage = styled.img`
  border-radius: 10px;
  aspect-ratio: 5/3;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;

const Image = ({
  file,
  width,
  height = 'auto',
}: {
  file: File;
  width: string;
  height: string;
}) => (
  <StyledImage
    src={URL.createObjectURL(file)}
    alt={file.name}
    width={width}
    height={height}
  />
);

export default Image;
