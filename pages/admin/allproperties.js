import React, { useEffect } from 'react';
import Router from 'next/router';

function AllProperties() {
    useEffect(()=>{
        Router.push('./adminlanding')
    },[])
  return (
    <div>Re-directing</div>
  )
}

export default AllProperties