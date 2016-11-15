import React, { Component } from 'react';
import './Popup.css'

class Popup extends Component {
   
   getStyles(){
      return {
         zIndex: 10,
         position: 'fixed',
         top: this.props.top || 0,
         left: this.props.left || 0,
         display: this.props.visible ? 'block' : 'none'
      }
   }

   render() {
      return (
         <div className="popup" style={this.getStyles()} 
            onMouseEnter={this.props.onMouseEnter}
            onMouseLeave={this.props.onMouseLeave}>
            {this.props.content}
         </div>
      );
   }
};


export default Popup;
