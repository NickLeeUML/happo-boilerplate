import React from 'react';
import styled from 'styled-components'

const Button = styled.button`
    border: solid 3px yellow;
    background-color: rgb(47, 101, 175);
    color:white; 
    padding: 8px 16px;
    
`


export default ({text}) => {


    return (
        <Button> 
           {text}
        </Button>
    )
    
}