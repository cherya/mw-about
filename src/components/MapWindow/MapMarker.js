import React, {Component} from 'react';

class MapWindow extends Component {

   render(){
      return (
         <div className="map-marker" id={this.props.id}></div>
      )
   }
}

export default MapWindow;