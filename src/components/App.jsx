import React from "react";
import { moviesData } from "../moviesData";
import MovieItem from "./MovieItem";
import MovieTabs from "./MovieTabs";
import {API_URL, API_KEY_3} from "../utils/api";

// UI = fn(state, props)

// App = new React.Component()

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      moviesWillWatch: [],
      sort_by:"revenue.desc",
      page_num:1,
      total_pages: null
      };

   // console.log("App constructor");
  }

   componentDidMount ()  {
     // console.log("App didMount");
      this.getMovies();
    }

componentDidUpdate(prevProps,prevState){
 // console.log("App didUpdate");
 // console.log("prev",prevProps,prevState);
 // console.log(this.props,this.state);
  if (prevState.sort_by !== this.state.sort_by){
    //console.log("App call api");
  }
  this.getMovies();
 
}
  
  getMovies = () => {
    fetch (`${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}&page=${this.state.page_num}`)
        .then((response)=>{
         //console.log("then")
         return response.json()
      }).then((data)=>{
      //console.log("data",data) 
      this.setState({
        movies:data.results,total_pages:data.total_pages})
      }
      )
  }

  nextPage = () =>{
    if (this.state.movies && this.state.page_num < this.state.total_pages){
      this.setState({
        page_num:this.state.page_num+=1
      }, ()=> this.getMovies())
    }
    console.log("next page");
  }

  previousPage = () =>{
    if (this.state.movies && this.state.page_num !== 1){
      this.setState({
        page_num:this.state.page_num-=1
      }, ()=> this.getMovies())
    }
    console.log("previous page");
  }

  deleteMovie = movie => {
    //console.log(movie.id);
    const updateMovies = this.state.movies.filter(item => item.id !== movie.id);
    //console.log(updateMovies);

    // this.state.movies = updateMovies;
    this.setState({
      movies: updateMovies
    });
  };

  addMovieToWillWatch = movie => {
    const updateMoviesWillWatch = [...this.state.moviesWillWatch];
    updateMoviesWillWatch.push(movie);

    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });
  };

  deleteMovieFromWillWatch = movie => {
    const updateMoviesWillWatch = this.state.moviesWillWatch.filter(
      item => item.id !== movie.id
    );

    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });
  };

  updateSortBy = value => {
    this.setState({
      sort_by:value
     });
  };

  //componentWillUnmount(){
  ///  console.log("unmount", this.props.data.title);
  //}

  render() {
    //console.log("App render", this.state.sort_by);
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-9">
            <div className="row mb-4">
              <div className="col-12">
                 <MovieTabs sort_by={this.state.sort_by} updateSortBy={this.updateSortBy}/>
              </div>
            </div>
            <div className="row">
             
              {this.state.movies.map(movie => {
                return (
                  <div className="col-6 mb-4" key={movie.id}>
                    <MovieItem
                      data={movie}
                      deleteMovie={this.deleteMovie}
                      addMovieToWillWatch={this.addMovieToWillWatch}
                      deleteMovieFromWillWatch={this.deleteMovieFromWillWatch}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-3">
            <h4>Will Watch: {this.state.moviesWillWatch.length} movies</h4>
            <ul className="list-group">
              {this.state.moviesWillWatch.map(movie => (
                <li key={movie.id} className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <p>{movie.title}</p>
                    <p>{movie.vote_average}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="row mt-4 mb-4"> 
          <button onClick={this.previousPage}>Previous Page</button>
              <p>Current Page {this.state.page_num}</p>
          <button onClick={this.nextPage}>Next Page</button>
              <p>Total Page Count {this.state.total_pages}</p>
        </div>
      </div>
    );
  }
}

export default App;
