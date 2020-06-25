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
export default getSas;