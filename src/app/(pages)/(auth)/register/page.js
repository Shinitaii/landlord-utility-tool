'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Register(){
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const {push} = useRouter();

    const registerUser = async (e) => {
        e.preventDefault()
        const result = await fetch('/api/register',{
            method: 'POST',
            header: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: userEmail, password: userPassword})
        })
        if(result.ok) push('/')
    }
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <form onSubmit={registerUser} className="p-4 border rounded-xl">
                <p className='text-lg font-bold'>Register</p>
                <div className="mb-1">
                    <p className='text-xs'>Email:</p>
                    <input className='border rounded-md p-2' placeholder='Email Address' type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)}/>
                </div>
                <div className='mt-1'>
                    <p className='text-xs'>Password:</p>
                    <input className='border rounded-md p-2' placeholder='Password' type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)}/>
                </div>
                <button type="submit" className="p-2 w-full border mt-4 rounded-md transition ease-in-out duration-200 hover:bg-gray-200">Register</button>
            </form>
        </div>
    )
}