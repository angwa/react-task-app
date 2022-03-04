import React from "react"

const Button = ({ color, text }) => {

    return (
        <button style={{ backgroundColor: color }} className="btn">{text}</button>
    )
}

Button.defaultProps = {
    color: "steelBlue",
    text: "Submit"
}

export default Button