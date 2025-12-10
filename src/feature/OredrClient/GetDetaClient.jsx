import React, { useEffect, useState } from 'react'
import { useData } from '../../context/Context';

export default function GetDataClient() {
  
  // const {dataClient,setDataCLient}=useData()

  
  // const getData = async () => {
  //     try {
  //       const res = await fetch(
  //         'https://api.sheetbest.com/sheets/da49e06f-b7f5-4422-ae96-4073b28112c3',
  //       );
  //       const data = await res.json();
  //       setDataCLient(data);
  //       // setData(Object.keys(data).map((key) => data[key]));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
    useEffect(()=>{
      // getData()
    },[]) 
  return (
    <div>
      
    </div>
  )
}
