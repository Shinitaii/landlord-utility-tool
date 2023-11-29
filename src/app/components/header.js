'use client'
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header(){
    const { data: session, status } = useSession();

    if(status === 'loading'){
        return <></>
    }

    return(
        <div className="p-2 border-b fixed w-screen flex justify-evenly print:hidden">
            <Link href="/">Utility Tool Calculator</Link>
            <div className="flex justify-between">
                { status === 'authenticated' && session.user?.email ?
                    <>
                        {[
                            [`/logs/${session.user?.id}`, 'Logs'], ['/import', 'Import'], ['/export', 'Export']
                        ].map(([url, title], index) => (
                            <Link key={index} className='px-2' href={url}>{title}</Link>
                        ))}
                        <button onClick={() => signOut()} className='px-2'>Log Out</button>
                    </>
                : 
                    <>  
                        <button onClick={() => signIn()} className='px-2'>Login</button>
                        <Link className='px-2' href={'/register'}>Register</Link>
                    </> 
                }
            </div>
        </div>
    )
}