const Notification = ({personName, errorStatus}) => {
  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding:  '10px',
    marginBottom: '10px'
  }
  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding:  '10px',
    marginBottom: '10px'
  }

  return (
      errorStatus ? 
        <div style={errorStyle}>
          Information of {personName} has already been removed from server 
        </div> 
      : 
        <div style={successStyle}>
          Added {personName} 
        </div>
    
  )
}

export default Notification
