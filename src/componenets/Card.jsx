import {motion, useMotionValue, useMotionValueEvent, useTransform} from 'framer-motion'

export default function Card({displayedUser, allUsers, setUsers, swipeRight}){
    const x = useMotionValue(0);
    const opacity = useTransform(x, [-70, 0, 70], [0, 1, 0])
    const rotate = useTransform(x, [-70, 0, 70], [-3, 0, 3])

    const handleDragEnd = (e)=>{
        if(Math.abs(x.get()) > 70){
            setUsers(allUsers.filter((user) => user.id != displayedUser.id));
            if(x.get() > 0){
                swipeRight(displayedUser);
            }
        }
    }

    return(
        <motion.div className = "cardFrame" drag = "x" style = {{x, opacity: opacity, rotate: rotate}} dragConstraints={{left:1, right:1}} onDragEnd={handleDragEnd}>
            <div className = "cardImage"></div>
            <div className = "cardDescriptionContainer">
                <div className = "cardName"><h2>{displayedUser.name}</h2></div>
                <div className = "cardText"><p>{displayedUser.bio}</p></div>
            </div>
        </motion.div>
    )
}