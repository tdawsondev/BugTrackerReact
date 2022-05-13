import { Button } from '@mui/material';
import React, {useState } from 'react'

const FeatureTableTask = ({task}) => {

    const [open, setOpen] = useState(false);


  return (
    <>
        <tr style={{padding: 0, border: 'solid 1px black'}}>
            <td style={{paddingLeft: '50px', display: 'flex', border: 'none'}}>
                {task.Subtasks[0] ? <button className='carretButton' onClick={() => setOpen(!open)}>{open ? '-': '+'}</button> : <div style={{width: '25px'}}></div>}
                <div>{task.name}</div>
                </td>
            <td>{task.status}</td>
            <td>{task.user_name}</td>
        </tr>
        {open ? <>
        {task.Subtasks.map((val, key) =>{
            return(
            <tr key={key} style={{padding: 0, border: 'solid 1px black'}}>
                <td style={{paddingLeft: '100px', display: 'flex', border: 'none'}}>
                    <div>{val.name}</div>
                    </td>
                    <td>{val.status}</td>
                    <td>{val.user_name}</td>
            </tr>
            )
        })}
        </>: <></>}
    </>
  )
}

export default FeatureTableTask