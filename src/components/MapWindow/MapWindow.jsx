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
      this.onGoogleApiLoaded = this.onGoogleApiLoaded.bind(this);
      this.state = {local: true}
   }

   static defaultProps = {
      center: {lat: 57.630563, lng: 39.840892},
      zoom: 12,
      greatPlaceCoords: {lat: 57.626898, lng: 39.877670},
      scrollwheel: false
   };

   onClick() {
      this.map.setCenter(this.props.center);
      this.map.setZoom(this.state.local ? 3 : 12);
   }

   onGoogleApiLoaded(api){
      this.map = api.map;
      this.map.addListener('zoom_changed', function() {
         if (this.map.zoom < 8) {
            this.setState({local: false});
         } else {
            this.setState({local: true});
         }
      }.bind(this));
   }

   render(){
      return (
         <div className="map-wrapper">
            <GoogleMap
               defaultCenter={this.props.center}
               defaultZoom={this.props.zoom}
               options={createMapOptions}
               bootstrapURLKeys={{key: ''}}
               onGoogleApiLoaded={this.onGoogleApiLoaded} 
               yesIWantToUseGoogleMapApiInternals>
            </GoogleMap>
            <Button caption={this.state.local ? 'World' : 'Local'} className="zoom-button" onClick={this.onClick}/>
         </div>
      )
   }
}

export default MapWindow;