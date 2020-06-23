import React from 'react';
import Headroom from 'react-headroom'
import ballon from './ballon.svg';

class header extends React.Component {

    render  () {
        return (
        <div>
        <Headroom>
            <nav class="navbar navbar-dark bg-dark">
            <a class="navbar-brand"  href="/"  >
                <img src={ballon}  className="App-logo" width="50" height="50" alt=""/>
                </a>
            
                <a class="navbar-text" href="/">80 jours !</a>
            </nav>
            </Headroom> 
            </div>
            )}
}
export default header;