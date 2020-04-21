import React, { Component } from 'react'

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state={
            query: ''
        }
    }
    
    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value 
        })
    }

    // onSearch = () =>{
    //     this.props.onSearch(this.state.query)
    // }

    render() {
        let { query } = this.state;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="input-group">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Nhập từ khóa..." 
                        name="query"
                        defaultValue = { query || '' }
                        onChange = { this.handleChange }
                    />
                    <span className="input-group-btn">
                        <button 
                            className="btn btn-primary" 
                            type="button"
                            onClick = { () => this.props.onSearch(query) }
                        >
                            <span className="fa fa-search mr-2"></span>Tìm
                        </button>
                    </span>
                </div>
            </div>
        )
    }
}
