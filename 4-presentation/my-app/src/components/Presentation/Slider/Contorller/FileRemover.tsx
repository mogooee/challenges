import { RemoveFile } from '../../../../hooks/useFile';
import { TITLE } from '../../../../constants/index';

interface FileMoverProps {
  index: number;
  removeFile: RemoveFile;
  slideRemoveImage?: () => void;
}

const FileRemover = ({
  index,
  removeFile,
  slideRemoveImage,
}: FileMoverProps) => {
  const clickFileRemover = () => {
    const answer: boolean = window.confirm('정말 삭제하시겠습니까?');
    if (!answer) return;
    removeFile(index);
    slideRemoveImage?.();
  };

  return (
    <button type="button" onClick={clickFileRemover}>
      {TITLE.FILE_REMOVER}
    </button>
  );
};

export default FileRemover;
