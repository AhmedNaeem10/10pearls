import React from 'react'
import { NavLink } from 'react-router-dom';
import './AdminPanel.css'
import { SidebarData } from "./SidebarData"

function Sidebar() {
  return (
    <div className='Sidebar'>
      <ul className="SidebarList">
        <div className="Dashboard">Dashboard</div>
        {SidebarData.map((val, key) => {
          return (
            <NavLink style={{ textDecoration: "none" }} to={`${val.link}`} key={key}
              className="row"
            >
              <div id="icon">
                {val.icon}
              </div> {" "}
              <div id="title">
                {val.title}
              </div>

            </NavLink>
          );
        })}

      </ul>

    </div>
  )
}

export default Sidebar 