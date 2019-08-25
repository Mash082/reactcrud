// edit.component.js

import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangeEmployeeName = this.onChangeEmployeeName.bind(this);
    this.onChangeEmployeeLastName = this.onChangeEmployeeLastName.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeSalary = this.onChangeSalary.bind(this);
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      id: '',
      firstName: '',
      lastName: '',
      birthdate:'',
      salary:'',
      UserName:'',
      Password:''
    }
  }

  componentDidMount() {
      axios.get('http://localhost:8090/getEmployee', {params: {id: this.props.match.params.id}})
          .then(response => {
              this.setState({ 
                id: response.data.id, 
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                birthdate: response.data.birthdate,
                salary: response.data.salary,
            	UserName: response.data.UserName,
            	Password: response.data.Password});
          })
          .catch(function (error) {
              console.log(error);
          })
    }

  onChangeEmployeeName(e) {
    this.setState({
      firstName: e.target.value
    });
  }
  onChangeEmployeeLastName(e) {
    this.setState({
      lastName: e.target.value
    })  
  }
  onChangeDate(e) {
    this.setState({
      birthdate: e.target.value
    })
  }
  onChangeSalary(e) {
    this.setState({
      salary: e.target.value
    })
  }
  onChangeUserName(e){
  	this.setState({
  		UserName: e.target.value
  	})
  }
  onChangePassword(e){
  	this.setState({
  		Password: e.target.value
  	})
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      id: this.props.match.params.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      birthdate: this.state.birthdate,
      salary: this.state.salary,
      UserName: this.state.UserName,
      Password: this.state.Password
    };

    console.log(obj);
    axios.get('http://localhost:8090/updateEmployee', {params: obj})
        .then(res => console.log(res.data));
    
    this.props.history.push('/index');
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3>Actualizar Empleado</h3>
            <form onSubmit={this.onSubmit}>
            	
                <div className="form-group">
                    <label>Nombre de Empleado:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.firstName}
                      onChange={this.onChangeEmployeeName}
                      />
                </div>
                <div className="form-group">
                    <label>Apellido: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.lastName}
                      onChange={this.onChangeEmployeeLastName}
                      />
                </div>
                <div className="form-group">
                    <label>Fecha de Nacimiento: </label>
                    <input type="date" 
                      className="form-control"
                      value={this.state.birthdate.split('T')[0]}
                      onChange={this.onChangeDate}
                      />
                </div>
                <div className="form-group">
                    <label>Salario: </label>
                    <input 
                      type="number"
                      className="form-control"
                      value={this.state.salary}
                      onChange={this.onChangeSalary}
                      />
                <div className="form-group">
                	<label>UserName: </label>
                	<input type="text"
                		className="form-control"
                		value={this.state.UserName}
                		onChange={this.onChangeUserName}
                		/>
                </div>
                <div className="form-group">
                	<label>Password: </label>
                	<input type="Password"
                		className="form-control"
                		value={this.state.onChangePassword}
                		onChange={this.onChangePassword}
                		/>
                </div>
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Actualizar Empleado" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}