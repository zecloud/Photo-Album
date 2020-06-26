async function GetNote(idSession){
    const config = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({UserId:"anonymous",SessionId:idSession})
    }
  const response = await fetch(`/api/GetNote/`,config);
  const Note = await response.json();
  //console.log(Note);
  return Note;
}
export default GetNote;