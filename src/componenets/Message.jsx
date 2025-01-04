export default function Message({text}){
    return(
        <>
            <div className = "messageBubble">
                <p className = "messageText">{text}</p>
            </div>
        </>
    )
}