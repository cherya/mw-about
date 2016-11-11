import React, { Component } from 'react';
import './StatusBar.css';

class StatusBar extends Component {

   getStyles() {
      return {
         backgroundColor: this.props.color,
         width: (this.props.value / this.maxValue) * 100 + '%'
      }
   }

   get maxValue(){
      return this.props.maxValue || 100;
   }

   render() {
      return (
         <div className="statusbar tiny-border">
            <div className="statusbar-percentage" style={ this.getStyles() } >
               <div className="statusbar-gradient"></div>
            </div>
            <div className="statusbar-value"> { this.props.value + '/' + this.maxValue }</div>
         </div>
      );
   }
}

export default StatusBar;
