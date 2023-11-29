'use client'
import Link from 'next/link';
import {useState, useEffect} from 'react'
export default function InputSection() {
    const [bills, setBills] = useState({
        electric: { bill: 0 },
        water: { bill: 0 },
        water2: { bill: 0 }
    });

    const [rates, setRates] = useState({
        electric: { rate: 0 },
        water: { rate: 0 },
        water2: { rate: 0 }
    });
      
    const [readings, setReadings] = useState({
        electric: { currentReading: 0, previousReading: 0 },
        water: { currentReading: 0, previousReading: 0 },
        water2: { currentReading: 0, previousReading: 0 }
    });
      
    const [consumed, setConsumed] = useState({
        electric: { kwh: 0 },
        water: { cubic: 0 },
        water2: { cubic: 0 }
    });

    const [tenants, setTenants] = useState([]);

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
              waterType: '',
              meter: '',
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
        const data = {
            tenants: tenants,
            electric: {
                bill: bills.electric.bill,
                rate: rates.electric.rate,
                kwh: consumed.electric.kwh,
                currentReading: readings.electric.currentReading,
                previousReading: readings.electric.previousReading
            },
            water: {
                bill: bills.water.bill,
                rate: rates.water.rate,
                cubic: consumed.water.cubic,
                currentReading: readings.water.currentReading,
                previousReading: readings.water.previousReading
            },
            water2: {
                bill: bills.water2.bill,
                rate: rates.water2.rate,
                cubic: consumed.water2.cubic,
                currentReading: readings.water2.currentReading,
                previousReading: readings.water2.previousReading
            }
        };
        localStorage.setItem('data', JSON.stringify(data));
    }

    const InputField = (label, value, setValue) => (
        <div className='p-2 flex justify-between'>
            <label>{label}:</label>
            <input className='mx-2 border rounded-md w-28' type="number" value={value} onChange={(e) => setValue(e.target.value)}/>
        </div>
    );

    const updateStates = () => {
        const updatedConsumed = {
            electric: { kwh: Math.abs(readings.electric.currentReading - readings.electric.previousReading).toFixed(2) },
            water: { cubic: Math.abs(readings.water.currentReading - readings.water.previousReading).toFixed(2) },
            water2: { cubic: Math.abs(readings.water2.currentReading - readings.water2.previousReading).toFixed(2) },
        };
    
        const updatedBills = {
            electric: { bills: (updatedConsumed.electric.kwh * rates.electric.rate).toFixed(2) },
            water: { bills: (updatedConsumed.water.cubic * rates.water.rate).toFixed(2) },
            water2: { bills: (updatedConsumed.water2.cubic * rates.water2.rate).toFixed(2) },
        };
    
        setConsumed((prevConsumed) => ({ ...prevConsumed, ...updatedConsumed }));
        setBills((prevBills) => ({ ...prevBills, ...updatedBills }));
    };
    useEffect(() => {
        updateStates();
    }, [readings,rates]);
    

    const renderMeterSection = (title, rate, currentReading, previousReading, consumedUnit, bill, meterType, unit) => (
        <div className='meter-section'>
            <p className='font-bold'>{title}</p>
            {InputField(`${title} Rate`, rate, (value) => setRates((prevRates) => ({ ...prevRates, [meterType]: { rate: parseFloat(value) } })))}
            {InputField("Total Current Reading", currentReading, (value) => setReadings((prevReadings) => ({ ...prevReadings, [meterType]: { ...prevReadings[meterType], currentReading: value } })))}
            {InputField("Total Previous Reading", previousReading, (value) => setReadings((prevReadings) => ({ ...prevReadings, [meterType]: { ...prevReadings[meterType], previousReading: value } })))}
            <div className='p-2'>
                <p>Consumed: {consumedUnit} {unit}</p>
                <p>Total Bill: ₱{bill}</p>
            </div>
        </div>
    );

    return (
        <>
        <div className='h-screen flex 2xl:flex-col justify-evenly items-center'>
            <div className="p-4 flex flex-col border rounded-lg h-96 overflow-y-scroll">
                <p className=' text-2xl font-bold'>Input (Main Meter)</p>
                <div className=' p-2 flex'>
                    <label>Number of Tenants: </label>
                    <input className='mx-2 border rounded-md w-28' type="number" value={tenants.length} onChange={handleNumberOfTenantsChange}/>
                </div>
                {renderMeterSection('Electricity', rates.electric.rate, readings.electric.currentReading, readings.electric.previousReading, consumed.electric.kwh, bills.electric.bills, 'electric', 'kWh')}
                {renderMeterSection('Water (LL)', rates.water.rate, readings.water.currentReading, readings.water.previousReading, consumed.water.cubic, bills.water.bills, 'water', <>c<sup>3</sup></>)}
                {renderMeterSection('Water 2 (ML)', rates.water2.rate, readings.water2.currentReading, readings.water2.previousReading, consumed.water2.cubic, bills.water2.bills, 'water2', <>c<sup>3</sup></>)}
                <Link className='p-2 rounded-xl border' href='/print' onClick={getValues}>Calculate</Link>
            </div>
            <div className='p-8 h-96 w-1/3 border rounded-xl overflow-y-scroll'>
                {tenants.map((tenant, tenantIndex) => (
                    <div className='rounded border p-2 my-4' key={tenantIndex} >
                        <p>Tenant {tenantIndex + 1}</p>
                        {
                        [['name', 'Name'], ['currentReading', 'Current Reading'], ['previousReading', 'Previous Reading'], ['currentWaterReading', 'Current Water Reading'], ['previousWaterReading', 'Previous Water Reading'], ['waterType', 'Water Type'], ['meter', 'Main Meter?']]
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
        </>
    )
}