import React, { Component } from 'react';
import '../../css/SearchBar.css'

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      
    };
  }

  onChange = (event) => {
    this.setState({ query: event.target.value })
  }
  
  render() {
    return(
      <section>
        <form onSubmit={this.onSubmit}>
          <input 
            className='large-search-bar'
            type='text' 
            placeholder='Search tickets...' 
            value={this.state.query}
            onChange={this.onChange} 
          />
          <input 
            type='submit' 
            value='Search'
            className='btn btn-dark'
          />
        </form>
      </section>
    )
  };
}

export default SearchBar;