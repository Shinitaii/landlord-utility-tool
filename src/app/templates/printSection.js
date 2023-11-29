'use client'
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

async function saveReading(){
    const res = await fetch('/api/logs/',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({})
    })
    if(res.ok){
        //TODO: show saved! text.
    }
}

export default function PrintSection(){
    const [data, setData] = useState([])
    const router = useRouter()

    const getValues = () => {
        const local = JSON.parse(localStorage.getItem('data'))
        if(local) setData(local)
        console.log(local)
    }

    useEffect(() => {
        getValues()
    }, [])

    if (data === null) {
        return (
            <div className='flex flex-col w-screen h-screen justify-center items-center'>
                <p>Loading tenant data...</p>
            </div>
        );
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='grid grid-cols-3 justify-center items-center'>
            {data.tenants && data.tenants.map((tenant, tenantIndex) => (
                <div className='p-4 flex justify-evenly border border-black border-dashed print:border-black print:border print:border-dashed'>
                    <div key={tenantIndex}>
                        <p>{tenant.name}</p>
                        <p className='font-bold'>Electricity</p>
                        <p className='underline'>{tenant.currentReading} - {tenant.previousReading} = {Math.abs(tenant.currentReading - tenant.previousReading).toFixed(2)}</p>
                        <p className='text-xs italic mb-2'>Curr. Reading - Prev. Reading = Consumed kWh</p>
                        <p className='underline'>{Math.abs(tenant.currentReading - tenant.previousReading).toFixed(2)} x ₱{data.electric.rate} = ₱{(Math.abs(tenant.currentReading - tenant.previousReading).toFixed(2) * data.electric.rate).toFixed(2)}</p>
                        <p className='text-xs italic mb-2'>Consumed kWh x Rate = Total Bill</p>
                        <div className='flex mb-2'>
                            <p className='mr-2'>Total Bill:</p>
                            <p className='font-bold underline'>₱{(Math.abs(tenant.currentReading - tenant.previousReading).toFixed(2) * data.electric.rate).toFixed(2)}</p>
                        </div>
                        <p className='pt-1 border-t border-black font-bold'>Water</p>
                        <p className='underline'>{tenant.currentWaterReading} - {tenant.previousWaterReading} = {Math.abs(tenant.currentWaterReading - tenant.previousWaterReading).toFixed(2)}</p>
                        <p className='text-xs italic mb-2'>Curr. Reading - Prev. Reading = Consumed c<sup>3</sup></p>
                        <p className='underline'>{Math.abs(tenant.currentWaterReading - tenant.previousWaterReading).toFixed(2)} x ₱{tenant.waterType === "1" ? data.water.rate : data.water2.rate} = ₱{(Math.abs(tenant.currentWaterReading - tenant.previousWaterReading).toFixed(2) * (tenant.waterType === "1" ? data.water.rate : data.water2.rate)).toFixed(2)}</p>
                        <p className='text-xs italic mb-2'>Consumed c<sup>3</sup> x Rate = Total Bill</p>
                        <div className='flex'>
                            <p className='mr-2'>Total Bill:</p>
                            <p className='font-bold underline'>₱{(Math.abs(tenant.currentWaterReading - tenant.previousWaterReading).toFixed(2) * (tenant.waterType === "1" ? data.water.rate : data.water2.rate)).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            ))}
            </div>
            <div className='m-4 print:hidden flex'>
                <button className='p-2 m-1 rounded-xl border' onClick={() => window.print()}>Print</button>
                <button className='p-2 m-1 rounded-xl border' onClick={() => saveReading()}>Save</button>
            </div>
        </div>
    )
}