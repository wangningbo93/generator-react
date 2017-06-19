import React from 'react';
import Content from '../Content/Content';
import Footer from '../Footer/Footer';

require("./Todos.scss");
class Todos extends React.Component{
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleNewTodoKeyDown = this.handleNewTodoKeyDown.bind(this);
    this.deleteDom = this.deleteDom.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
    this.completed = this.completed.bind(this);
    this.allData = this.allData.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
    this.state = {
      data:JSON.parse(localStorage.getItem("data")),
      count:this.getCount(JSON.parse(localStorage.getItem("data"))),
      allCompleted:false
    };
  }

  handleChange(e){
    e.preventDefault();
  }

  getCount(data){
    let count = 0;
    data.map((value,index) =>{
      if(value.completed === false){
          count ++;
        }
      }
    )
    return count;
  }

  //回车
  handleNewTodoKeyDown(e){
    if(e.keyCode == 13){
      if(e.target.value!=""){
        this.setState({
          data:this.state.data.concat({
            text:e.target.value,
            completed:false,
            id:new Date().getTime()
          },),
          count:this.state.count+1,
          allCompleted:false
        },() => localStorage.setItem("data", JSON.stringify(this.state.data)));
        e.target.value = "";
      }
    }
  }
  //删除
  deleteDom(data){
    const dataArray = this.state.data.filter((item) => {
      return item !== data.data;
    });
    this.setState({
      data: dataArray,
      count: this.getCount(dataArray)
    },() => localStorage.setItem("data", JSON.stringify(this.state.data)));
  }
  //全选
  toggleAll(e){
    this.state.data.map((value,i) => {
      value.completed = !this.state.allCompleted;
      !this.state.allCompleted?this.state.count--:this.state.count++;
    })

    this.setState({
      allCompleted:!this.state.allCompleted,
      count:this.state.count
    },() => localStorage.setItem("data", JSON.stringify(this.state.data)))
  }
  //切换子checkbox
  toggle(data){
    console.log(data);
    this.state.data.map((value,i) => {
      if(value.id === data.data.id){
        value.completed = !value.completed;
        value.completed?this.state.count--:this.state.count++;
      }
    })

    const tempAllCompleted = this.state.data.every((value,i) => {
      return value.completed === true
    })
    this.setState({
      data:this.state.data,
      allCompleted:tempAllCompleted,
      count:this.state.count
    },() => localStorage.setItem("data", JSON.stringify(this.state.data)))
  }
  //所有的
  allData(){
    this.setState({
      data:JSON.parse(localStorage.getItem("data"))
    });
  }
  //查询完成的
  completed(){
    const unCompleted =  this.state.data.filter((item) => {
      return item.completed === true;
    });
    this.setState({
      data:unCompleted,
    })
  }
  //删除完成的
  clearCompleted(){
    const completed = this.state.data.filter((item) => {
      return item.completed === false;
    });
    this.setState({
      data:completed
    },() => localStorage.setItem("data", JSON.stringify(this.state.data)))
  }
  render(){
    return(
      <div className="wrapper">
        <header>
          <input type="text" className="add-new" placeholder="What needs to be done?" onChange={this.handleChange} onKeyDown={this.handleNewTodoKeyDown} />
        </header>
        <section>
          <div className="wrapper-content">
            <input className="toggle-all" type="checkbox" checked={this.state.allCompleted} onChange={this.toggleAll}/>
            <ul>
              {this.state.data.map((value,i)=>(
                <Content data={value} key={i} onDelete={this.deleteDom} onToggle={this.toggle}/>
                ))}
            </ul>
          </div>
        </section>
        <Footer count={this.state.count} onAll={this.allData} onCompleted={this.completed} onClearCompleted={this.clearCompleted}/>
      </div>
    )
  }
}

export default Todos;
