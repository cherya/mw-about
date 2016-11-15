import React, {Component} from 'react';
import './Table.css'

class Table extends Component {

   constructor(props) {
      super(props);
      this.onMouseEnter = this.onMouseEnter.bind(this);
      this.onMouseLeave = this.onMouseLeave.bind(this);
   }

   get data(){
      return this.props.data || {};
   }

   get name(){
      return this.props.name || 'table'
   }

   getRows(data) {
      var key, rows = [];
      for (key in data) {
         if (data.hasOwnProperty(key)){
            rows.push(
               <tr key={ key } onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} id={key}>
                  <td>{ key }</td>
                  <td>{ data[key] }</td>
               </tr>
            )
         }
      }
      return rows;
   }

   onMouseEnter({target, clientX, clientY}){
      const id = target.parentElement['id'];
      if (this.props.onActivateData){
         this.props.onActivateData({
            domId: id,
            id: id,
            namespase: this.name,
            clientX: clientX,
            clientY: clientY
         });
      }
   }

   onMouseLeave(){
      this.props.onDeactivateData();
   }

   /**
    * If get string - returns one <th>
    * @param  {Array|String} head th values
    * @return {Array} array of <th>
    */
   getHead(head){
      if (head){
         if (typeof head === 'string'){
            head = [head];
         }
         var header = [];
         for (var i = 0; i < head.length; i++){
            header.push(
                  <th key={i}>{ head[i] }</th>
               );
         }
         return (<tr>{ header }</tr>)
      }
      return;
   }

   render() {
      return (
            <table className="table">
               <thead>{ this.getHead(this.props.head) }</thead>
               <tbody>
                  { this.getRows(this.data) }
               </tbody>
            </table>
      )
   }
}

export default Table;