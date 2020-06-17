import React from 'react';
import ballon from './ballon.svg';
import './App.css';
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        80 jours !
        <img src={ballon} className="App-logo" alt="logo" />
        <p>
          Upload your photos below 
        </p>
       
      </header>
<div>
  <FilePond></FilePond>
</div>
    </div>
  );
}

export default App;
