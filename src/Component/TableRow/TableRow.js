import React, { Component } from "react";

class TableRow extends Component {
 
  render() {
    const { selectedRowId } = this.props;
    const rowId = this.props.video.id;
    const highlightClass = selectedRowId === rowId ? "video-row-selected" : "";

    const categories= this.props.video.categories.map(cat=>cat.catName).join(', ');
    
    return (
      <tr onClick={() => this.props.selectRow(rowId)} className={highlightClass} >
        <td>{this.props.video.title}</td>
        <td>{this.props.video.link}</td>
        <td>{categories}</td>
      </tr>
    );
  };
}

export default TableRow;
