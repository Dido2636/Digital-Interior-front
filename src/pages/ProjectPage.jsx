import React from 'react'
import { useParams } from 'react-router-dom'

function ProjectPage() {
  const {id } = useParams
  return (
    <div>
      Votre Projet {id}
    </div>
  )
}

export default ProjectPage