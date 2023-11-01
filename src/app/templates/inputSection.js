'use client'
import Link from 'next/link';
import {useState, useEffect} from 'react'
export default function InputSection() {
    const [tenants, setTenants] = useState([]);
    //bills
    const [totalBill, setTotalBill] = useState(0);
    const [totalWaterBill, setTotalWaterBill] = useState(0)
    const [totalWaterBill2, setTotalWaterBill2] = useState(0)
    //rates
    const [rate, setRate] = useState(0)
    const [waterRate, setWaterRate] = useState(0)
    const [waterRate2, setWaterRate2] = useState(0)
    //readings
    const [totalCurrentReading, setTotalCurrentReading] = useState(0)
    const [previousCurrentReading, setPreviousCurrentReading] = useState(0)
    const [totalWaterCurrentReading, setTotalWaterCurrentReading] = useState(0)
    const [previousWaterCurrentReading, setPreviousWaterCurrentReading] = useState(0)
    const [totalWaterCurrentReading2, setTotalWaterCurrentReading2] = useState(0)
    const [previousWaterCurrentReading2, setPreviousWaterCurrentReading2] = useState(0)
    //total consumed
    const [kwh, setKwh] = useState(0)
    const [cubic, setCubic] = useState(0)
    const [cubic2, setCubic2] = useState(0)

    const handleNumberOfTenantsChange = (e) => {
        const numberOfTenants = parseInt(e.target.value, 10);
        if (!isNaN(numberOfTenants)) {
            const updatedTenants = Array(numberOfTenants).fill(null);
            setTenants(updatedTenants.map(() => ({
              name: '',
              currentReading: '',
              previousReading: '',
              currentWaterReading: '',
              previousWaterReading: '',
              waterType: ''
            })));
          }
      };

    const handleInputChange = (tenantIndex, event) => {
        const { name, value } = event.target;
        const updatedTenants = [...tenants];
        updatedTenants[tenantIndex][name] = value;
        setTenants(updatedTenants);
    };

    const getValues = () => {
        localStorage.setItem('tenants', JSON.stringify(tenants));
        localStorage.setItem('main', JSON.stringify({totalBill, rate, kwh, totalCurrentReading, previousCurrentReading}))
        localStorage.setItem('water', JSON.stringify({totalWaterBill, waterRate, cubic, totalWaterCurrentReading, previousWaterCurrentReading}))
        localStorage.setItem('water2', JSON.stringify({totalWaterBill2, waterRate2, cubic2, totalWaterCurrentReading2, previousWaterCurrentReading2}))
    }

    const InputField = (label, value, setValue, type) => (
        <div className='p-2 flex justify-between'>
            <label>{label}:</label>
            <input className='mx-2 border rounded-md w-28' type={type} value={value} onChange={(e) => setValue(e.target.value)}/>
        </div>
    );

    useEffect(() => {
        const consumedValue = Math.abs(totalCurrentReading - previousCurrentReading);
        setKwh(consumedValue);
        setTotalBill(consumedValue * rate);
        const consumedWater = Math.abs(totalWaterCurrentReading - previousWaterCurrentReading);
        setCubic(consumedWater);
        setTotalWaterBill(consumedWater * waterRate);
        const consumedWater2 = Math.abs(totalWaterCurrentReading2 - previousWaterCurrentReading2);
        setCubic2(consumedWater2);
        setTotalWaterBill2(consumedWater2 * waterRate2);
    }, [totalCurrentReading, previousCurrentReading, rate, totalWaterCurrentReading, totalWaterCurrentReading2, previousWaterCurrentReading, previousWaterCurrentReading2, waterRate, waterRate2]);

    return (
        <>
        <div className='h-screen flex 2xl:flex-col justify-evenly items-center'>
            <div className="p-4 flex flex-col border rounded-lg h-96 overflow-y-scroll">
                <p className=' text-2xl font-bold'>Input (Main Meter)</p>
                <div className=' p-2 flex'>
                    <label>Number of Tenants: </label>
                    <input className='mx-2 border rounded-md w-28' type="number" value={tenants.length} onChange={handleNumberOfTenantsChange}/>
                </div>
                <p className='font-bold'>Electricity</p>
                    {InputField("Electricity Rate", rate, setRate, "number")}
                    {InputField("Total Current Reading", totalCurrentReading, setTotalCurrentReading, "number")}
                    {InputField("Total Previous Reading", previousCurrentReading, setPreviousCurrentReading, "number")}
                <div className='p-2'>
                    <p>Consumed: {kwh}</p>
                    <p>Total Bill: {totalBill}</p>
                </div>
                <p className='font-bold'>Water (LL)</p>
                    {InputField("Water Rate", waterRate, setWaterRate, "number")}
                    {InputField("Total Current Reading", totalWaterCurrentReading, setTotalWaterCurrentReading, "number")}
                    {InputField("Total Previous Reading", previousWaterCurrentReading, setPreviousWaterCurrentReading, "number")}
                <div className=' p-2'>
                    <p>Consumed: {cubic}</p>
                    <p>Total Bill: {totalWaterBill}</p>
                </div>
                <p className='font-bold'>Water 2 (ML)</p>
                    {InputField("Water Rate", waterRate2, setWaterRate2, "number")}
                    {InputField("Total Current Reading", totalWaterCurrentReading2, setTotalWaterCurrentReading2, "number")}
                    {InputField("Total Previous Reading", previousWaterCurrentReading2, setPreviousWaterCurrentReading2, "number")}
                <div className=' p-2'>
                    <p>Consumed: {cubic2}</p>
                    <p>Total Bill: {totalWaterBill2}</p>
                </div>
                <Link className='p-2 rounded-xl border' href='/print' onClick={getValues}>Calculate</Link>
            </div>
            <div className='p-8 h-96 w-1/3 border rounded-xl overflow-y-scroll'>
                {tenants.map((tenant, tenantIndex) => (
                    <div className='rounded border p-2 my-4' key={tenantIndex} >
                        <p>Tenant {tenantIndex + 1}</p>
                        {
                        [['name', 'Name'], ['currentReading', 'Current Reading'], ['previousReading', 'Previous Reading'], ['currentWaterReading', 'Current Water Reading'], ['previousWaterReading', 'Previous Water Reading'], ['waterType', 'Water Type']]
                        .map(([field, caps], fieldIndex) => (
                            <div className='flex items-center justify-between m-2' key={fieldIndex}>
                                <label>{caps}:</label>
                                <input className='p-1 border rounded-xl w-36' type="text" name={field} value={tenant[field]} onChange={(e) => handleInputChange(tenantIndex, e)} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
        <div className='p-2 fixed bottom-0'>
            <p className='text-xs'>Created by: <Link className='underline text-indigo-600' href='https://bit.ly/shinitaii'>Shinitaii</Link> from <Link className='underline text-indigo-600' href='https://joybreadstudios.vercel.app'>Joybread Studios</Link>.</p>
        </div>
        </>
    )
}