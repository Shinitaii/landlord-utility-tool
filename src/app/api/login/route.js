import connectDatabase from "@/app/lib/connectDatabase"
import { response } from "@/app/lib/response";
import bcrypt from 'bcrypt'

export async function POST(req){
    const res = await req.json()
    const client = await connectDatabase()
    const user = await client.db("utilitytool").collection("users").findOne({email: res.email});
    const isPasswordCorrect = await bcrypt.compare(res.password, user.password)
    if(isPasswordCorrect){
        const fields = {
            id: user._id,
            email: user.email
        }
        return response(fields, {status: 200})
    }
    return response({message: "Incorrect credentials."}, {status: 400})
}

