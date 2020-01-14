import React, { Component } from 'react';
import { BrowserRouter as Router, Link, NavLink, Redirect } from 'react-router-dom';
import Map from './Map.js';
import GMap from './GoogleMap.js';
import TopCities from './TopCities';
import List from './List';
import axios from 'axios';

import SPRING_SECURITY from '../../config_spring_keys.js'

const base_url = 'http://localhost:8080'
const username = `${SPRING_SECURITY.username}`
const password = `${SPRING_SECURITY.password}`


class ByLocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: undefined,
      selectedState: "WA",
      topCity: "Seattle",
      selectedVenue: undefined,
      collection: undefined,
    };
  }

  fetchCollection(url, headers) {
    axios.get( url, headers).then((response) => {
        this.setState({collection: response.data})
      })
      .catch((error) => {
        console.log("No collection")
        // this.setState({errors: error})
      });
  }

  setSelectedVenue = (venue) => {
    this.setState({selectedVenue: venue})
  }


  fetchTopCity = (state) => {
    const url = `${base_url}/topcity/${state}`
    const headers = { 
      headers: { authorization: 'Basic ' + window.btoa( username + ":" + password) } 
    }
    
    axios.get( url, headers).then((response) => {
        this.setState({topCity: response.data})
      })
      .catch((error) => {
        this.setState({error: error})
      });
  }

  mapHandler = (event) => {
    this.setState({selectedState: event.target.dataset.name })
    this.fetchTopCity(event.target.dataset.name)
  };


  render() {  
      const { redirect } = this.state;
      if (redirect !== undefined) {
        return <Redirect to={redirect}/>;
      }
      return (
        <section>
        
          <section className="maps-container">
            <div className="google-map-container">
              <GMap
                google={this.props.google}
                zoom={5}
                initialCenter = "Seattle"
                center={this.state.topCity}
                collectionURL="/venues/all"
                className="google-map"
                setSelectedVenue={this.setSelectedVenue}
              />
            </div>
            <div className="state-map">
              <Map selectedState={this.state.selectedState} mapHandler={this.mapHandler} />
            </div>
          </section>      
          {
            (this.state.selectedVenue)
              ? <List url={`/events?venue=${this.state.selectedVenue.id}`} cardType="event"></List>
              : <List url={`/events?state=${this.state.selectedState}`} cardType="event"></List>
          }

            
        </section>
      )
  }
}

export default ByLocation;