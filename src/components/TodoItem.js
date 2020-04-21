import React, { Component } from 'react'

export default class TodoItem extends Component {
    render() {      
        let { todiList, index, removeTodo, onUpdateStatus, onUpdate } = this.props;
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{todiList.name}</td>
                <td className="text-center">
                    <span 
                    className={todiList.status ? "btn btn-success" : "btn btn-danger"}
                    onClick = {() => onUpdateStatus(todiList.id) }
                    >
                    {todiList.status ? 'Hoàn thành' : 'Chưa hoàn thành'}
                    </span>
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning" onClick={() => onUpdate(todiList.id)}>
                        <span className="fa fa-pencil mr-2"></span>Sửa
                    </button>
                    &nbsp;
                    <button type="button" className="btn btn-danger" onClick={() => removeTodo(todiList.id)}>
                        <span className="fa fa-trash mr-2"></span>Xóa
                    </button>
                </td>
            </tr>
        )
    }
}
