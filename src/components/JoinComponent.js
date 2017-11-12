import React, { Component } from 'react';
import Radium from 'radium';
import SubscribeForm from 'react-mailchimp-subscribe'

const axios = require('axios')

const formProps = {
 action: '//escapistsmusic.us3.list-manage.com/subscribe/post?u=8f8d559b09f2c82c1a819ddc9&amp;id=46a8219413',
 messages: {
   inputPlaceholder: "Votre email",
   btnLabel: "Envoyer",
   sending: "Envoi en cours...",
   success: "Merci de votre intérêt!",
   error: "Oops, impossible d'enregistrer cette adresse"
 },
 styles: {
   sending: {
     fontSize: 18,
     color: "auto"
   },
   success: {
     fontSize: 18,
     color: "green"
   },
   error: {
     fontSize: 18,
     color: "red"
   }
 },
}

const baseUrl = 'https://github.com/Rob--W/cors-anywhere/us3.api.mailchimp.com/3.0/lists/46a8219413/members'


const styles = require("../styles/joinStyle.css")
const ChimpForm = () => <SubscribeForm {...formProps} />

export default class JoinComponent extends Radium(Component) {
  constructor() {
    super()
    this.state = {
      email: '',
      message: ''
    }
  }

  sendEmail = (email) => {
    axios({
      action: 'post',
      tokens: { Authorization: 'apikey eb8b52c19a35ddaf14e4ff4299e7b5de-us3'},
      url: baseUrl,
      data: {email_address: email}
    })
      .then((res) => {
        this.setState({ message: 'Thanks for joining'})
      })
      .catch((e) => {
        this.setState({ message: 'Sorry Something went wrong'})
      })
  }

  renderHtml = () => <div style={localStyles.container}>
    <link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css"/>
    
    <div id="mc_embed_signup">
      <form action="//escapistsmusic.us3.list-manage.com/subscribe/post?u=8f8d559b09f2c82c1a819ddc9&amp;id=46a8219413"
            method="post" 
            id="mc-embedded-subscribe-form" 
            name="mc-embedded-subscribe-form" 
            className="validate" 
            target="_blank" 
            noValidate>
        <div id="mc_embed_signup_scroll">
        <h2 className="signup-header">Subscribe to our mailing list --> #freestuff</h2>
        <div className="indicates-required">
          <span className="asterisk">*</span> indicates required
        </div>
      <div className="mc-field-group">
        <label htmlFor="mce-EMAIL">Email Address</label>
        <input type="email" value={this.state.email} name="EMAIL" className="required-email" id="mce-EMAIL" onChange={(e) => this.setState({email: e.target.value}, () => this.sendEmail(this.state.email))}/>
      </div>
        <div id="mce-responses" className="clear">
          <div className="response" id="mce-error-response" style={{display: 'none'}}></div>
          <div className="response" id="mce-success-response" style={{display: 'none'}}></div>
        </div>
          <div style={{position: 'absolute', left: '-5000px'}}>
            <input type="text" name="b_8f8d559b09f2c82c1a819ddc9_46a8219413" tabIndex="-1" value=""/> 
          </div>
          <div className="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button"/>
          </div>
          </div>
      </form>
    </div>
  </div>

render() {
  return(  
    <div style={{width: '100%'}}>
      {this.renderHtml()}
      {this.state.message.length > 1 ? (
        <div style={localStyles.message}>
          {this.state.message}
        </div>
      ) : null}
      
    </div>
    
  )
}



}

const localStyles = {
  container: {
    width: '100%',
    marginTop: '155px'
  },
  message: {
    marginTop: 20,
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 20,
    padding: 10
  }
}