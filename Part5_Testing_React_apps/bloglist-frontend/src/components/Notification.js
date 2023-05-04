export const RedNotification = ({ message }) => {
  const styleRed = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (message === null) {
    return null
  } else {
    return (<div className='error' style={styleRed}>{message}</div>)
  }
}

export const GreenNotification = ({ message }) => {
  const styleGreen = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (message === null) {
    return null
  } else {
    return (<div className='success' style={styleGreen}>{message}</div>)
  }
}

export default Notification
