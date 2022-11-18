import MeetUpList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";

const DUMMY_MEETUPS = [
    {
        id:'m1',
        title: 'A first meetup',
        image: 'https://images.unsplash.com/photo-1665478613994-a3636ae775b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
        address: 'Calle Atenas 3',
        description: 'My first Meeting'
    },
    {
        id:'m2',
        title: 'A second meetup',
        image: 'https://images.unsplash.com/photo-1664911978738-edcc6fb3cf3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        address: 'Calle Atenas 3',
        description: 'Another Meeting'
    },
]

function HomePage(props) {
    return <MeetUpList meetups={props.meetups} />;
  }
  
  export async function getStaticProps() {


    // fetch data from an API

    const client = await MongoClient.connect('mongodb+srv://spassaro:spassaro@meetups.omufkrd.mongodb.net/?retryWrites=true&w=majority')
    const db = client.db()

    const meetUpsCollection = db.collection('meetups');

    const meetUps = await meetUpsCollection.find().toArray()

    return {
      props: {
        meetups: meetUps.map((meetup) => ({
          id: meetup._id.toString(),
          title: meetup.title,
          image: meetup.image,
          address: meetup.address,
          description: meetup.description
        }))
      },
      revalidate: 1
    }; 
  }
  
  export default HomePage;