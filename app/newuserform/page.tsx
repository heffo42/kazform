"use client";  // Add this directive at the top

import React from "react";
import dynamic from "next/dynamic";
import Retool from "react-retool";


const sampleData = { name: 'Sample data' }
const url = 'https://nextgenmsps.retool.com/embedded/public/6f6d3539-a70b-4752-81ec-6f5573068512'






export default function Home() {
  return (
    <main>
      
      
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
  <div style={{ flex: 1 }}>
  <Retool 
      url={url}
      data={sampleData}
    />
  </div>
</div>


    </main>
  );
}
