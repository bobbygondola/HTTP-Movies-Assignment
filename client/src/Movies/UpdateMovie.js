import React, { useState } from 'react'
import axios from 'axios'
import { useParams, useHistory } from "react-router-dom";



const UpdateMovie = (props) => {
    const { id } = useParams();
    console.log("id", id)
    const { push } = useHistory()

    const [formData, setFormData] = useState({
        id: `${id}`,
        director: "",
        metascore: "",
        actors: []
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log("formData", formData)
        axios
          .put(`http://localhost:5000/api/movies/${id}`, formData)
          .then(res => push('/'))
    }

    const changeHandler = event => {
        const { name, value } = event.target;
        setFormData((prevState) => {
            return {
                ...prevState,
                [name] : value
            }
        })
    }

    const addActorHandler = (event) => {
        event.preventDefault()
        const { stars } = formData;
        stars.push(formData.actors)
        setFormData(prevState => {
          return {
            ...prevState,
            actors : stars
          }
        })
        setFormData(prevState => {
          return {
            ...prevState,
            actors : ""
          }
        })
      }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                    placeholder='Title'
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    value={formData.title}
                />
           
                <label>Director</label>
                <input
                    placeholder='Director'
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    value={formData.director}
                />
            
                <label>Metascore:</label>
                <input
                    placeholder='Meta'
                    type="number"
                    name="metascore"
                    onChange={changeHandler}
                    value={formData.meta}
                />
            
            
                <label>Staring:</label>
                <input
                    placeholder='Actors'
                    type="text"
                    name="actors"
                    onChange={changeHandler}
                    value={formData.actors}
                />
            </form>
            <button type="submit" color="teal" onClick={addActorHandler}>Add Actor</button>
            <button type='submit'>Submit</button>
        </div>
    )
}
export default UpdateMovie;