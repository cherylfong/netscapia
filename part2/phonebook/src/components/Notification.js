/**
 * Displays a message when message is not null
 */
const Notification = ({ message, isError }) => {

    if (message === null) {

        return null

    } else {

        if (!isError) {
            return (
                <div className='notify'>
                    {message}
                </div>
            )
        }

        return (
            <div className='error'>
                {message}
            </div>
        )

    }

}

export default Notification