const getRecordedReadings = async(id) =>{
    const res = await fetch(`http://localhost:3000/api/logs/${id}`,{
        cache: 'no-cache'
    })
    if(res.ok) return await res.json()
}   

export default async function Logs({params}){
    const {id} = params
    const {records} = await getRecordedReadings(id)

    if(!records) return <div className="h-screen flex justify-center items-center">No records.</div> 

    return (
        <>
            {records.map((t) => {
                
            })}
        </>
    )
}