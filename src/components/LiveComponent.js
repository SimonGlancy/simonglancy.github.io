import React, { Component } from 'react';
import Radium from 'radium';
var fetchJsonp = require('fetch-jsonp')
const axios = require('axios')
const styles = require("../styles/liveStyle.css")

const API_KEY = "tnIoiwzydaoUPOrR"
const BAND_ID = "617842-escapists"
const URL_PREFIX = "https://api.songkick.com/api/3.0/artists/"
var pastShowsURL = URL_PREFIX + BAND_ID + "/gigography.json?apikey=" + API_KEY
var upcomingShowsURL = URL_PREFIX + BAND_ID + "/calendar.json?apikey=" + API_KEY


export default class LiveComponent extends Radium(Component) {
  constructor() {
    super()
    this.state = {
      shows: {},
      archive: {},
      showsVisual: false,
      archiveVisual: false
    }
  }

  componentDidMount = () => {
    this.getShows(pastShowsURL, 'archive')
    this.getShows(upcomingShowsURL, 'shows')
  }

  parseDateData = (data) => {
    var date = new Date(data)
    return date.toDateString();
  }

  getShows = (apiRoute, key) => {
    return axios({
      method: 'get',
      url: apiRoute
    })
      .then((res) => {
        console.log('-------result', res.data.resultsPage.results)
        if(Object.keys(res.data.resultsPage.results).length !== 0){
          this.setState({ [key]: res.data.resultsPage.results.event.reverse() })
        } else {
          this.setState({ [key]: [] })
        }
          
      })
      .catch((e) => {
        console.log('------------error', e)
      })
  }

  displayShows = (key) => {
    console.log('------key', key)
    this.setState({ [`${key}Visual`]: !this.state[`${key}Visual`]})
  } 

  mapShows = (type) => {
    if(this.state[type].length !== 0) {
      return this.state[type].map((show, index) => {
        return(
          <div key={index} className="upcoming-shows-container">
            <p className="upcoming-show-time">{this.parseDateData(show.start.datetime)}</p>
            <p className="upcoming-show-venue">{ show.venue.displayName}</p>
            <p className="upcoming-show-venue">{ show.location.city}</p>
            <p className="upcoming-show-link"> <a href={ show.uri }>Details</a></p>
          </div>
        )
      })
    } else {
      return (<div className="upcoming-shows-container"> 
        <p className="upcoming-show-venue">No Upcoming Shows</p>
      </div>)
    }
      
  }

  renderShows = (type) => {
    return (
      <div className="upcoming-shows-display">
      <p className="upcoming-shows-header" onClick={() => this.displayShows(type)}>{type.toUpperCase()}</p>
        { this.state[`${type}Visual`] ? (
            this.mapShows(type)
          ) : (
            null
          )
        }
      </div>
    )
  }

  render(){
    return(
      <div style={{width: '100%'}}>
        {this.renderShows('shows')}
        {this.renderShows('archive')}
      </div>
    )
  }

}




const localStyles = {
  
};