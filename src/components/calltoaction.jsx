import React from 'react';
import styled from 'styled-components'

const Div = styled.div`
    margin:  5px; 
    padding: 15px;
    background-color:lightgrey;
`


export default ({text}) => {

    return (
        <Div> 
            <h3>{text} </h3>
            <p>Dolor ipsum summis summis velit quorum eram aute esse enim magna export aute amet quorum sunt quid nisi aliqua culpa veniam tempor tamen esse enim esse cillum sunt tamen culpa fugiat duis fugiat quis cillum tempor eram aliqua export malis nisi quis esse eram sint irure tempor nulla dolor minim quem fugiat eram minim dolore magna enim dolor.</p>   
        </Div>
    )
    
}