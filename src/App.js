import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import InstagramComponent from './components/InstagramComponent'
import Background1 from './styles/images/backgrounds/web_background-nurse.jpg'
import LiveComponent from './components/LiveComponent'
import JoinComponent from './components/JoinComponent'
var bool = false

const TABS = [
  {id: 'home'},
  {id: 'look', component: <InstagramComponent/>},
  {id: 'listen', component: null},
  {id: 'live', component: <LiveComponent />},
  {id: 'join', component: <JoinComponent />},
  {id: 'store', url:'https://escapists.bandcamp.com/merch' },
]
  
class App extends Component {
  constructor() {
    super()
    this.state = {
      background: 'background1',
      bool: false,
      selectedTab: TABS[0],
      content: {
        lineOne: {text: 'new single', hidden: true},
        lineTwo: {text: 'WEIRDO', hidden: true},
        lineThree: {text:'out NOW', hidden: true}
      },
      counter: 0
    }
  }

  componentDidMount() {
    this.flickerImage()
  }

  chooseTab = (index) => {
    this.setState({ selectedTab: TABS[index]})
  }
  
  flickerImage = () => {
    if(this.state.selectedTab.id === 'home') {
      var timer = Math.floor(Math.random() * 400)
      const state = JSON.parse(JSON.stringify(this.state))
      const random = Math.floor(Math.random() * 3) 
      const interval = setInterval(() => {
      const random = Math.floor(Math.random() * 3)  
      if(this.state.bool) {
        state.background = 'background2'
        state.bool = !state.bool
        Object.values(state.content)[random].hidden = !Object.values(state.content)[random].hidden
      } else {
        state.background = 'background1'
        state.bool = !state.bool
        Object.values(state.content)[random].hidden = !Object.values(state.content)[random].hidden
      }
      state.counter += 1
      if(state.counter < 20 && this.state.selectedTab.id === 'home') {
        this.setState(state)
      } else {
        clearInterval(interval)
        Object.values(state.content).map((item) => item.hidden = false)
        this.setState(state)
      }
      
    }, timer)
  }


}

  renderComponent = () => {
    if(this.state.selectedTab.component) {
      return this.state.selectedTab.component
    } else {
      return this.renderText()
    }
  }

  renderText = () => {
    const rowStyles = [localStyles.textRow]
    if(this.state.selectedTab.id === 'home') {
      return <div style={localStyles.textArea}>
        {Object.entries(this.state.content).map(([key, item], index) => {
          const string = `${key}Row`   
            return <div key={key} style={localStyles[string]}>
             {!item.hidden ? <div style={localStyles[key]}>{item.text}</div> : null}
            </div>  
        })}
      
      </div>
    }
  }


  render() {
    console.log('--------state------->', this.state)
    return (
      <div >
        <Header chooseTab={this.chooseTab} />
        <div style={localStyles.container} id={this.state.background}>
          {this.renderComponent()}
        </div>
      </div>
    );
  }
}

const localStyles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 110
  },
  textArea: {
    fontFamily: 'futura',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    marginTop: '0%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  lineOne: {
    whiteSpace: 'no-wrap',
    marginTop: 20,
    fontSize: 50,
    color: 'white',
    backgroundColor: 'black',
    paddingLeft: 30,
    paddingRight: 30,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  lineTwo: {
    whiteSpace: 'no-wrap',
    fontSize: 80,
    color: '#FF4753',
    fontWeight: 'bold',
    backgroundColor: 'black',
    paddingLeft: 30,
    paddingRight: 30,

  },
  lineThree: {
    whiteSpace: 'no-wrap',
    fontSize: 50,
    marginTop: 20,
    color:'white',
    backgroundColor: 'black',
    paddingLeft: 30,
    paddingRight: 30,
    marginLeft: 'auto'
  },
  lineOneRow: {
    marginRight: 'auto',
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
  },
  lineTwoRow: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  lineThreeRow: {
    marginLeft: 'auto',
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
  },
};

export default App;
