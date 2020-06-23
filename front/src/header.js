import React from 'react';
import Headroom from 'react-headroom'
import ballon from './ballon.svg';

class header extends React.Component {

    render  () {
        return (
        <div>
        <Headroom>
            <nav class="navbar navbar-dark bg-dark">
            <a class="navbar-brand" href="/"  >
                <img src={ballon}  width="50" height="50" alt=""/>
                </a>
            
            </nav>
            </Headroom> 
            </div>
            )}
}
export default header;