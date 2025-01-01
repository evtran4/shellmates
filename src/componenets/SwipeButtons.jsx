export default function SwipeButtons({changeUser, swipeRight}){
    return(
        <div className = "swipeButtonsContainer">
            <button className = "swipeButton" onClick = {() => {changeUser()}}>L</button>
            <button className = "swipeButton" onClick = {async () => {await swipeRight(); changeUser();}}>R</button>
        </div>
    )
}