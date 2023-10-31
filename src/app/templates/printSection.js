'use client'
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function PrintSection(){
    const [tenants, setTenants] = useState([]);
    const [main, setMain] = useState([])
    const [waterMain, setWaterMain] = useState([])
    const [waterMain2, setWaterMain2] = useState([])
    const router = useRouter()

    useEffect(() => {
        const storedTenants = JSON.parse(localStorage.getItem('tenants'));
        const storedMain = JSON.parse(localStorage.getItem('main'))
        const storedWaterMain = JSON.parse(localStorage.getItem('water'))
        const storedWaterMain2 = JSON.parse(localStorage.getItem('water2'))
        if (storedTenants && storedMain) {
            setTenants(storedTenants);
            setMain(storedMain)
            setWaterMain(storedWaterMain)
            setWaterMain2(storedWaterMain2)
        }
        console.log(storedTenants)
        console.log(storedWaterMain)
        console.log(storedWaterMain2)
    }, [])

    if (tenants === null) {
        return (
            <div className='flex flex-col w-screen h-screen justify-center items-center'>
                <p>Loading tenant data...</p>
            </div>
        );
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='grid grid-cols-3 justify-center items-center'>
            {tenants.map((tenant, tenantIndex) => (
                <div className='p-4 flex justify-evenly border border-black border-dashed print:border-black print:border print:border-dashed'>
                    <div key={tenantIndex}>
                        <p>{tenant.name}</p>
                        <p className='font-bold'>Electricity</p>
                        <p className='underline'>{tenant.currentReading} - {tenant.previousReading} = {Math.abs(tenant.currentReading - tenant.previousReading).toFixed(2)}</p>
                        <p className='text-xs italic mb-2'>Curr. Reading - Prev. Reading = Consumed kWh</p>
                        <p className='underline'>{Math.abs(tenant.currentReading - tenant.previousReading).toFixed(2)} x ₱{main.rate} = ₱{(Math.abs(tenant.currentReading - tenant.previousReading).toFixed(2) * main.rate).toFixed(2)}</p>
                        <p className='text-xs italic mb-2'>Consumed kWh x Rate = Total Bill</p>
                        <div className='flex mb-2'>
                            <p className='mr-2'>Total Bill:</p>
                            <p className='font-bold underline'>₱{(Math.abs(tenant.currentReading - tenant.previousReading).toFixed(2) * main.rate).toFixed(2)}</p>
                        </div>
                        <p className='pt-1 border-t border-black font-bold'>Water</p>
                        <p className='underline'>{tenant.currentWaterReading} - {tenant.previousWaterReading} = {Math.abs(tenant.currentWaterReading - tenant.previousWaterReading).toFixed(2)}</p>
                        <p className='text-xs italic mb-2'>Curr. Reading - Prev. Reading = Consumed c<sup>3</sup></p>
                        <p className='underline'>{Math.abs(tenant.currentWaterReading - tenant.previousWaterReading).toFixed(2)} x ₱{tenant.waterType === 1 ? waterMain2.waterRate2 : waterMain.waterRate} = ₱{(Math.abs(tenant.currentWaterReading - tenant.previousWaterReading).toFixed(2) * (tenant.waterType === 1 ? waterMain2.waterRate2 : waterMain.waterRate)).toFixed(2)}</p>
                        <p className='text-xs italic mb-2'>Consumed c<sup>3</sup> x Rate = Total Bill</p>
                        <div className='flex'>
                            <p className='mr-2'>Total Bill:</p>
                            <p className='font-bold underline'>₱{(Math.abs(tenant.currentWaterReading - tenant.previousWaterReading).toFixed(2) * (tenant.waterType === 1 ? waterMain2.waterRate2 : waterMain.waterRate)).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            ))}
            </div>
            <div className='m-4 print:hidden'>
                <button className='p-2 rounded-xl border' onClick={() => window.print()}>Print</button>
            </div>
        </div>
    )
}