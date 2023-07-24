import {useEffect} from 'react'

/**
 * Displays a message when message is not null
 */
const Notification = ({ notifyMessage, setNotifyMessage, duration }) => {


    useEffect(() => {
        
        const notifyTimer  =  setTimeout( () => {
                setNotifyMessage(null)
            }, duration)    
    
        
        return(
            () => {
                clearTimeout(notifyTimer)
            }
        )
        
    }, [notifyMessage])

    return (

        <>
            { notifyMessage !== null && 
                <div className="notify">
                {notifyMessage}
                </div>
            }   
        </>

    )



}



// function resetNotificationState(setNotifyMessage, duration) {

//     setTimeout(() => {
//         setNotifyMessage(null)

//     }, duration)

// }

export default Notification