import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";


class EditExercise extends Component {
    constructor(props) {
        super(props)

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = { 
            username: '',
            description: '',
            duration: '',
            date: new Date(),
            users: [],
            message: ['Edit an Exercise']
         }
    }

    componentDidMount() {
        axios.get('http://localhost:3000/exercises/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    description: response.data.description,
                    duration: response.data.duration,
                    date: new Date(response.data.date)
                })
            })
            .catch(function (error) {
                console.log(error);
            })


        axios.get('http://localhost:3000/users/')
            .then(response => {
                if(response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                    })
                }
            })
    }

    onChangeUserName(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    } 

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        })
    }
    
    onChangeDate(e) {
        const date = e;

        this.setState({
            date: date
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date,
        }

        console.log(exercise);

        axios.post('http://localhost:3000/exercises/update/'+this.props.match.params.id, exercise)
        .then(res => console.log(res.data))
    }


    render() {

        return (

            <div>
                <header className="message">
                    <h3>
                        {this.state.message[0]}
                    </h3>
                </header>

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUserName}
                        >
                        {
                            this.state.users.map(function(user) {
                                return <option
                                key={user}
                                value={user}
                                > {user}
                                </option>
                            })
                        }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration (min): </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date:</label>
                            <DatePicker 
                            selected={this.state.date}
                            onChange={this.onChangeDate}
                            />
                    </div>
                    <div className="form-group">
                        <input type="submit"
                            required
                            className="submit-exercise"
                            value="Edit Exercise Exercise"
                        />
                    </div>
                </form>
            </div>
        );
    }
}
 
export default EditExercise;