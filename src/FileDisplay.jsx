import React from "react";

const FileDisplay = ({ fileToShow, fileCodeInput, handleFileCodeInput, recoverFile }) => {
  return (
    <div className='flex flex-col items-center gap-3 mb-12'>
      <h2 className="text-2xl underline">SHOW FILE</h2>
      {fileToShow ? <img src={fileToShow} alt="Uploaded File" /> : null}
      <input type="text" className='border-2 border-black w-40' onChange={handleFileCodeInput} value={fileCodeInput} />
      <button onClick={recoverFile} className='rounded-xl border-2 border-blue-500 px-5 py-3 text-base font-medium text-blue-500 transition duration-200 hover:bg-blue-600/5 active:bg-blue-700/5'>
        Recover file
      </button>
    </div>
  );
};

export default FileDisplay;
