import { Select } from '@chakra-ui/react'
import React from 'react'

const SelectDrop = ({title,arr, onChange}) => {
    return (
        <>
            <Select borderRadius='40px' bg='#173d77' color='white' onChange={onChange}>
                <option>{title}</option>
                {arr.map((ele)=>(
                    <option style={{color:'black'}} key={ele.id} value={ele.id}>{ele.genre}</option>
                ))}
            </Select>
        </>
    )
}

export default SelectDrop