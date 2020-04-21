import React, { Component } from 'react'
import TodoItem from './TodoItem';
export default class TabListTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1
        }
    }
    
    handleChangeInput = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            this.props.onFilter(this.state);
        });
    }

    render() {
        let { todoLists, removeTodo, onUpdateStatus, onUpdate } = this.props;
        let { filterName, filterStatus } = this.state;
        return (
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Tên</th>
                        <th className="text-center">Trạng Thái</th>
                        <th className="text-center">Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="filterName"
                                value={ filterName || ''}
                                onChange = { this.handleChangeInput }
                            />
                        </td>
                        <td>
                            <select 
                                className="form-control" 
                                name="filterStatus"
                                value={ filterStatus }
                                onChange = { this.handleChangeInput }
                            >
                                <option value={-1}>Tất Cả</option>
                                <option value={0}>Hoàn thành</option>
                                <option value={1}>Chưa hoàn thành</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>

                    {
                        todoLists.map((todiList, index) => {
                            return <TodoItem key={todiList.id} index={index} 
                            todiList={todiList} 
                            removeTodo = { removeTodo }
                            onUpdateStatus = { onUpdateStatus }
                            onUpdate = { onUpdate }
                            />
                        })
                    }
                    
                </tbody>
            </table>
        )
    }
}
