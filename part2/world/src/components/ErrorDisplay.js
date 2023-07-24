import {useEffect} from 'react'

const ErrorDisplay = ({errorMessage, setErrorMessage, duration}) => {

    useEffect(() => {
        
        const errorTimer  =  setTimeout( () => {
                setErrorMessage(null)
            }, duration)    
    
        
        return(
            () => {
                clearTimeout(errorTimer)
            }
        )
        
    }, [errorMessage])

    return (

        <>
            { errorMessage !== null && 
                <div className="error">
                {errorMessage}
                </div>
            }   
        </>

    )


} 

export default ErrorDisplay