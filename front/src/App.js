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
  <FilePond allowMultiple={true}  allowFileTypeValidation={true} acceptedFileTypes={['image/jpeg']} 
        // ref={ref => this.pond = ref}
        oninit={() => {
            
        } }
        onprocessfile={(filetoprocess,err)=>{
            
        }}
        

        server={
            {    

                 process: async(fieldName, file, metadata, load, error, progress, abort) =>   {
                  const config = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({container:'img',blobName:file.name,permission:'awl'})
                  }
                  //console.log(file)
                  const response = await fetch(`/api/sas/`,config);
                  const sas = await response.json();
                 
                  //metadata.setMetadata("url",sas.url);
                  //file.setMetadata("url",sas.url);
                  console.log(sas);
                  // const configUpload  = {
                  //   method: 'PUT',
                  //   headers:{
                  //     'Content-Type': file.type,
                  //     'x-ms-blob-type':'BlockBlob'
                  //   },
                  //   body:file
                  // }
                  // const uploadSuccess = await fetch(sas.uri,configUpload);
                  // const isSuccess  = await uploadSuccess;
                  // console.log(isSuccess);


                  //this.setState({ data: json });
                   // fieldName is the name of the input field
                    // file is the actual file object to send
                    // const formData = new FormData();
                    // formData.append(fieldName, file, file.name);

                  const request = new XMLHttpRequest();
                    // const url =process.env.REACT_APP_UPLOAD //'https://wgtempupload.azurewebsites.net/api/fpupload/'
                    // const insta = document.getElementById("insta").value//document.getElementById("insta").value=="" ? document.getElementById("insta").value :document.getElementById("insta").defaultvalue
                    // const tosend= url+insta+"-"+file.name.toLowerCase();
                    // const auth = new Auth();
                    // const uid=auth.currentUser().id;//'260717ac-9153-4d35-9683-d1459be8b35d';
                  request.open('PUT',sas.uri );
                  request.setRequestHeader('Content-Type',file.type);
                  request.setRequestHeader('x-ms-blob-type','BlockBlob');
                    // // Should call the progress method to update the progress to 100% before calling load
                    // // Setting computable to false switches the loading indicator to infinite mode
                  request.upload.onprogress = (e) => {
                      progress(e.lengthComputable, e.loaded, e.total);
                  };

                    // // Should call the load method when done and pass the returned server file id
                    // // this server file id is then used later on when reverting or restoring a file
                    // // so your server knows which file to return without exposing that info to the client
                  request.onload = function() {
                      if (request.status >= 200 && request.status < 300) {
                          // the load method accepts either a string (id) or an object
                          load(request.responseText);
                      }
                      else {
                          // Can call the error method if something is wrong, should exit after
                          error('oh no');
                      }
                  };

                  request.send(file);
                    
                    // // Should expose an abort method so the request can be cancelled
                  return {
                      abort: () => {
                          // This function is entered if the user has tapped the cancel button
                          request.abort();

                          // Let FilePond know the request has been cancelled
                          abort();
                      }
                  };
        
               }
            }
        }/>
</div>
    </div>
  );
}

export default App;
