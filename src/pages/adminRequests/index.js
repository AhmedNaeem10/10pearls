import React, { useState } from 'react'
import Requests from '../../components/Requests'
import ServiceTabs from '../../components/ServiceTabs'

export default function AdminRequests() {
    const [option, setOption] = useState('pending');
    const optionChange = (value) => {
        setOption(value);
        console.log(option);
    }


    return (
        <div>
            <ServiceTabs onChangeOption={optionChange} />
            <Requests option={option} />
        </div>
    )
}
