import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './App.css'
import {Button} from './components'

var Main = ()=>{
    return (
        <div>
            <p>Hello world!</p>
            <Button label='Test button component' onClick={()=>{alert('test')}}/>
        </div>
    )
}

ReactDOM.render(<Main />, document.getElementById('root'))
