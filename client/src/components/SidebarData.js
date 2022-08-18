import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import ListAltIcon from '@mui/icons-material/ListAlt';
import HailIcon from '@mui/icons-material/Hail';
import SettingsIcon from '@mui/icons-material/Settings';

export const SidebarData = [
    {
        title: "Home",
        icon: <HomeIcon />,
        link: "/adminpanel"
    },

    {
        title: "Services",
        icon: <CleaningServicesIcon />,
        link: "/viewservices"
    },

    {
        title: "Requests",
        icon: <ListAltIcon />,
        link: "/viewrequests"
    },

    {
        title: "Staff",
        icon: <HailIcon />,
        link: "/viewstaff"
    },

    {
        title: "Settings",
        icon: <SettingsIcon />,
        link: "/signup"
    }



]