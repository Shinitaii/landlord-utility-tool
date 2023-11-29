import connectDatabase from "@/app/lib/connectDatabase"
import bcrypt from 'bcrypt'
import { response } from "@/app/lib/response"

export async function POST(req){
    const res = await req.json()

    const hashedPassword = await bcrypt.hash(res.password, 10) 

    const user = {
        email: res.email,
        password: hashedPassword
    }

    const client = await connectDatabase()
    const ifExists = await client.db("utilitytool").collection("users").findOne({email: user.email})
    if(!ifExists){
        const result = await client.db("utilitytool").collection("users").insertOne(user)
        if(result) return response({message: "Successfully registered user."}, {status: 200})
    }
    return response({message: "Failed to register user."}, {status: 400})
}