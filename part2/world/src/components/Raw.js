const Raw = ({data}) => {

    return(
        <pre>
            {JSON.stringify(data, null, 2)}
        </pre>
    )
}

export default Raw