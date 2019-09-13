import React from 'react';

import Button from './components/button'
import CallToAction from './components/calltoaction'

export default class App extends React.Component {
    constructor(){
        super()
        this.state = {
            text: ''
        }
    }

    changeText(){
        this.setState({
            text:"Button Presed"
        })
    }

    render(){
        
        return (
            <>
                <Button text = "Click Me" onClick ={this.changeText}/>
                <CallToAction test={this.state.text}/>
            </>
        )

    }
}