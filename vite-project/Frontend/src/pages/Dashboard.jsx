import React from 'react';
import {
  ComposedChart, Line, Area, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart
} from 'recharts';

import { data, radarChart, barchar } from './Convertiondatagraph';
import { GoDotFill } from "react-icons/go";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

import bag from "../assets/ic-glass-bag.svg";
import buy from "../assets/ic-glass-buy.svg";
import message from "../assets/ic-glass-message.svg";
import user from "../assets/ic-glass-users.svg";

function Dashboard() {
  return (
    <>
     
      <section className="One px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         
          <div className="bg-white dark:bg-gray-800 dark:text-white mt-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h1 className="font-bold text-xl">Conversion rates</h1>
            <span className="text-sm text-gray-600 dark:text-gray-400">(+43%) than last year</span>
            <div className="w-full h-[250px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart layout="vertical" data={data}>
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" scale="band" />
                  <Tooltip />
                  <Legend />
                  <Area dataKey="amt" fill="#8884d8" stroke="#8884d8" />
                  <Bar dataKey="pv" barSize={20} fill="#413ea0" />
                  <Line dataKey="uv" stroke="#ff7300" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

         
          <div className="bg-white dark:bg-gray-800 dark:text-white mt-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h1 className="font-bold text-xl">Order timeline</h1>
            <div className="grid grid-cols-1 gap-4 mt-6">
              {["green", "yellow", "blue", "red"].map((color, idx) => (
                <div className="flex gap-2 items-start" key={idx}>
                  <div className="flex flex-col items-center">
                    <GoDotFill className={`text-${color}-500 h-6 w-6`} />
                    {idx < 3 && <hr className="bg-gray-600 w-1 h-10" />}
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold">1983 orders, $4220</h1>
                    <span className="text-sm text-gray-600 dark:text-gray-400">08 Nov 2023 12:00 am</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="TWO flex flex-wrap justify-center gap-4 mt-14 px-4">
      
        {[
          { color: 'blue', value: '714k', label: 'Weekly Sales', icon: bag, trend: '+2.6%', up: true },
          { color: 'orange', value: '1.3m', label: 'New Users', icon: user, trend: '-0.6%', up: false },
          { color: 'red', value: '8.1m', label: 'Purchase Orders', icon: buy, trend: '+2.6%', up: true },
          { color: 'purple', value: '714k', label: 'Messages', icon: message, trend: '+3.6%', up: true },
        ].map((card, index) => (
          <div
            key={index}
            className={`bg-${card.color}-100 dark:bg-${card.color}-900 dark:text-white p-6 rounded-lg shadow-lg flex flex-col justify-between w-full sm:w-[45%] md:w-64 min-h-[208px]`}
          >
            <p className="text-sm text-green-600 dark:text-green-400 flex justify-end items-center gap-1">
              {card.up ? <FaArrowTrendUp /> : <FaArrowTrendDown />} {card.trend}
            </p>
            <div className="flex justify-start">
              <img src={card.icon} alt="icon" className="w-10 h-10" />
            </div>
            <div className="flex flex-col items-start mt-4">
              <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-300">{card.label}</h3>
              <h1 className="text-3xl font-bold text-black dark:text-white mt-2">{card.value}</h1>
            </div>
          </div>
        ))}
      </section>

  
      <section className="three mt-14 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         
          <div className="bg-white dark:bg-gray-800 dark:text-white mt-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h1 className="font-bold text-xl">Current subject</h1>
            <div className="w-full h-[250px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarChart}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} />
                  <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          
          <div className="bg-white dark:bg-gray-800 dark:text-white mt-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h1 className="font-bold text-xl">Website visits</h1>
            <span className="text-sm text-gray-600 dark:text-gray-400">(+43%) than last year</span>
            <div className="w-full h-[250px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barchar} barSize={20}>
                  <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Bar dataKey="pv" fill="#8884d8" background={{ fill: '#eee' }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
