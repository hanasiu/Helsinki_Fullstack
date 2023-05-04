import Alert from "@mui/material/Alert";

const Notify = ({message}: {message: string | null}) => {
    if(!message) return null; 

    return (
        <Alert severity="error">
            {message}
        </Alert>
    )
}

export default Notify;