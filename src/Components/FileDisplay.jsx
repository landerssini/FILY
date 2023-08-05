import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFileToShow } from "../API/showFiles";

const FileDisplay = ({ setUploadedFileLink }) => {
    const { fileId } = useParams();
    const [fileCodeInput, setFileCodeInput] = useState("");
    const [fileToShow, setFileToShow] = useState();
    const navigate = useNavigate();
    const handleFileCodeInput = (e) => {
        setFileCodeInput(e.target.value);
    };
    useEffect(() => {
        setUploadedFileLink(null);
        if (fileId) {
            showUploadedFile(fileId);
        } else if (!fileId) {
            setFileToShow(null);
        }
    }, [fileId]);
    const recoverFile = () => {
        navigate(`/${fileCodeInput}`);
    };
    const quitFileFromDisplay = () => {
        navigate("/");
    };
    const showUploadedFile = async (fileToShowId) => {
        setFileToShow(null);
        const urlToShow = await getFileToShow(fileToShowId)
        console.log(urlToShow);
        setFileToShow(urlToShow)
    };
    return (
        <div className='flex flex-col items-center gap-3 mb-12'>
            <h2 className="text-2xl underline">SHOW FILE</h2>
            {fileToShow ? <img src={fileToShow} alt="Uploaded File" /> : null}
            <input type="text" className='border-2 border-black w-40' onChange={handleFileCodeInput} value={fileCodeInput} />
            <button onClick={recoverFile} className='rounded-xl border-2 border-blue-500 px-5 py-3 text-base font-medium text-blue-500 transition duration-200 hover:bg-blue-600/5 active:bg-blue-700/5'>
                Recover file
            </button>
            {fileToShow ? <button onClick={quitFileFromDisplay} className='rounded-xl border-2 border-red-500 px-5 py-3 text-base font-medium text-red-500 transition duration-200 hover:bg-blue-600/5 active:bg-blue-700/5'>
                Quit file from display
            </button> : null}
        </div>
    );
};

export default FileDisplay;
