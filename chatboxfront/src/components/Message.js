import React from 'react'

const Message = ({ message }) => {
    const messageStyle = {
        color: '#543257',
        fontStyle: 'italic',
        fontSize: 16,
        listStyleType: 'none',
        margin: 10,
        padding: 10,
        backgroundColor: '#aabb97',
        boxShadow: "0 4px 4px",
        textAlign: 'left'
      }
    const textStyle = {
        color: '#e8f1f7'
    }
    
    const parseTime = (time) => {
        
        return time.slice(11,16)
    }

    return (
    <div style={messageStyle}>
        <li>{message.username} {parseTime(message.date)}
        
        <p style={textStyle}>{message.content}</p></li>
    </div>
    
    )
}

export default Message