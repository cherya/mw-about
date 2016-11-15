import React, {Component} from 'react';
import GoogleMap from 'google-map-react';
import MapTheme from './MapTheme.js';
import Button from '../Button/Button.js';
import MapMarker from './MapMarker.js'
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
      this.onButtonClick = this.onButtonClick.bind(this);
      this.onChange = this.onChange.bind(this);
      this.onChildMouseEnter = this.onChildMouseEnter.bind(this);
      this.onChildMouseLeave = this.onChildMouseLeave.bind(this);
      this.state = {
         zoom: this.props.zoom,
         center: this.props.center
      }
   }

   LOCAL_ZOOM = 12
   WORLD_ZOOM = 3
   ZOOM_THRESHHOLD = 7
   MARKER_PREFIX = 'map-marker-';

   static defaultProps = {
      center: {lat: 57.630563, lng: 39.840892},
      zoom: 12,
      scrollwheel: false
   };

   onButtonClick() {
      this.setState((prevState, props) => ({
         zoom: prevState.zoom > this.ZOOM_THRESHHOLD ? this.WORLD_ZOOM : this.LOCAL_ZOOM,
         center: props.center
      }));
   }

   onChange({center, zoom, bounds, marginBounds}){
      if (zoom !== this.state.zoom){
         this.onZoomChange(zoom);
      }
   }

   onZoomChange(zoom){
      this.setState({zoom: zoom})
   }

   onChildMouseEnter(id){
      this.props.onActivateData({
         domId: this.MARKER_PREFIX + id,
         namespace: 'map',
         id: id
      });
   }

   onChildMouseLeave(){
      this.props.onDeactivateData();
   }

   render(){

      const places = [];
      for (let i = 0; i < this.props.places.length; i++){
         const place = this.props.places[i];
         places.push(
               <MapMarker lat={place.lat} lng={place.lng} key={i} id={this.MARKER_PREFIX + i}/>
            )
      }

      return (
         <div className="map-wrapper">
            <GoogleMap
               defaultCenter={this.props.center}
               defaultZoom={this.props.zoom}
               zoom={this.state.zoom}
               onChange={this.onChange}
               options={createMapOptions}
               bootstrapURLKeys={{key: ''}}
               onChildMouseEnter={this.onChildMouseEnter}
               onChildMouseLeave={this.onChildMouseLeave}
               onGoogleApiLoaded={this.onGoogleApiLoaded} 
               yesIWantToUseGoogleMapApiInternals>
               {places}
            </GoogleMap>
            <Button caption={this.state.zoom > this.ZOOM_THRESHHOLD ? 'World' : 'Local'} 
                    className="zoom-button" 
                    onClick={this.onButtonClick}/>
         </div>
      )
   }
}

export default MapWindow;