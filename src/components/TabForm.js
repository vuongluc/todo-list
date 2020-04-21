import React, { Component } from 'react'

export default class TabForm extends Component {
    constructor(props) {
        super(props);
        this.state={
            id:'',
            name: '',
            status: false,
            isRequiredName: false
        }
    }

    componentDidMount(){
        if(this.props.todoEdit){
            this.setState({
                id: this.props.todoEdit.id,
                name: this.props.todoEdit.name,
                status: this.props.todoEdit.status
            })
        }
    }
    // componentWillReceiveProps(nextProps){
    //     if(nextProps && nextProps.todoEdit){
    //         this.setState({
    //             id: nextProps.todoEdit.id,
    //             name: nextProps.todoEdit.name,
    //             status: nextProps.todoEdit.status
    //         })
    //     }
    // }

    // mục tiêu xử lý ở hàm này là những return giá trị state sẽ bị thay đổi khi prop thay đổi
    static getDerivedStateFromProps(nextProps, prevState){
        if (nextProps.todoEdit.id !== prevState.id){
            return { 
                id: nextProps.todoEdit.id,
                name: nextProps.todoEdit.name,
                status: nextProps.todoEdit.status
            };
        }
        else return null;
    }
    
    // ở đây chúng ta sẽ set state
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.todoEdit !== this.props.todoEdit) {
            // Thục hiện update state
            this.setState({
                id: this.props.todoEdit.id,
                name: this.props.todoEdit.name,
                status: this.props.todoEdit.status
            })
        }
    }

    // componentDidUpdate(nextProps) {
    //     const { todoEdit } = this.props;
    //     if (nextProps.todoEdit !== todoEdit) {
    //         if (todoEdit) {
    //             this.setState({ 
    //                 id: this.props.todoEdit.id,
    //                 name: this.props.todoEdit.name,
    //                 status: this.props.todoEdit.status
    //             })
    //         }
    //     }
    // }
  
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value 
        })
    }

    onClear = () => {
        this.setState({
            name: '',
            status: false
        })
    }

    handleSubmitForm = (e) =>{
        e.preventDefault();
        console.log(this.state.name);
        
        if(this.state.name !== '' && this.state.name !== undefined){
            this.props.onSubmitData(this.state);
            console.log(this.state);
            this.props.closeForm(); 
        }else{
            this.setState({
                isRequiredName: true
            })
        }
                      
    }

    render() {        
        return (
            <div className="card card-warning">
                <div className="card-header">
                    <h3 className="card-title">{this.state.id ? 'Cập nhật công việc' : 'Thêm Công Việc'} <span className="fa fa-times-circle text-right" onClick={ this.props.closeForm }></span></h3>
                </div>
                <div className="card-body">
                    <form onSubmit={ this.handleSubmitForm }>
                        {
                        this.state.isRequiredName && <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                Vui lòng nhập tên công việc! <span className="fa fa-times-circle text-right" onClick={() => this.setState({isRequiredName: false}) }></span> 
                            </div>
                        </div>
                        }
                        <div className="form-group">
                            <label>Tên :</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="name"
                                value={this.state.name || ''}
                                onChange= { this.handleChange } 
                            />
                        </div>
                        <label>Trạng Thái :</label>
                        <select 
                            className="form-control" 
                            name="status"
                            value={this.state.status || false}
                            onChange= { this.handleChange } 
                        >
                            <option value={true}>Hoàn thành</option>
                            <option value={false}>Chưa hoàn thành</option>
                        </select>
                        <br/>
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning"><span className="fa fa-plus mr-2"></span>{this.state.id ? 'Lưu' : 'Thêm'}</button>&nbsp;
                            <button type="button" className="btn btn-danger" onClick= { this.onClear }><span className="fa fa-close mr-2"></span>Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

