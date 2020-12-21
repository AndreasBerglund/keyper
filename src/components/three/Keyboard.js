//Components
import Case from './Case.js'
import Keys from './Keys.js'


const Keyboard = ({ keyboard, resources }) => {
    return (
        <>
            <Case keyboard={keyboard} resources={resources} />
            <Keys keyboard={keyboard} resources={resources} />
        </>
    )
}
export default Keyboard