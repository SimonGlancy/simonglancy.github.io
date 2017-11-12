import React, { Component } from 'react';
import Radium from 'radium';
var fetchJsonp = require('fetch-jsonp')
const axios = require('axios')
const jsonp = require('jsonp')
const AUTH_TOKEN='22490782.8ba77f3.ac3432952da64337b9d685af87097789'
var url = 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + AUTH_TOKEN
var corsAnywhere = 'https://cors-anywhere.herokuapp.com/'


export default class InstagramComponent extends Radium(Component) {
constructor() {
	super()
	this.state = {
		posts: []
	}
}

componentDidMount() {
	this.getPosts()
}

getPosts = () => {
	jsonp(url, null , (err, responseJson) => {
		if (err) {
			console.error(err.message);
		} else {
			this.setState({posts: responseJson.data})
		}
	})
}

displayHeartImage = (item) => {
	if(!item.user_has_liked || item.user_has_liked === undefined) {
		return "escapists/styles/images/icons/emptyheart.png"
	} else {
		return "escapists/styles/images/icons/fullheart.png"
	}
}

toggleHeartImage = (index) => {
	const state = JSON.parse(JSON.stringify(this.state))
	const post = state.posts[index]
	if(!post.liked || post.liked === undefined) {
		post.liked = true
		this.setState(state)
	} else {
		post.liked = !post.liked
		this.setState(state)
	}
}

flipCard = (index) => {
	const state = JSON.parse(JSON.stringify(this.state))
	const post = state.posts[index]
	if(!post.flipped || post.flipped === undefined) {
		post.flipped = true
		this.setState(state)
	} else {
		post.flipped = !post.flipped
		this.setState(state)
	}
}

renderPosts = () => {
	if(!!this.state.posts) {
		return this.state.posts.map((post, index) => {
			return (
				<div key={index} style={localStyles.instagramContainer}>
						<img style={localStyles.instagramImage} src={post.images.standard_resolution.url}/>
						<div  style={localStyles.instagramCaption} >
							{post.caption ? <span className='caption-header'> {post.caption.text} </span>: null} 	 
						</div>
				</div>
			)
		})
	} else return null
	
}



	render() {
		return(
			<div>
				{ this.state.posts.length !== 0 ? (
					<div style={localStyles.instaName}>
						<a style={localStyles.instaLink} href="https://www.instagram.com/escapistsmusic/?hl=en">@escapistsmusic</a>
					</div>
				) : (
				 null
				)
				
			}
				
				<div className="instagram-display" >
					{this.renderPosts()}
				</div>
			</div>
		)
	
	}
}

const localStyles = {
	instaLink: {
		textDecoration: 'none',
		color: '#FF4753',
	},
	instaName: {
		backgroundColor: '#FFFAEB',
		color: '#FF4753',
		padding: 10,
		fontFamily: 'monospace',
		opacity: .8,
		fontSize: 14,
		textAlign: 'center'
	},
	instagramContainer: {
		borderRadius: '10px 10px 10px 10px',
		display: 'flex',
		flexDirection: 'column',
		margin: '5px 5px 5px 5px',
		// boxShadow: '10px 4px 8px 5px rgba(1, 0, 0, 0.2), 0 6px 20px 0 rgba(1, 0, 0, 0.19)'	
	},
	instaCaption: {
		wordWrap: 'break-word', 
		width: '399px', 
		whiteSpace: 'pre-wrap'
	},

	instagramHolder: {
		width: 330,
		height: 330,
		backgroundColor: 'white',
		padding: '10px 10px 10px 10px',
		margin:' 0px 10px 0px 0px',
		boxShadow: '10px 4px 8px 5px rgba(1, 0, 0, 0.2), 0 6px 20px 0 rgba(1, 0, 0, 0.19)'
	},
	
	instagramImage: {
		width: 330,
		height: 330,
		opacity: 1,
		border: '14px solid #FFFAEB',
		borderRadius: '10px 10px 0px 0px'
	},
	
	instagramCaption: {
		width: 330,
		minHeight: '60',
		maxHeight: '100%',
		backgroundColor: '#FFFAEB',
		padding: '0px 14px 14px 14px',
		borderRadius: '0px 0px 10px 10px',
		display: 'flex',
		flexWrap: 'wrap',
		fontStyle: 'courier new',
		wordBreak: 'break-all'
	}
};