import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function ServiceTabs(props) {
    const [value, setValue] = useState('pending');

    const handleChange = (e, newValue) => {
        setValue(newValue);
        props.onChangeOption(newValue)
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
            >
                <Tab value="pending" label="pending" />
                <Tab value="accepted" label="accepted" />
                <Tab value="rejected" label="rejected" />
            </Tabs>
        </Box>
    );
}
