import React, { useEffect, useRef, useState } from "react";
import './App.css';
import { storage } from "./firebase";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";
import FileDisplay from "./FileDisplay";
import FileUpload from "./FileUpload";

function App() {
  const { fileId } = useParams();
  const [uploadedFileLink, setUploadedFileLink] = useState();
  const [fileToShow, setFileToShow] = useState();
  const [fileCodeInput, setFileCodeInput] = useState("");
  const [showFileUploadMsg, setShowFileUploadMsg] = useState(false);
  const [file, setFile] = useState(null);
  const fileInput = useRef(null);
  const navigate = useNavigate();

  const handleFileCodeInput = (e) => {
    setFileCodeInput(e.target.value);
  };

  const recoverFile = () => {
    navigate(`/${fileCodeInput}`);
  };

  useEffect(() => {
    setUploadedFileLink(null);
    if (fileId) {
      showUploadedFile(fileId);
    } else if (!fileId) {
      setFileToShow(null);
    }
  }, [fileId]);

  const showUploadedFile = async (fileToShowId) => {
    setFileToShow(null);
    const listRef = ref(storage, 'uploads');
    listAll(listRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          const name = itemRef.name.split('.')[0];
          if (name === fileToShowId) {
            getDownloadURL(itemRef)
              .then((url) => { setFileToShow(url) });
          }
        });
      }).catch((error) => {
        console.log(error);
      });
  };

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
    console.log(randomFrom1To7);
    const fileNameWithoutExt = timeStamp.slice(0, randomFrom1To7) + firstLetter + timeStamp.slice(randomFrom1To7)
    const uploadedFileName = fileNameWithoutExt + "." + ext;
    return { uploadedFileName, fileNameWithoutExt }
  }

  const uploadInputFile = () => {
    // console.log(createNameForFile(file.name));
    const { uploadedFileName, fileNameWithoutExt } = createNameForFile(file.name)
    const fileToUploadRef = ref(storage, "uploads/" + uploadedFileName);
    console.log(fileToUploadRef);
    uploadBytes(fileToUploadRef, file)
      .then((snapshot) => {
        setUploadedFileLink(window.location.host + "/" + fileNameWithoutExt);
      });
  }

  return (
    <>
      <div className='flex flex-col items-center mb-28'>
        <img src="https://firebasestorage.googleapis.com/v0/b/fily-58fcd.appspot.com/o/filydocs%2FLogo-FILY.png?alt=media&token=9f2219b1-3c9c-48ce-8817-e774d018fa83" alt="FILY" className='w-52' />
      </div>

      <FileDisplay
        fileToShow={fileToShow}
        fileCodeInput={fileCodeInput}
        handleFileCodeInput={handleFileCodeInput}
        recoverFile={recoverFile}
      />

      <FileUpload
        handleChangeInputFile={handleChangeInputFile}
        fileInput={fileInput}
        showFileUploadMsg={showFileUploadMsg}
        clearInputFile={clearInputFile}
        uploadInputFile={uploadInputFile}
        uploadedFileLink={uploadedFileLink}
      />
    </>
  );
}

export default App;

