import { Navigate } from "react-router-dom";

function Home({user}) {
    if (user) {
        return <Navigate to='/dashboard' />
    }
    else {
        return <Navigate to='login' />
    }
}

export default Home;