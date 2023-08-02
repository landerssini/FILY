import React from "react";

const FileUpload = ({ handleChangeInputFile, fileInput, showFileUploadMsg, clearInputFile, uploadInputFile, uploadedFileLink }) => {
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
