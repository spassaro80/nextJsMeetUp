import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";

const MeetupDetails = (props) => {
    return <MeetupDetail
    image = {props.meetup.image}
    id = {props.meetup.id}
    title = {props.meetup.title}
    address = {props.meetup.address}
    description = {props.meetup.description}
    />
}

export default MeetupDetails


export async function getStaticPaths() {


    // Recuperar todos los path por un async call
    const client = await MongoClient.connect('mongodb+srv://spassaro:spassaro@meetups.omufkrd.mongodb.net/?retryWrites=true&w=majority')
    const db = client.db()

    const meetUpsCollection = db.collection('meetups');

    const meetUps = await meetUpsCollection.find({}, {_id:1}).toArray() //Selecciona de la collection de mongoDB solo los ids
    return {
        fallback: false,
        paths: meetUps.map(meetup => ({params: {meetUpId: meetup._id.toString()}}))
    }
}

export async function getStaticProps(context) {
    
    const meetUpId = context.params.meetUpId

    // fetch data from an API
    const client = await MongoClient.connect('mongodb+srv://spassaro:spassaro@meetups.omufkrd.mongodb.net/?retryWrites=true&w=majority')
    const db = client.db()
    const meetUpsCollection = db.collection('meetups');
    const selectedMeetUp = await meetUpsCollection.findOne({_id:ObjectId(meetUpId)}) //Selecciona el meetUp con el ObjectId = a meetuId



    return {
      props: {
        meetup:     
        {        
          id: selectedMeetUp._id.toString(),
          image: selectedMeetUp.image,
          title: selectedMeetUp.title,
          description: selectedMeetUp.description,
          address: selectedMeetUp.address
        },
      revalidate: 1
      }
    }
  }