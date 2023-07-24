/**
 * Shows the main body content of a search result.
 */
import WorldService from "../service/WorldService"
import Country from "./Country"
import {useEffect} from "react"
import ErrorDisplay from "./ErrorDisplay"

// inspectName is the country name in an array e.g. ["USA"]
const Body = ({inspect, setInspect ,inspectName, setErrorMessage, errorMessage}) => {

    useEffect(() => {

        if(inspectName[0] !== undefined){

            WorldService
                .getCountry(inspectName[0])
                .then(country => {

                    setInspect(country)
                })
                .catch(error => {
                    setErrorMessage(error)
                })
        }
    },[inspectName])


    return(
        <>
            <ErrorDisplay setErrorMessage={setErrorMessage} errorMessage={errorMessage} duration={5000}/>
            {
                inspect !== null  && <Country.CountryDetails country={inspect}/>
            }
        </>
    )

}

export default Body