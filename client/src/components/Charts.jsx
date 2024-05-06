import React from 'react'
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
  } from "recharts";

const Charts = ({data}) => {
  return (
    <div>
      <ResponsiveContainer
      width={"100%"}
      height={300}
      >
        <BarChart 
        width={150}
        height={40}
        data={data}
        >
            <XAxis dataKey="name"/>
            <YAxis dataKey="total"/>
            <Tooltip/>
            <Legend/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Bar
            dataKey="total" fill='#8884d8'
            />
        </BarChart>
        

      </ResponsiveContainer>
    </div>
  )
}

export default Charts
