import React, { useRef, useState } from "react"
import './App.css'
import { storage } from "./firebase"
import { ref, uploadBytes } from "firebase/storage"

function App() {
  const [showFileUploadMsg, setshowFileUploadMsg] = useState(false)
  const [file, setFile] = useState(null)
  const fileInput = useRef(null)

  const handleChangeInputFile = (e) => {
    setFile(e.target.files[0])
    if (e.target.files[0]) {
      setshowFileUploadMsg(true)
    } else if (!e.target.files[0]) {
      setshowFileUploadMsg(false)
    }
  }

  const clearInputFile = () => {
    setFile(null)
    setshowFileUploadMsg(false)
    if (fileInput.current) {
      fileInput.current.value = '';
    }
  }
  const createNameForFile = (fileName) => {
    const ext = getExtension(fileName)
    const firstLetter = fileName[0]
    const timeStamp = Date.now().toString()
    const randomFrom1To7 = (Math.floor(Math.random() * 8))
    console.log(randomFrom1To7);
    const uploadedFileName = timeStamp.slice(0, randomFrom1To7) + firstLetter + timeStamp.slice(randomFrom1To7) + "." + ext;
    return uploadedFileName
  }
  function getExtension(fileName) {
    const parts = fileName.split(".");
    return parts[parts.length - 1];
  }
  const uploadInputFile = () => {
    // console.log(createNameForFile(file.name));
    const fileToUploadRef = ref(storage, "uploads/" + createNameForFile(file.name));
    console.log(fileToUploadRef);
    uploadBytes(fileToUploadRef, file)
      .then((snapshot) => {
        console.log("ok");
      });
  }

  return (
    <>
      <div className='flex flex-col items-center mb-28'><img src="https://firebasestorage.googleapis.com/v0/b/fily-58fcd.appspot.com/o/filydocs%2FLogo-FILY.png?alt=media&token=9f2219b1-3c9c-48ce-8817-e774d018fa83" alt="FILY" className='w-52' /></div>

      <div className='flex flex-col items-center gap-3 mb-28' >
        <h2 className="text-2xl underline" >SHOW FILE</h2>
        <input type="text" className='border-2 border-black w-24' />
        <button className='rounded-xl border-2 border-blue-500 px-5 py-3 text-base font-medium text-blue-500 transition duration-200 hover:bg-blue-600/5 active:bg-blue-700/5'>Recover file</button>
      </div>

      <div className='flex flex-col items-center gap-3 mb-28'>
        <h2 className="text-2xl underline" >UPLOAD A FILE</h2>
        <input type="file" onChange={handleChangeInputFile} ref={fileInput} />
        {
          showFileUploadMsg ?
            <div className="flex gap-3">
              <button className="rounded-full bg-red-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700 " onClick={clearInputFile}>Clear</button>
              <button className="rounded-full bg-blue-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-blue-600 active:bg-blue-700 " onClick={uploadInputFile}>Upload</button>
            </div>
            : null
        }
      </div>

    </>
  )
}

export default App
