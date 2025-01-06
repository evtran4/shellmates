export default function Message({text, user, sender}){
    return sender == user ? (
        <>
            <div className = "messageBubbleSent">
                <p className = "messageText">{text}</p>
            </div>
        </>
    ):
    (
        <>
            <div className = "messageBubbleReceived">
                <p className = "messageText">{text}</p>
            </div>
        </>
    )
}