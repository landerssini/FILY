import './App.css'

function App() {

  return (
    <>
      <div className='flex flex-col items-center mb-28'><img src="https://firebasestorage.googleapis.com/v0/b/fily-58fcd.appspot.com/o/filydocs%2FLogo-FILY.png?alt=media&token=9f2219b1-3c9c-48ce-8817-e774d018fa83" alt="FILY" className='w-52'/></div>

      <div className='flex flex-col items-center gap-3 mb-28' >
        SHOW FILE
        <input type="text" className='border-2 border-black w-24'/>
        <button className='border-2 border-black'>Recover file</button>
      </div>

      <div className='flex flex-col items-center gap-3 mb-28'>
        UPLOAD A FILE
        <input type="file" />
      </div>

    </>
  )
}

export default App
