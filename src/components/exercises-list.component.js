import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Exercise = props => {
    return (
        <tr className="exercise">
            <td>{props.exercise.username}</td>
            <td>{props.exercise.description}</td>
            <td>{props.exercise.duration}</td>
            <td>{props.exercise.date.substring(0,10)}</td>
            <td id="edit">
                <Link id="edit-exercise" to={"/edit/" + props.exercise._id} >edit</Link> 
            </td>
            <td id="delete">
                <a id="delete-exercise" href="#" onClick={() => {props.deleteExercise(props.exercise._id)}}>delete</a>
            </td>
        </tr>
    )
}


class ExercisesList extends Component {
    constructor(props) {
        super(props)

        this.deleteExercise = this.deleteExercise.bind(this);
        this.state = {exercises: []};
    }


    componentDidMount() {
        
        axios.get('http://localhost:3000/exercises/')
            .then(response => {
                this.setState({exercises: response.data})
                console.log(response.data);
                
            })
            .catch((error) => [
                console.log(error)
            ])
            
    }

    deleteExercise(id) {
        axios.delete('http://localhost:3000/exercises/' + id)
            .then(res => console.log(res.data));

            this.setState({
                exercises: this.state.exercises.filter(el => el._id !== id)
            })
    }


    exerciseList() {
        return this.state.exercises.map(currentexercise => {
            return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id} />
        })
    }

    render() { 
        return (
            <div className="exercises-list">
                <h2>Exercises</h2>
                <table className="table">
                    <thead className="thead">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        );
    }
}
 
export default ExercisesList;