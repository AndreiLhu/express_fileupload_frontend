import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState();
  const [fileUpload, setFileUpload] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setFileUpload(true);
  };

  const handleSubmission = () => {
    const formData = new FormData();

    formData.append('File', selectedFile);

    fetch('http://localhost:5001/upload_files', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="container">
      <h1>File Upload</h1>
      <form encType="multipart/form-data" action="/upload_files" id="form">
        <div className="input-group">
          <input type="file" name="file" onChange={changeHandler} />
          {fileUpload ? (
            <div>
              <p>Filename: {selectedFile.name}</p>
              <p>Filetype: {selectedFile.type}</p>
              <p>Size in bytes: {selectedFile.size}</p>
              <p>
                lastModifiedDate:
                {selectedFile.lastModifiedDate.toLocaleDateString()}
              </p>
            </div>
          ) : (
            <p>Select a file to show details</p>
          )}
          <div>
            <button onClick={handleSubmission}>Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
