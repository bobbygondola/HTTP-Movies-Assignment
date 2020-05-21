import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

const initialMovie = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const UpdateMovie = (props) => {
  const { id } = useParams();
  console.log("id", id);
  const { push } = useHistory();
  const [movie, setMovie] = useState(initialMovie);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log(res.data);
        setMovie(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const changeHandler = (ev) => {
    ev.persist();
    const value = [ev.target.value];
    setMovie({
      ...movie,
      [ev.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // make a PUT request to edit the item
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then((res) => {
        // res.data
        props.setMovie([...props.movie, res.data]);
        push("/");
      })
      .catch((err) => console.log(err));
  };

  // const addActorHandler = (event) => {
  //     event.preventDefault()
  //     const { stars } = formData;
  //     stars.push(formData.actors)
  //     setFormData(prevState => {
  //       return {
  //         ...prevState,
  //         actors : stars
  //       }
  //     })
  //     setFormData(prevState => {
  //       return {
  //         ...prevState,
  //         actors : ""
  //       }
  //     })
  //   }
  return (
    <div>
      <h3>Update movie</h3>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          placeholder="Title"
          type="text"
          name="title"
          onChange={changeHandler}
          value={movie.title}
        />
        <br />
        <label>Director</label>
        <input
          placeholder="Director"
          type="text"
          name="director"
          onChange={changeHandler}
          value={movie.director}
        />
        <br />
        <label>Metascore:</label>
        <input
          placeholder="Meta"
          type="number"
          name="metascore"
          onChange={changeHandler}
          value={movie.metascore}
        />

        <br />
        <label>Staring:</label>
        <input
          placeholder="Actors"
          type="text"
          name="actors"
          onChange={changeHandler}
          value={movie.actors}
        />
      </form>
      {/* <button type="submit" onClick={addActorHandler}>Add Actor</button> */}
      <button type="submit">Submit</button>
    </div>
  );
};
export default UpdateMovie;
