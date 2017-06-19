import React from 'react';
require("./Content.scss");

class Content extends React.Component{
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <li>
        <input type="checkbox" className="toggle" checked={this.props.data.completed} onChange={() => this.props.onToggle(this.props)}/>
        <label>{this.props.data.text}</label>
        <button className="destroy" onClick={() => this.props.onDelete(this.props)}>x</button>
      </li>
    )
  }
}

export default Content;
