import { Typography, Card, CardActions, CardContent, Link, Button, Divider } from "@mui/material"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router";
import { setProject } from "../../redux/project";

const Project = ({project}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setProjectState = () =>{
    dispatch(setProject(project));
    navigate("/projects/"+project.projectid);
  }


  return (
    <Card sx={{minWidth: 275, width: 400, margin: 2}}>
        <CardContent>
            <div style={{display: 'flex'}}>
                <Typography sx={{marginBottom: 1, flexGrow: 1}} variant="h6">{project.projectname}</Typography>
                <Typography color="secondary" sx={{marginTop: 1}} variant="body2">Admin</Typography>
            </div>
            <Divider />
            <Typography sx={{marginTop: 1}} variant="body2" color="text.secondary">{project.projectdescription}</Typography>
        </CardContent>
        <CardActions>
            <Button onClick={setProjectState} >Open</Button>
        </CardActions>
    </Card>
  )
}

export default Project