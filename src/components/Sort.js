import React, { Component } from 'react'

export default class Sort extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sort:{
                by: '',
                value: 1
            }
        }
    }
    

    onClick = (sortBy, sortValue) => {
        // console.log(sortBy, sortValue);
        this.setState({
            sort:{
                by: sortBy,
                value: sortValue
            }
        }, () => {
            this.props.onSort(this.state.sort);
        });
    }

    render() {
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Sắp Xếp 
                        {/* <span className="fa fa-caret-square-o-down ml-5"></span> */}
                    </button>
                    
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick = { () => this.onClick('name', 1) }>  
                            <a href="# " role="button">                         
                                <span className="fa fa-sort-alpha-asc pr-5">
                                    Tên A-Z { (this.state.sort.by === 'name' && this.state.sort.value === 1) &&  <i className="fa fa-check"></i> } 
                                </span>
                            </a>
                        </li>
                        <li onClick = { () => this.onClick('name', -1) }>          
                            <a href="# " role="button">       
                                <span className="fa fa-sort-alpha-desc pr-5">
                                    Tên Z-A { (this.state.sort.by === 'name' && this.state.sort.value === -1) &&  <i className="fa fa-check"></i> } 
                                </span>  
                            </a>                                  
                        </li>
                        <li role="separator" className="dropdown-divider"></li>
                        <li onClick = { () => this.onClick('status', 1) }>
                            <a href="# " role="button">  Trạng Thái Chưa Hoàn Thành  { (this.state.sort.by === 'status' && this.state.sort.value === 1) &&  <i className="fa fa-check"></i> } </a>
                        </li>
                        <li onClick = { () => this.onClick('status', -1) }>
                            <a href="# " role="button">  Trạng Thái Hoàn Thành  { (this.state.sort.by === 'status' && this.state.sort.value === -1) &&  <i className="fa fa-check"></i> } </a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
