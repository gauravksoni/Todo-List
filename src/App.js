import React, { Component } from 'react';
import ReactDom from 'react-dom';
import './Style/App.css';
import './Style/Animate.css';

class App extends Component {

  constructor(){
    super();
    this.state={
      todo:[],
      value: '',
      todoedit:" "
    };
  };

  entertodo(keypress){
    var Todo=this.refs.inputodo.value;
    if( keypress.charCode === 13 )
    {
      this.setState({
        todo: this.state.todo.concat({Value:Todo, checked:false, editing:false})
      });
      this.refs.inputodo.value=null;
    };
  };

  todo(todo,i){
    return (
      <li>
        <div>
          <div onClick={this.todoCompleted.bind(this, i)} onDoubleClick={this.editing.bind(this, i)}
            key={todo.id}  className={todo.checked===true? 'line':'newtodo'} >
            <input type="checkbox" className="option-input checkbox" checked={todo.checked} />
            {todo.editing && (this.editmode(i))}
            {!todo.editing && (todo.Value)}
          </div>
          <div className="item">
            <span className="destroy" onClick={this.remove.bind(this, i)}>X</span>
          </div>
        </div>
      </li>
    );
  };

  remove(i){
    this.state.todo.splice(i,1)
    this.setState({todo:this.state.todo})
  };

  todoCompleted(i){
    var { todo }=this.state;
    todo[i].checked =todo[i].checked? false:true;
    this.setState({
      todo
    });
   };

  allCompleted=()=>{
    var todo = this.state.todo;
    var _this = this
    todo.forEach(function(item) {
      item.className = _this.state.finished ? "newtodo" : "line"
      item.checked = !_this.state.finished
    })
    this.setState({todo: todo, finished: !this.state.finished})
  };

  changeValue(e) {
    this.setState({
      value: this.state.value = e.target.value
    });
  };

  editing=(i)=>{
    var { todo }=this.state;
    todo[i].editing=!todo[i].editing;
    this.setState({
      todo
    });
  };

  editmode=(i)=>{
    return (
      <div>
        <input onChange={this.newTodoText}  className="editodo" ref="newtext" value={this.state.todoedit}
          onKeyPress={this.updatedtodo.bind(this,i)} />
      </div>
    )
  };

  newTodoText=()=>{
    this.setState({
      todoedit:event.target.value
    })
  };

  updatedtodo=(i,keypress)=>{
    if(keypress.charCode===13){
      var { todo } = this.state;
      var newtext= this.refs.newtext.value;
      todo[i].Value = newtext;
      todo[i].editing=!todo[i].editing;
      this.setState({todo})
    }
  };

  render() {
    return (
      <div>
        <h1 id='heading'>todos</h1>
        <div className="lines"></div>
        <div>
          <input type="text" ref= "inputodo" onKeyPress={this.entertodo.bind(this)}className="inputodo" placeholder='todos'/>
          <span onClick={this.allCompleted}id="all">^</span>
        </div>
        <div className="mainapp">
          <ul className="decor">
            {this.state.todo.map(this.todo.bind(this))}
          </ul>
        </div>
      </div>
      );
    };
  }

  export default App;
