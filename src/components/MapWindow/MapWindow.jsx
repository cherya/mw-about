import React, {Component} from 'react';
import GoogleMap from 'google-map-react';
import MapTheme from './MapTheme.js';
import Button from '../Button/Button.js';
import './MapWindow.css'

function createMapOptions(maps) {
  return {
      styles: MapTheme,
      disableDefaultUI: true
  };
}

class MapWindow extends Component {

   constructor(props) {
      super(props);
      this.onClick = this.onClick.bind(this);
      this.state = {}
   }

   static defaultProps = {
      center: {lat: 57.630563, lng: 39.840892},
      zoom: 12,
      greatPlaceCoords: {lat: 57.626898, lng: 39.877670},
      scrollwheel: false
   };

   onClick() {
      console.log('click');
   }

   render(){
      return (
         <div className="map-wrapper">
            <GoogleMap
               onGoogleApiLoaded={this.onApiLoaded}
               defaultCenter={this.props.center}
               defaultZoom={this.props.zoom}
               options={createMapOptions}
               bootstrapURLKeys={{key: ''}}>
            </GoogleMap>
            <Button caption="Global" className="zoom-button" onClick={this.onClick}/>
         </div>
      )
   }
}

export default MapWindow;