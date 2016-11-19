import React, { Component } from 'react';
import Popup from './Popup.jsx'
import descriptions from '../../descriptions.js'

class PopupManager extends Component {

   constructor(props) {
      super(props);
      this.onActivateData = this.onActivateData.bind(this);
      this.onDeactivateData = this.onDeactivateData.bind(this);
      this.state = {
         popup: {
            visible: false,
            top: 0,
            left: 0,
            content: ''
         }
      }
   }

   onActivateData({namespace, id, clientX, clientY}){
      console.log(namespace, id);
      this.setState({
         popup: {
            visible: true,
            top: clientY + 20,
            left: clientX,
            content: descriptions[namespace][id]['text']
         }
      });
   }

   onDeactivateData(){
      //TODO: onDeactivateData triggers before onPopupMouseEnter for mapWindow
      this.setState({ 
         popup: {
            visible: false
         }
      });
   }

   render() {
      const children = React.Children.map(this.props.children,
         (child) => React.cloneElement(child, {
            onActivateData: this.onActivateData,
            onDeactivateData: this.onDeactivateData
         })
      );

      const popup = this.state.popup;

      return (
         <div className='popup-layout'>
            {children}
            <Popup 
               left={popup.left} 
               top={popup.top} 
               content={popup.content}
               visible={popup.visible}/>
         </div>)
   }
};


export default PopupManager;
