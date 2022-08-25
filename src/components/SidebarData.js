import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import ListAltIcon from '@mui/icons-material/ListAlt';
import HailIcon from '@mui/icons-material/Hail';
import SettingsIcon from '@mui/icons-material/Settings';

export const SidebarData = [
    // {
    //     title: "Home",
    //     icon: <HomeIcon />,
    //     link: "/admin/adminpanel"
    // },

    {
        title: "Services",
        icon: <CleaningServicesIcon />,
        link: "/admin/viewservices"
    },

    {
        title: "Requests",
        icon: <ListAltIcon />,
        link: "/admin/viewrequests"
    },

    {
        title: "Staff",
        icon: <HailIcon />,
        link: "/admin/viewstaff"
    },

    // {
    //     title: "Settings",
    //     icon: <SettingsIcon />,
    //     link: "/signup"
    // }



]