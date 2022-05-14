import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import FeatureTableTask from './FeatureTableTask';

const FeatureTableFeature = ({feature}) => {

    const [open, setOpen] = useState(false);
    const [showPlus, setShow] = useState(false);


  return (
    <>
        <tr onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} style={{padding: 0, border: 'solid 1px black'}}>
            <td style={{width: '60px'}}>{showPlus && '+'}</td>
            <td style={{ display: 'flex', border: 'none'}}>
                {feature.Tasks[0] ? <button className='carretButton' onClick={() => setOpen(!open)}>{open ? '-': '+'}</button> :<div style={{width: '25px'}}></div> }
                {feature.name}</td>
            <td>{feature.status}</td>
            <td>{feature.user_name}</td>
            <td style={{width: '60px'}}>{feature.remaining_time}</td>

        </tr>
        {open ? <>
        {feature.Tasks.map((val, key) => {
            return(
                <FeatureTableTask key={key} task={val} />
            )
        })}
        </>: <></>}
    </>
  )
}

export default FeatureTableFeature