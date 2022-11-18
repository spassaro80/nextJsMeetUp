import NewMeetupForm from '../../components/meetups/NewMeetupForm'

const NewMeetupPage = () => {
    const addMeetupHandler = async (meetUpdata) => {
        const response = await fetch('/api/new-meetup', {
            method: "POST",
            body: JSON.stringify(meetUpdata),
            headers: {
                'Content-Type': 'application/json' 
            }
        });
        const data = await response.json()
        console.log(data)
    }
    return (<NewMeetupForm onAddMeetup={addMeetupHandler}></NewMeetupForm>)
}

export default NewMeetupPage