const Notification = ({ notification }) => {
    const styleGreen = {
        color: 'green',
        background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
      }

      const styleRed = {
        color: 'red',
        background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
      }

    if (notification.updated) {
        return (
            <div style={styleGreen}>
              Changed {notification.notifiedName}'s number
            </div>
          )
    }

    if(!notification.update&&notification.notifiedName==="nothing") {
      return (
        <div>
    
      </div>
      )
    }

    if(!notification.update&&notification.notifiedName==="nobody") {
      return (
        <div style={styleRed}>
        Canceled
      </div>
      )
    }

    if(!notification.update&&notification.notifiedName==="deletedAlready") {
      return (
        <div style={styleRed}>
        deleted already
      </div>
      )
    }
  
    return (
      <div style={styleGreen}>
        Added {notification.notifiedName}
      </div>
    )
  }

export default Notification