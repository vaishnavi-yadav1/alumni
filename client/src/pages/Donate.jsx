import React from 'react'
import { useSelector } from 'react-redux';

 export default function Donate() {
   const { currentAlumni } = useSelector(state => state.alumni);
   console.log(currentAlumni);
  return (
    <div>
      donate
    </div>
  )
}

