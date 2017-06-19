import React from 'react';
require("./Header.scss");
class Header extends React.Component{
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleNewTodoKeyDown = this.handleNewTodoKeyDown.bind(this);
    this.state = {
      text:"",
      data:["a","b"],
    };
  }

  handleChange(e){
    e.preventDefault();
    this.setState({
      text:e.target.value,
    })
  }

  handleNewTodoKeyDown(e){
    if(e.keyCode == 13){
      console.log("您点击回车了!!!");
      if(e.target.value!=""){
        this.setState({
          data:this.state.data.concat({
            text:this.state.text,
          })
        },() => console.log(this.state.data));
        e.target.value = "";
      }
    }
  }

  render(){
    return(
      <div className="wrapper">
        <header>
          <input type="text" className="add-new" placeholder="What needs to be done?" onChange={this.handleChange} onKeyDown={this.handleNewTodoKeyDown} />
        </header>
      </div>
    )
  }
}

export default Header;
