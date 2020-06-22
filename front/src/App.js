import React from 'react';
import ballon from './ballon.svg';
import './App.css';
// import Uploader from './uploader'
import Gallery from './gallery'
import SimpleReactLightbox from "simple-react-lightbox";
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
// Import the plugin code
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
// Import the plugin code
import FilePondPluginImageResize from 'filepond-plugin-image-resize';


// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview,FilePondPluginImageTransform,FilePondPluginImageResize);

async function  getSas(fileName,permissions='r'){
  const config = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({container:'img',blobName:fileName,permission:permissions})
}
//console.log(file)
//console.log(metadata);

const response = await fetch(`/api/sas/`,config);
const sas = await response.json();
return sas;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {photos: []};  
  }

  render() {
//function App() {
  return (
    <div className="App">
      <header className="App-header">
        80 jours !
        <img src={ballon} className="App-logo" alt="logo" />
        <p>
          Upload your photos below 
        </p>
       
      </header>
      {/* <Uploader/> */}
      <div>
    <FilePond allowMultiple={true}  maxFiles={10} allowFileTypeValidation={true} acceptedFileTypes={['image/jpeg']} 
            allowImageTransform={true}
            allowImageResize={true}
            imageResizeTargetWidth={64}
            imageTransformVariantsIncludeOriginal={true}
            imageResizeUpscale={false}
            imageTransformVariants ={{'thumb_medium_': transforms => {
              transforms.resize.size.width = 494;
              return transforms;
          }}}

            ref={ref => this.pond = ref}
            oninit={() => {
                
            } }
            oninitfile={async (file)=>{
                console.log(file.filename)
                

                file.setMetadata("id",file.id);
            }}
            onprocessfile={async (error,fileprocessed)=>{
                //console.log(error);
                console.log(fileprocessed);
                //console.log(fileprocessed.serverId);
                const urisas =await getSas('medium_'+fileprocessed.serverId);
                const urisaslowres= await getSas('small_'+fileprocessed.serverId); 
                console.log(urisas);
                this.setState((state, props) => (
                  {photos:state.photos.concat({
                  key:fileprocessed.id,
                  src:urisas.uri,
                  lowResSrc : urisaslowres.uri
                })
              })
                );
                this.pond.removeFile(fileprocessed.id);
            }}
            onaddfile={(error,fileloaded)=>{
              //console.log(fileloaded);
            }
          }

            server={
                {    

                    process: async(fieldName, file, metadata, load, error, progress, abort) =>   {
                    

                    const original_filename= file[0].file.name;
                    const sas = await getSas(original_filename,'awl');
                    const sasThumbnail= await getSas('small_'+original_filename,'awl');
                    const sasMedium = await  getSas('medium_'+original_filename,'awl');
                    async function upload(fileToUpload,sasUri){
                      const configUpload  = {
                        method: 'PUT',
                        headers:{
                          'Content-Type': fileToUpload.type,
                          'x-ms-blob-type':'BlockBlob'
                        },
                        body:fileToUpload
                      }
                      const uploadSuccess = await fetch(sasUri,configUpload);
                      const isSuccess  = await uploadSuccess;
                      console.log(isSuccess);
                    }
                    //this.props 
                    //metadata.setMetadata("url",sas.url);
                    //file.setMetadata("url",sas.url);
                    //console.log(sas);
                   await upload(file[1].file,sasThumbnail.uri);
                   await upload(file[2].file,sasMedium.uri);
                    

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
                    request.setRequestHeader('Content-Type',file[0].file.type);
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
                            //load(request.responseText);
                            //const ret ={'src':request.responseURL,"srcsmall":sasThumbnail.uri};
                            //console.log(ret)
                           
                            load(original_filename);//request.responseURL

                        }
                        else {
                            // Can call the error method if something is wrong, should exit after
                            error('oh no');
                        }
                    };

                    request.send(file[0].file);
                        
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
    <SimpleReactLightbox>
      <Gallery images={this.state.photos}/>
      </SimpleReactLightbox>
    </div>
  );
  }
}

export default App;
