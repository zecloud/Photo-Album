import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState,useEffect } from 'react';
import useInterval from './useInterval'

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

function TitleNote(props) {
  const [value, setValue] = useState('');
  const [saved,setSaved] = useState('');

  const [session] =useState(props);
  useEffect(() => {
    //console.log(value);

    //console.log(props.idsession);
    //console.log(props);
    //console.log(this.props.idsession)
  },[value]);

  useInterval(() => {    // Votre logique métier ici   
    //console.log(session.idsession);
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
    <ReactQuill theme="snow" value={value} onChange={setValue}/>
  );
}
export default TitleNote;