import React, {MouseEvent} from 'react'
import './Button.less'

interface IButton {
    label: string,
    onClick: (event: MouseEvent) => void
}

export const Button = ({label, onClick}: IButton)=>{
    //-- attract attention if provided an empty label
    if (label.trim()=='') {
        return <span className='my-button' style={{background: 'red'}}>Button with no text!</span>
    }
    //--
    return (
        <button className="my-button" onClick={onClick}>{label}</button>
    )
}