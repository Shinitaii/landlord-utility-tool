import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Login',
            credentials: { 
                email: {label: 'Email', type: 'email', placeholder: 'Email address'},
                password: {label: 'Password', type: 'password', placeholder: 'Password'}
            },
            async authorize(credentials){
                const res = await fetch('http://localhost:3000/api/login', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(credentials)
                })
                if(res.ok) return await res.json()
                return null
            }
        })
    ],
    callbacks: {
        async jwt({token, user}){
            if(user){
                token.id = user.id.toString()
                token.email = user.email
            }
            return token
        },
        async session({session, token}){
            session.user.id = token.id
            session.user.email = token.email

            return session
        }
    },
}

const handler = NextAuth(authOptions)

module.exports = { GET: handler, POST: handler }