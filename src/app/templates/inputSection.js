'use client'
import Link from 'next/link';
import {useState, useEffect} from 'react'
export default function InputSection() {
    const [tenants, setTenants] = useState([]);
    const [totalBill, setTotalBill] = useState(0);
    const [totalWaterBill, setTotalWaterBill] = useState(0)
    const [totalWaterBill2, setTotalWaterBill2] = useState(0)
    const [rate, setRate] = useState(0)
    const [waterRate, setWaterRate] = useState(0)
    const [waterRate2, setWaterRate2] = useState(0)
    const [totalCurrentReading, setTotalCurrentReading] = useState(0)
    const [previousCurrentReading, setPreviousCurrentReading] = useState(0)
    const [totalWaterCurrentReading, setTotalWaterCurrentReading] = useState(0)
    const [previousWaterCurrentReading, setPreviousWaterCurrentReading] = useState(0)
    const [totalWaterCurrentReading2, setTotalWaterCurrentReading2] = useState(0)
    const [previousWaterCurrentReading2, setPreviousWaterCurrentReading2] = useState(0)
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
        <div className='flex justify-evenly items-center'>
            <div className="p-4 flex flex-col border rounded-lg">
                <p className='m-2 text-2xl font-bold'>Input</p>
                <div className='m-2 p-2 flex'>
                    <label>Number of Tenants: </label>
                    <input className='mx-2 border rounded-md w-28' type="number" value={tenants.length} onChange={handleNumberOfTenantsChange}/>
                </div>
                <p>Electricity</p>
                <div className='m-2 p-2 flex'>
                    <label>Electricity Rate: </label>
                    <input className='mx-2 border rounded-md w-28' type="number" value={rate} onChange={(e) => setRate(e.target.value)}/>
                </div>
                <div className='m-2 p-2 flex'>
                    <label>Total Current Reading: </label>
                    <input className='mx-2 border rounded-md w-28' type="number" value={totalCurrentReading} onChange={(e) => setTotalCurrentReading(e.target.value)}/>
                </div>
                <div className='m-2 p-2 flex'>
                    <label>Total Previous Reading: </label>
                    <input className='mx-2 border rounded-md w-28' type="number" value={previousCurrentReading} onChange={(e) => setPreviousCurrentReading(e.target.value)}/>
                </div>
                <div className='m-2 p-2'>
                    <p>Consumed: {kwh}</p>
                    <p>Total Bill: {totalBill}</p>
                </div>
                <p>Water</p>
                <div className='m-2 p-2 flex'>
                    <label>Water Rate: </label>
                    <input className='mx-2 border rounded-md w-28' type="number" value={waterRate} onChange={(e) => setWaterRate(e.target.value)}/>
                </div>
                <div className='m-2 p-2 flex'>
                    <label>Total Current Reading: </label>
                    <input className='mx-2 border rounded-md w-28' type="number" value={totalWaterCurrentReading} onChange={(e) => setTotalWaterCurrentReading(e.target.value)}/>
                </div>
                <div className='m-2 p-2 flex'>
                    <label>Total Previous Reading: </label>
                    <input className='mx-2 border rounded-md w-28' type="number" value={previousWaterCurrentReading} onChange={(e) => setPreviousWaterCurrentReading(e.target.value)}/>
                </div>
                <div className='m-2 p-2'>
                    <p>Consumed: {cubic}</p>
                    <p>Total Bill: {totalWaterBill}</p>
                </div>
                <p>Water 2</p>
                <div className='m-2 p-2 flex'>
                    <label>Water Rate: </label>
                    <input className='mx-2 border rounded-md w-28' type="number" value={waterRate2} onChange={(e) => setWaterRate2(e.target.value)}/>
                </div>
                <div className='m-2 p-2 flex'>
                    <label>Total Current Reading: </label>
                    <input className='mx-2 border rounded-md w-28' type="number" value={totalWaterCurrentReading2} onChange={(e) => setTotalWaterCurrentReading2(e.target.value)}/>
                </div>
                <div className='m-2 p-2 flex'>
                    <label>Total Previous Reading: </label>
                    <input className='mx-2 border rounded-md w-28' type="number" value={previousWaterCurrentReading2} onChange={(e) => setPreviousWaterCurrentReading2(e.target.value)}/>
                </div>
                <div className='m-2 p-2'>
                    <p>Consumed: {cubic2}</p>
                    <p>Total Bill: {totalWaterBill2}</p>
                </div>
                <Link className='p-2 rounded-xl border' href='/print' onClick={getValues}>Calculate</Link>
            </div>
            <div>
                {tenants.map((tenant, tenantIndex) => (
                    <div key={tenantIndex}>
                        <p>Tenant {tenantIndex + 1}</p>
                        <div>
                            <label>Name:</label>
                            <input type='text' name='name' value={tenant.name} onChange={(e) => handleInputChange(tenantIndex, e)} />
                        </div>
                        <div>
                            <label>Current Reading:</label>
                            <input type='text' name='currentReading' value={tenant.currentReading} onChange={(e) => handleInputChange(tenantIndex, e)} />
                        </div>
                        <div>
                            <label>Previous Reading:</label>
                            <input type='text' name='previousReading' value={tenant.previousReading} onChange={(e) => handleInputChange(tenantIndex, e)} />
                        </div>
                        <div>
                            <label>Current Water Reading:</label>
                            <input type='text' name='currentWaterReading' value={tenant.currentWaterReading} onChange={(e) => handleInputChange(tenantIndex, e)} />
                        </div>
                        <div>
                            <label>Previous Water Reading:</label>
                            <input type='text' name='previousWaterReading' value={tenant.previousWaterReading} onChange={(e) => handleInputChange(tenantIndex, e)} />
                        </div>
                        <div>
                            <label>Select water type (1 or 2):</label>
                            <input type='text' name='waterType' value={tenant.waterType} onChange={(e) => handleInputChange(tenantIndex, e)} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}