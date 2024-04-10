import { ChangeEvent, useRef, useState } from 'react';

type UpdateFiles = () => FileList;
export type AddFile = (event: ChangeEvent<HTMLInputElement>) => FileList;
export type RemoveFile = (idx: number) => FileList;

const useFile = () => {
  const [files, setFiles] = useState<FileList>();
  const fileStore = useRef(new DataTransfer());

  const updateFiles: UpdateFiles = () => {
    const updatedFiles = fileStore.current.files;
    setFiles(updatedFiles);
    return updatedFiles;
  };

  const addFile: AddFile = (event) => {
    const addedFiles = event.target.files!;
    Array.from(addedFiles).forEach((file) => {
      fileStore.current.items.add(file);
    });
    return updateFiles();
  };

  const removeFile: RemoveFile = (idx) => {
    const currentFiles = fileStore.current.files;
    Array.from(currentFiles).forEach((_, fileIdx) => {
      if (fileIdx === idx) {
        fileStore.current.items.remove(fileIdx);
      }
    });
    return updateFiles();
  };

  return { files, addFile, removeFile };
};

export default useFile;
