import { MongoClient} from 'mongodb'

async function handler (req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        const {title, image, address, description} = data;

        //Save data into database

        const client = await MongoClient.connect('mongodb+srv://spassaro:spassaro@meetups.omufkrd.mongodb.net/?retryWrites=true&w=majority')
        const db = client.db()

        const meetUpsCollection = db.collection('meetups');
        
        meetUpsCollection.insertOne(data)
        

        // client.close()

        res.status(201).json({message: "Meetup succesfully inserted"})

    }
}

export default handler