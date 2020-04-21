import React, { Component } from 'react'
import './App.css';
import TabForm from './components/TabForm';
import TodoControl from './components/TodoControl';
import TabListTodo from './components/TabListTodo';
import { v4 as uuidv4 } from 'uuid';
import { findIndex, filter as filterLodash } from 'lodash';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoLists: [],
      isOpenForm: false,
      todoEdit: {},
      filter: {
        name: '',
        status: -1
      },
      query: '',
      sort: {
        by: '',
        value: 1
      }
    }
  }

  componentDidMount(){
    this.setState({
      todoLists: localStorage.getItem('todoList') ? JSON.parse(localStorage.getItem('todoList')) : []
    })
  }
  

  openForm = () => {
    this.setState({
      isOpenForm: true, 
      todoEdit: {} 
    })
  }

  closeForm = () => {
    this.setState({
      isOpenForm: false
    })

  }

  findIndex = (id) => {
    let currentState = this.state.todoLists;
    let index = currentState.map((todo) => {
      return todo.id
    }).indexOf(id);

    return index;
  }

  removeTodo = (id) => {
    let currentState = this.state.todoLists;
    let index = this.findIndex(id);
    currentState.splice(index, 1);
    this.setState({
      todoLists: currentState
    });
    localStorage.setItem('todoList', JSON.stringify(currentState));
  }

  onUpdateStatus = (id) => {
    
    let currentState = this.state.todoLists;
    // let index = this.findIndex(id);

    let index = findIndex(currentState, (todo) => {
      return todo.id === id;
    });
    console.log(currentState[index]);


    currentState[index].status = !currentState[index].status;
    this.setState({
      todoLists: currentState,
      // todoEdit: {
      //   ...currentState[index],
      //   status: currentState[index].status
      // }
    }, () =>{
      localStorage.setItem('todoList', JSON.stringify(currentState));    
    });
  }
  onSubmitData = (data) => {
    // console.log(data.id);
    if(data.id === undefined || data.id === ''){
      let todo = {
        id: uuidv4(),
        name: data.name,
        status: data.status === "true" ? true : false
      }; 
      let newState = this.state.todoLists.concat(todo);  
      this.setState({
        todoLists: newState,
        todoEdit: {}
      });
      localStorage.setItem('todoList', JSON.stringify(newState));      

    }else{
      let newState = this.state.todoLists;
      let index =  this.findIndex(data.id);
      if(data.status === "true"){
        data.status = true
      }else{
        data.status = false;
      }
      newState[index] = data;
      this.setState({
        todoLists: newState,
        todoEdit: {}
      });
      localStorage.setItem('todoList', JSON.stringify(newState));      
    }    
  }

   onUpdate =  (id) =>{
    let { todoLists } = this.state;
    let index = this.findIndex(id);
    
    this.setState( {
      todoEdit: todoLists[index],
      isOpenForm: true 
    },()=>{
          // console.log(this.state.todoEdit);
      }
    );
  }

  onFilter = (dataFilter) =>{
    let filterStatus = parseInt(dataFilter.filterStatus); 
    this.setState({
      filter:{
        name: dataFilter.filterName,
        status: filterStatus
      } 
    }, ()=>{
      console.log(this.state.filter);
    });
     
  }

  onSearch = (query) => {
    // console.log(query);
    
    this.setState({
      query: query
    })
  }

  onSort = (sortData) => {
    // console.log(sortData);
    
    this.setState({
      sort:{
        by: sortData.by,
        value: sortData.value
      }
    })
  }

  render() {
    let { todoLists, isOpenForm, todoEdit, filter, query, sort } = this.state;

    if(filter.status === -1){
      todoLists = filterLodash(todoLists, (todo) => {
        return todo.name.toLowerCase().includes(filter.name.toLowerCase()); 
      });
      // todoLists = todoLists.filter((todo) => {
      //   return todo.name.toLowerCase().includes(filter.name.toLowerCase()); 
      // });
    }else if(filter.status === 0){
      todoLists = filterLodash(todoLists, (todo) => {
        return  todo.name.toLowerCase().includes(filter.name.toLowerCase()) && todo.status;  
      });
      // todoLists = todoLists.filter((todo) => {
      //   return  todo.name.toLowerCase().includes(filter.name.toLowerCase()) && todo.status; 
      // });
    }else{
      todoLists = filterLodash(todoLists, (todo) => {
        return todo.name.toLowerCase().includes(filter.name.toLowerCase()) && !todo.status;   
      });
      // todoLists = todoLists.filter((todo) => {
      //   return todo.name.toLowerCase().includes(filter.name.toLowerCase()) && !todo.status; 
      // });
    }

    if(query){
      todoLists = filter(todoLists, (todo) => {
        return todo.name.toLowerCase().includes(query.toLowerCase());    
      });
      // todoLists = todoLists.filter((todo) => {
      //   return todo.name.toLowerCase().includes(query.toLowerCase()); 
      // });
    } 

    if(sort.by === 'name'){
      todoLists = todoLists.sort((a, b) => {
        if(a.name.toLowerCase() > b.name.toLowerCase()){
          return sort.value;
        }else{
          return -sort.value;
        }
      });
    }else if(sort.by === 'status'){
      todoLists = todoLists.sort((a, b) => {
        if(a.status > b.status){
          return -sort.value;
        }else{
          return sort.value;
        }
      });
    }else{
      // todoLists = todoLists;
    }

    // console.log(sort);
    

    return (
      <div className="container">
        <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr/>
        </div>
        <div className="row">
            {isOpenForm && (<div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
                <TabForm 
                  onSubmitData = {this.onSubmitData} 
                  closeForm ={ this.closeForm }                   
                  todoEdit = { todoEdit }
                /> 
              </div>)
            }
            
            <div className={isOpenForm ? "col-xs-12 col-sm-12 col-md-12 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                <button type="button" className="btn btn-primary" onClick = { this.openForm }>
                    <span className="fa fa-plus mr-2"></span>Thêm Công Việc
                </button>
                <TodoControl onSearch = { this.onSearch } onSort = { this.onSort }/>
                <div className="row mt-15">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <TabListTodo 
                          todoLists = { todoLists } 
                          removeTodo = { this.removeTodo } 
                          onUpdateStatus = { this.onUpdateStatus }
                          onUpdate = { this.onUpdate }
                          onFilter = { this.onFilter }
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
  }
}

