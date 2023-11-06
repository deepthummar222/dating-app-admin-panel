import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

import './DropzoneStyles.css';

const Fav = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setUploadedFiles(acceptedFiles);
  }, []);

  const uploadFiles = async () => {
    const formData = new FormData();
    uploadedFiles.forEach((file) => {
      formData.append('image', file);
    });

    try {
      await axios.post('http://localhost:3001/api/v1/s3/upload-s3-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Images uploaded successfully!');
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images.');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      {uploadedFiles.length > 0 && (
        <div>
          <h2>Uploaded Files:</h2>
          <ul>
            {uploadedFiles.map((file) => (
              <li key={file.name}>{file.name}</li>
            ))}
          </ul>
          <button onClick={uploadFiles}>Upload</button>
        </div>
      )}
    </div>
  );
};

export default Fav;