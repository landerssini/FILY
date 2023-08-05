import React, { useRef, useState } from "react";
import { uploadFile } from "../API/UploadFile";

const FileUpload = ({ showFileUploadMsg, uploadedFileLink, setShowFileUploadMsg, setUploadedFileLink }) => {
  const fileInput = useRef(null);
  const [file, setFile] = useState(null);
  const handleChangeInputFile = (e) => {
    setFile(e.target.files[0]);
    if (e.target.files[0]) {
      setShowFileUploadMsg(true);
    } else if (!e.target.files[0]) {
      setShowFileUploadMsg(false);
    }
  };
  const clearInputFile = () => {
    setFile(null);
    setShowFileUploadMsg(false);
    setUploadedFileLink(null);
    if (fileInput.current) {
      fileInput.current.value = '';
    }
  };
  const getExtension = (fileName) => {
    const parts = fileName.split(".");
    return parts[parts.length - 1];
  }
  const createNameForFile = (fileName) => {
    const ext = getExtension(fileName)
    const firstLetter = fileName[0]
    const timeStamp = Date.now().toString()
    const randomFrom1To7 = (Math.floor(Math.random() * 8))
    const fileNameWithoutExt = timeStamp.slice(0, randomFrom1To7) + firstLetter + timeStamp.slice(randomFrom1To7)
    const uploadedFileName = fileNameWithoutExt + "." + ext;
    return { uploadedFileName, fileNameWithoutExt }
  }
  const uploadInputFile = async () => {
    const { uploadedFileName, fileNameWithoutExt } = createNameForFile(file.name)
    const res = await uploadFile(file, uploadedFileName)
    setUploadedFileLink(window.location.host + "/" + fileNameWithoutExt);
  }
  return (
    <div className='flex flex-col items-center gap-3 mb-28'>
      <h2 className="text-2xl underline">UPLOAD A FILE</h2>
      <input type="file" onChange={handleChangeInputFile} ref={fileInput} />
      {showFileUploadMsg ? (
        <div className="flex gap-3">
          <button className="rounded-full bg-red-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700 " onClick={clearInputFile}>
            Clear
          </button>
          <button className="rounded-full bg-blue-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-blue-600 active:bg-blue-700 " onClick={uploadInputFile}>
            Upload
          </button>
        </div>
      ) : null}
      {uploadedFileLink ? (
        <div>
          Use this link to share your file. <p>{uploadedFileLink}</p>
        </div>
      ) : null}
    </div>
  );
};

export default FileUpload;
