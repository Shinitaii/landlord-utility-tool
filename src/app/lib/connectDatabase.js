import { MongoClient, ServerApiVersion } from "mongodb"

const connectDatabase = async() => {
    const client = new MongoClient(process.env.MONGO_URI ,{
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    })
    try{ 
        await client.connect()
        return client
    } catch(e) {
        console.log(e)
    }
}

export default connectDatabase