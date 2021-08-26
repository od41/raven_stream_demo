import {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import StreamDashboard from '../components/StreamDashboard';


const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

export default function Dashboard() {

    const [clientRole, setClientRole] = useState('')
    const [username, setUsername] = useState('')
    const [channel, setChannel] = useState('')
    
    const query = useQuery();

    useEffect(() => {
        setClientRole(query.get("role"))
        setUsername(query.get("username"))
        setChannel(query.get("channel"))
    }, [])
    
    return (
        <>
            {/* {
                clientRole === 'host' ? 
                    <Host username={username} channel={channel} /> 
                    : <Audience username={username} channel={channel} />
            } */}
            <StreamDashboard username={username} channel={channel} role={clientRole} />
        </>
    )
}