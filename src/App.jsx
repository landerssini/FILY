import React, { useState } from "react";
import './App.css';
import FileDisplay from "./Components/FileDisplay";
import FileUpload from "./Components/FileUpload";

function App() {
  const [uploadedFileLink, setUploadedFileLink] = useState();
  const [showFileUploadMsg, setShowFileUploadMsg] = useState(false);

 
return (
    <>
      <div className='flex flex-col items-center mb-28'>
        <img src="https://firebasestorage.googleapis.com/v0/b/fily-58fcd.appspot.com/o/filydocs%2FLogo-FILY.png?alt=media&token=9f2219b1-3c9c-48ce-8817-e774d018fa83" alt="FILY" className='w-52' />
      </div>

      <FileDisplay
        setUploadedFileLink={setUploadedFileLink}
      />

      <FileUpload
        showFileUploadMsg={showFileUploadMsg}
        setShowFileUploadMsg={setShowFileUploadMsg}
        setUploadedFileLink={setUploadedFileLink}
        uploadedFileLink={uploadedFileLink}
      />
    </>
  );
}

export default App;

