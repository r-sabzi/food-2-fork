import React, { Component } from "react";
import Search from "../components/Search";
import RecipeList from "../components/RecipeList";
import { REACT_APP_API_KEY } from "../config";
import { recipeData } from "../data/tempList";

export default class Recipes extends Component {
  constructor(props) {
    super(props);
    this.getRecipes = this.getRecipes.bind(this);
  }

  state = {
    recipes: null,
    search: "",
    base_url: `https://www.food2fork.com/api/search?key=${REACT_APP_API_KEY}`,
    url: `https://www.food2fork.com/api/search?key=${REACT_APP_API_KEY}`,
    query: "&q=",
    error: ""
  };
  async getRecipes() {
    try {
      const data = await fetch(this.state.url);
      const jsonData = await data.json();
      if (jsonData.recipes.length === 0) {
        this.setState({
          error:
            "sorry but your search did not return any recipes, please try again or press search icon for the most popular recipes"
        });
      } else {
        this.setState({
          recipes: jsonData.recipes,
          error: ""
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  componentDidMount() {
    this.getRecipes();
  }

  handleChange = e => {
    this.setState({
      search: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { base_url, search, query } = this.state;
    this.setState(
      {
        url: `${base_url}${query}${search}`,
        search: ""
      },
      () => this.getRecipes()
    );
  };
  render() {
    return (
      <div>
        <Search
          search={this.state.search}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        {this.state.error ? (
          <section>
            <div className="row">
              <div className="col">
                <h2 className="text-orange text-center text-uppercase mt-5">
                  {this.state.error}
                </h2>
              </div>
            </div>
          </section>
        ) : (
          <RecipeList recipes={this.state.recipes} />
        )}
      </div>
    );
  }
}
