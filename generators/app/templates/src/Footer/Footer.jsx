import React from 'react';
require('./Footer.scss');
class Footer extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <footer>
        <span>{this.props.count}items left</span>
        <a onClick = {() => this.props.onAll()}>All</a>
        <a onClick = {() => this.props.onCompleted()}>Completed</a>
        <a onClick = {() => this.props.onClearCompleted()}>Clear Completed</a>
      </footer>
    )
  }
}

export default Footer;
