const ErrorMessage = ({ message }: {message: string}) => {
    return (
        <div style={{
            color: "white",
            backgroundColor: "red"
        }}>
            {message}
        </div>
    );
};

export default ErrorMessage;