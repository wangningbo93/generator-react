import React from 'react';
require("./Main.scss");
let url = require("file-loader!../img/hello.jpg");
class Main extends React.Component{
  render() {
   return(
    <div>
      <span className="demo">hello React!!!</span>
      <img src={url}/>
    </div>)
  }
}

export default Main;
