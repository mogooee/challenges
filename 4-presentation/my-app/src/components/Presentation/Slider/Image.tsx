import styled from 'styled-components';
import { IMG_ROOT, IMG_ITEM } from '../../../constants';

type ImageType = typeof IMG_ROOT | typeof IMG_ITEM;
interface ImageProps {
  type: ImageType;
  file: File;
  width?: string;
  height?: string;
}

type SImage = Pick<ImageProps, 'type'>;

const StyledImage = styled.img<SImage>`
  border-radius: 10px;
  aspect-ratio: 5/3;
  cursor: pointer;

  &:hover {
    opacity: ${({ type }) => (type === 'IMG_ITEM' ? 0.5 : 1)};
  }
`;

const Image = ({
  type = 'IMG_ITEM',
  file,
  width = 'auto',
  height = 'auto',
}: ImageProps) => (
  <StyledImage
    type={type}
    src={URL.createObjectURL(file)}
    alt={file.name}
    width={width}
    height={height}
  />
);

export default Image;
