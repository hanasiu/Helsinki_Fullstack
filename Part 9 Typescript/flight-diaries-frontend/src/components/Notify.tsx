const style = {
    color: 'red'
  };

const Notify = ({message}: {message: string | null}) => {
    if(message) {
    return (
        <div style={style}>
            {message}
        </div>
    )
    } else return null;
}

export default Notify;