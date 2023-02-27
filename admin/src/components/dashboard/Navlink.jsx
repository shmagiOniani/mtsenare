import React, {useState, useEffect} from 'react'
import {useLocation, Link} from 'react-router-dom'

export default function Navlink(props) {
    const [isActive, setIsActive] = useState();
    const location = useLocation();
    const currentLocation = location.pathname

    useEffect(() => {
        currentLocation.includes(props.to) ? setIsActive(true) : setIsActive(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentLocation])

    return (
        <Link className={`nav-link ${isActive && 'active'}`} {...props}>
            {props.children}
        </Link>
    )
}