import React from 'react'
import ProjectList from '../components/ProjectList'

function Dashboard() {
    const decorator = JSON.parse(sessionStorage.getItem("decorator"));
    
  return (
    <div>Dashboard {decorator.userData.firstname}
    <ProjectList/>
    </div>
  )
}

export default Dashboard