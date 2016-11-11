import React, {Component} from 'react';
import './Table.css'

class Table extends Component {

   get data(){
      return this.props.data || {};
   }

   getRows(data) {
      var key, rows = [];
      for (key in data) {
         if (data.hasOwnProperty(key)){
            rows.push(
               <tr key={ key }>
                  <td>{ key }</td>
                  <td>{ data[key] }</td>
               </tr>
            )
         }
      }
      return rows;
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