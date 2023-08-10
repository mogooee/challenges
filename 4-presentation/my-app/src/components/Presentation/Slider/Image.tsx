import styled, { css } from 'styled-components';

type ImageType = 'ROOT' | 'ITEM';
interface ImageProps {
  type: ImageType;
  file: File;
  width?: string;
  height?: string;
}

type TStyledImage = Pick<ImageProps, 'type'>;

const StyledImage = styled.img<TStyledImage>`
  border-radius: 10px;
  cursor: pointer;
  object-fit: contain;

  ${({ type }) => {
    if (type === 'ROOT')
      return css`
        width: inherit;
      `;
  }};

  ${({ type }) => {
    if (type === 'ITEM')
      return css`
        &:hover {
          opacity: 0.5;
        }
      `;
  }};
`;

const Image = ({ type = 'ROOT', file, width, height }: ImageProps) => (
  <StyledImage
    type={type}
    src={URL.createObjectURL(file)}
    alt={file.name}
    width={width}
    height={height}
  />
);

export default Image;
