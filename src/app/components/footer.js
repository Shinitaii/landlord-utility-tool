import Link from "next/link"
export default function Footer(){
    return  <div className='p-2 bottom-0 print:hidden'>
                <p className='text-xs'>Created by: <Link className='underline text-indigo-600' href='https://bit.ly/shinitaii'>Shinitaii</Link> from <Link className='underline text-indigo-600' href='https://joybreadstudios.vercel.app'>Joybread Studios</Link>.</p>
            </div>
}