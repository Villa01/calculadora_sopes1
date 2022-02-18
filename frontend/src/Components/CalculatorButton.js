import React from 'react'

export const CalculatorButton = ({ appendToScreen, text }) => {
    return (
        <button
            className='col btn btn-dark button'
            onClick={
                () => {
                    appendToScreen(text)
                }}
        >{text}</button>
    )
}
