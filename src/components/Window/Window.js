import React, { Component } from 'react';
import './Window.css';
import Rnd from 'react-rnd'
const PropTypes = React.PropTypes

const propTypes = {
   id: PropTypes.any.isRequired,
   width: PropTypes.number.isRequired,
   height: PropTypes.number.isRequired,
   top: PropTypes.number.isRequired,
   left: PropTypes.number.isRequired,
   children: PropTypes.node,
};

class Window extends Component {

   constructor(props) {
      super(props);
      this.onResizeStart = this.onResizeStart.bind(this);
      this.onResizeStop = this.onResizeStop.bind(this);
      this.onDragStart = this.onDragStart.bind(this);
      this.onDragStop = this.onDragStop.bind(this);
      this.onClick = this.onClick.bind(this);
      
      this.state = {
         isMoving: false
      }
   }

   getStyles() {
      return {
         width: "100%",
         height: "100%"
      }
   }

   getResizerHandleStyles() {
      return {
         top: {
            position: 'absolute',
            width: '100%',
            height: '4px',
            top: '0',
            left: '0',
            cursor: 'row-resize',
         },
         left: {
            position: 'absolute',
            width: '4px',
            height: '100%',
            top: '0',
            left: '0',
            cursor: 'col-resize',
         },
         bottom: {
            position: 'absolute',
            width: '100%',
            height: '4px',
            bottom: '0',
            left: '0',
            cursor: 'row-resize',
         },
         right: {
            position: 'absolute',
            width: '4px',
            height: '100%',
            top: '0',
            right: '0',
            cursor: 'col-resize',
         },
         topRight: {
            position: 'absolute',
            width: '10px',
            height: '10px',
            right: '0',
            top: '0',
            cursor: 'ne-resize'
         },
         topLeft: {
            position: 'absolute',
            width: '10px',
            height: '10px',
            left: '0',
            top: '0',
            cursor: 'nw-resize'
         },
         bottomLeft: {
            position: 'absolute',
            width: '10px',
            height: '10px',
            left: '0',
            bottom: '0',
            cursor: 'sw-resize'
         },
         bottomRight: {
            position: 'absolute',
            width: '10px',
            height: '10px',
            right: '0',
            bottom: '0',
            cursor: 'se-resize'
         }
      }  
   }

   onResizeStart(direction, styleSize, clientSize, event) {
      this.props.onResizeStart(this.props.id, direction, styleSize, clientSize, event);
   }

   onResizeStop(direction, styleSize, clientSize, event) {
      this.props.onResizeStop(this.props.id, direction, styleSize, clientSize, event);
   }

   onDragStart(event, ui) {
      this.props.onDragStart(this.props.id, event, ui);
   }

   onDragStop(event, ui) {
      this.props.onDragStop(this.props.id, event, ui);
   }

   onClick(){
      this.props.onClick(this.props.id);
   }

   render() {
      const classes = this.props.className ? 'window ' + this.props.className: 'window';
      return (
            <Rnd initial={{
                   x: this.props.left,
                   y: this.props.top,
                   width: this.props.width,
                   height: this.props.height
                 }}
                 zIndex={this.props.zIndex}
                 minWidth={this.props.minWidth}
                 minHeight={this.props.minHeight}
                 maxWidth={this.props.maxWidth}
                 maxHeight={this.props.maxHeight}
                 bounds={'parent'}
                 resizerHandleStyle={this.getResizerHandleStyles()}
                 dragHandlerClassName='.window-title-wrapper'
                 onResizeStart={this.onResizeStart}
                 onResizeStop={this.onResizeStop}
                 onDragStart={this.onDragStart}
                 onDragStop={this.onDragStop}
                 onClick={this.onClick}>
                     <div className={classes} style={ this.getStyles() }>
                        <div className="window-title-wrapper"><div className="window-title">{ this.props.title }</div></div>
                        <div className="widnow-wrapper">
                           { this.props.children }
                        </div>
                     </div>
            </Rnd>
      );
   }
}

Window.propTypes = propTypes;

export default Window;
