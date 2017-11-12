import React, { Component } from 'react';
import Radium from 'radium';

const twitter = require("../styles/images/icons/twitter-circle-icon-black.png") 
const instagram = require("../styles/images/icons/instagram_circle_black-128.png") 
const facebook = require("../styles/images/icons/facebook-4-xxl.png")
const youtube = require("../styles/images/icons/youtube_circle.png")
const spotify = require("../styles/images/icons/spotify-icon.png")
const itunes = require("../styles/images/icons/itunes-icon.png")
const styles = require("../styles/lookStyle.css")

export default class Header extends Radium(Component) {
	renderButtons = () => this.props.tabs.map(() => {

	})

	render() {
		return (
			<div className='container'>
				<div className="header-container">
					<a onClick={() => this.props.chooseTab(0)} className="escapists-header">ESCAPISTS</a>
					<div className="icons-container">
						<a className="icon" href="https://twitter.com/escapistsmusic"><img className="twitter" src={twitter}/></a>
						<a className="icon" href="https://www.instagram.com/escapistsmusic/?hl=en"><img className="instagram" src={instagram}/></a>
						<a className="icon" href="https://www.facebook.com/ESCAPISTSmusic/"><img className="facebook" src={facebook}/></a>
						<a className="icon" href="https://play.spotify.com/artist/5hp8GdfyyLzroKRVdEfiDO"><img className="spotify" src={spotify}/></a>
						<a className="icon" href="https://www.youtube.com/channel/UCERFP94irC-fFWQH1QzMiIA"><img className="youtube" src={youtube}/></a>
						<a className="icon" href="https://itunes.apple.com/gb/artist/escapists/id465211416"><img className="itunes" src={itunes}/></a>
					</div>
				</div>
				<div className="nav-container">
					<div className="button-container">
						<input type="submit" onClick={() => this.props.chooseTab(1)} className="nav-button" value="L O O K" />
						<input type="submit" onClick={() => this.props.chooseTab(3)} className="nav-button" value="L I V E" />
						<input type="submit" onClick={() => this.props.chooseTab(1)} className="nav-button" value="S T O R E"/>
					</div>
				</div>
			</div>
		)
	}
}

const localStyles = {

};


