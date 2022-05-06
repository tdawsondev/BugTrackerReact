import React from 'react'
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router";
import { setProject } from "../../redux/project";

const ProjectDetails = () => {

    const { id } = useParams();



  return (
    <div style={{padding: 20}}>{'ProjectDetails' + id}</div>
  )
}

export default ProjectDetails