import React from 'react';

import Button from './components/button'
import CallToAction from './components/calltoaction'

export default class App extends React.Component {
    constructor(){
        super()
    }

    render(){
        
        return (
            <>
                <Button text = "Click Me"/>
                <CallToAction/>
            </>
        )

    }
}