import connectDatabase from "@/app/lib/connectDatabase"
import { response } from "@/app/lib/response"

export async function GET(req){
    const res = req.json()
    const client = await connectDatabase()
    const result = client.db("utilitytools").collection("readings").find({userId: res})
    return result ? response(result, {status: 200}) : response({message: "Failed to fetch all readings"}, {status: 200})
}