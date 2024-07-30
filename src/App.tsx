import React, { useEffect, useState } from 'react';
import './App.css';
import { Protect } from './components/Protect';
import { Table } from './components/Table';
import { Sidebar } from './components/Sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import usePasswordStore from './stores/passwordStore';

const App = () => {
  const {password, setPassword} = usePasswordStore()
  const [search, setSearch] = useState<any>(null)
  const [query, setQuery] = useState<any>()
  const navigate = useNavigate()
  const {name} = useParams()
  
  useEffect(() => {
    if (name === 'all') {
      navigate('/overview')
    }
  }, [name])
    
  useEffect(() => {
    localStorage.setItem("password", password)
  }, [password])

  useEffect(() => {
    if (!search) {
      setQuery(search)
    }
  }, [search])

  return (
    <div>
      <Sidebar />
      {
        password.length >= 10 ? (
            <div className='bg-slate-700 p-10 min-h-screen min-w-screen'>
              <div className='flex gap-2 justify-center my-5'>
                <input onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setQuery(search)
                  }
                }} onChange={(v: any) => setSearch(v.target.value)} className='px-3 py-1 w-4/5 max-w-[500px] rounded bg-slate-800 border border-slate-500 text-slate-300'/>
                <button onClick={() => setQuery(search)} className='text-slate-300 bg-slate-700 border border-slate-400 px-2 rounded-lg hover:bg-slate-800'>Search</button>
              </div>
              <Table query={query} search={search}/>
            </div>
          ) : (
            <Protect />
        )
      }
    </div>
  )
}



export default App;
