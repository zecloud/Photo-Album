import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState,useEffect } from 'react';
import useInterval from './useInterval'
import GetNote from './GetNote'
async function SaveNote(idSession,title){
  const config = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({UserId:"anonymous",SessionId:idSession,title:title})
  }
const response = await fetch(`/api/SaveNote/`,config);
const sas = await response.text();
console.log(sas);
//return sas;
}

const TitleNote = (props) =>{
  const [value, setValue] = useState(props.title);
  const [saved,setSaved] = useState('');
  const [reload] = useState(props.reload);
  const [session] =useState(props);
  useEffect(() => {
    if(reload)
    {
      
      //console.log(short().toUUID(props.SessionId))
      //this.setState((state)=>{state.uuid=short().toUUID(props.SessionId)});
      async function fetchNote() {
        const note =await GetNote(session.idsession);
       
        if(note)
        {
          
          setValue(note.title);
         
          //console.log(this.state);
        }
      }
      fetchNote();
       
    }
    //console.log(value);
    //console.log(reload);
    //console.log(props.idsession);
    //console.log(props);
    //console.log(this.props.idsession)
  },[reload,session]);

  useInterval(() => {    // Votre logique métier ici   
    //console.log(props);
    //console.log(value);
    //console.log(saved);
    if(value!==saved)
    {
      SaveNote(session.idsession,value);
      setSaved(value);
    }
   }
    ,10000);

  return (
    <ReactQuill theme="snow" value={value} defaultValue={props.title} onChange={setValue}/>
  );
  }
export default TitleNote;