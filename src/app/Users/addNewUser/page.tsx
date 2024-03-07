"use client"

import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const Formulario = () => {
  const [userType, setUserType] = useState('');
  const [adminRights, setAdminRights] = useState('');
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [role, setRole] = useState('');
  const [completeName, setCompleteName] = useState('');
  const [seniority, setSeniority] = useState('');
  const [photo, setPhoto] = useState('');
  const [email, setEmail] = useState('');
  const [team, setTeam] = useState('');
  const [leader, setLeader] = useState('');
  const [department, setDepartment] = useState('');
  const [groups, setGroups] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [associateTraining, setAssociateTraining] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('User Type:', userType);
    console.log('Admin Rights:', adminRights);
    console.log('Employee Number:', employeeNumber);
    console.log('Role:', role);
    console.log('Complete Name:', completeName);
    console.log('Photo:', photo);
    console.log('Email:', email);
    console.log('Team:', team);
    console.log('Leader:', leader);
    console.log('Department:', department);
    console.log('Groups:', groups);
    console.log('Country:', country);
    console.log('City:', city);
    console.log('Day:', day);
    console.log('Month:', month);
    console.log('Year:', year);
    console.log('Associate Training Plans?', associateTraining);
    console.log('seniority:', seniority);
  };

  return ( 
    <form  className="space-y-8">
      <div className="grid grid-cols-4 gap-4">
        <div className="flex items-center">
          <Icon icon="wpf:add-user" width="19" height="19" className="text-green-500" />
          <span className="font-semibold text-green-500 text-lg ml-2">Add New User</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <label htmlFor="userType" className="font-semibold">
            User Type
          </label>
          <select
            name='userType'
            id="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="block w-50 mt-2 focus:border-green-500 focus:outline-none border-black rounded-md"
          >
            <option value="">Selecione o tipo de utilizador</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            {/* Adicione mais opções conforme necessário */}
          </select>
        </div>
        <div>
          <label htmlFor="adminRights" className="font-semibold">
            Admin Rights
          </label>
          <input
          name='adminRights'
            id="adminRights"
            type="text"
            value={adminRights}
            onChange={(e) => setAdminRights(e.target.value)}
            className="block w-50 mt-2 focus:border-green-500 focus:outline-none border-black rounded-md"
          />
        </div>
        <div>
          <label htmlFor="employeeNumber" className="font-semibold">
            Employee Number
          </label>
          <input
          name='employeeNumber'
            id="employeeNumber"
            type="text"
            value={employeeNumber}
            onChange={(e) => setEmployeeNumber(e.target.value)}
            className="block w-50 mt-2 focus:border-green-500 focus:outline-none rounded-md"
          />
        </div>
        <div>
          <label htmlFor="role" className="font-semibold">
            Role
          </label>
          <input
          name='role'
            id="role"
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="block w-50 mt-2 focus:border-green-500 focus:outline-none rounded-md"
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <label htmlFor="seniority" className="font-semibold">
            Seniority
          </label>
          <select
          name='seniority'
            id="seniority"
            value={userType}
            onChange={(e) => setSeniority(e.target.value)}
            className="block w-50 mt-2 focus:border-green-500 focus:outline-none rounded-md"
          >
            <option value="">Selecione o tipo de utilizador</option>
            <option value="leader">Leader</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="completeName" className="font-semibold">
            Complete Name
          </label>
          <input
          name='completeName'
            id="completeName"
            type="text"
            value={completeName}
            onChange={(e) => setCompleteName(e.target.value)}
            className="block w-5/6 mt-2 focus:border-green-500 focus:outline-none rounded-md"
          />
        </div>
        <div>
          <label htmlFor="photo" className="font-semibold ml-4">
            Photo
          </label>
          <input
          name='photo'
            id="photo"
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.value)}
            className="block ml-4 mt-1 focus:border-green-500 focus:outline-none rounded-md"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input
          name='email'
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-4/6 mt-2 focus:border-green-500 focus:border-green-500 rounded-md"
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <label htmlFor="team" className="font-semibold">
            Team
          </label>
          <input
          name='team'
            id="team"
            type="text"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            className="block w-4/6 mt-2 focus:border-green-500 focus:outline-green-500 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="leader" className="font-semibold">
            Leader
          </label>
          <input
          name='leader'
            id="leader"
            type="text"
            value={leader}
            onChange={(e) => setLeader(e.target.value)}
            className="block w-4/6 mt-2 focus:border-green-500 focus:outline-green-500 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="department" className="font-semibold">
            Department
          </label>
          <input
          name='department'
            id="department"
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="block w-4/6 mt-2 focus:border-green-500 focus:outline-green-500 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="groups" className="font-semibold">
            Groups
          </label>
          <input
          name='groups'
            id="groups"
            type="text"
            value={groups}
            onChange={(e) => setGroups(e.target.value)}
            className="block w-4/6 mt-2 focus:border-green-500 focus:outline-green-500 rounded-md"
          />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <label htmlFor="country" className="font-semibold">
            Country
          </label>
          <input
          name='country'
            id="country"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="block w-4/6 mt-2 focus:border-green-500 focus:outline-green-500 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="city" className="font-semibold">
            City
          </label>
          <input
          name='city'
            id="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="block w-4/6 mt-2 focus:border-green-500 focus:outline-green-500 rounded-md"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="startDate" className="font-semibold">
            Start Date
          </label>
          <div className="flex items-center">
            <input
              id="day"
              type="text"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="block w-16 mt-2 mr-2 focus:border-green-500 focus:outline-green-500 rounded-md"
            />
            <input
              id="month"
              type="text"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="block w-16 mt-2 mr-2 focus:border-green-500 focus:outline-green-500 rounded-md"
            />
            <input
              id="year"
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="block w-16 mt-2 focus:border-green-500 focus:outline-green-500 rounded-md"
            />
          </div>
        </div>
        <div>
          <label htmlFor="city" className="font-semibold">
            Associate Training Plans?
          </label>
          <div className="flex items-center ml-4">
            <button
              onClick={() => setAssociateTraining('Yes')}
              className="bg-gray-400 text-white mt-2 px-6 py-2 mr-2 rounded-md focus:outline-none rounded-md"
            >
              Yes
            </button>
            <button
              onClick={() => setAssociateTraining('No')}
              className="bg-gray-400 text-white mt-2 px-6 py-2 rounded-md focus:outline-none rounded-md"
            >
              No
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex space-x-4 mt-12">
            <button type="submit" className="bg-gray-500 text-white px-4 py-2 rounded-md">
              Cancel
            </button>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
              Regist New User
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Formulario;

