import React, { useState,useEffect} from 'react';
import getSas from './getSas';
import GetNote from './GetNote'
// import ballon from './ballon.svg';
import './App.css';
import short from 'short-uuid';
//import { createPortal } from 'react-dom';
//import { useParams} from 'react';
import Gallery from './gallery';
import SimpleReactLightbox from "simple-react-lightbox";

const SharedNote = ( props) => {
    
    //const SessionId =  props.SessionId;
    const [Note, setNote] = useState('');
    const [Photos,setPhotos]=useState([]);
    useEffect(() => {
        setNote({title:' <img src="/ballon.svg"  class="App-logo" width="100" height="100" alt=""/>'});
        //console.log(Note);
        const longuuid = short().toUUID(props.SessionId);
        //short-uuid
        const fetchNote = async ()=> {
            const Note =await GetNote(longuuid);
            setNote(Note);
        }
        fetchNote();
      }, [props]);
    useEffect(() => {
        if(Note)
        {
            //console.log(Note);
            var Photos =[];
            if(Note.photo)
            {
            Note.photo.forEach(async (ph) => {
                console.log(ph);

                const sasthumb = await getSas('small_'+ph.filename,'r');
                const sas = await getSas(ph.filename,'r');
                Photos =Photos.concat({
                  key:ph.filename,
                  lowResSrc : sasthumb.uri,
                  originalSrc : sas.uri
                })
                setPhotos(Photos);
            });
          }
        }
      }, [Note]);
    //const params = useParams();
    //console.log(photos);
    return (
       
        <div>
     
        <div dangerouslySetInnerHTML={{ __html: Note.title }} ></div>
   
    <SimpleReactLightbox>
      <Gallery images={Photos}/>
      </SimpleReactLightbox>
        </div>
  )
}
export default SharedNote;