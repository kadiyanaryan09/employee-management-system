import React from "react";
import { useState, useEffect } from "react";

function App() {
  const [employees, setEmployees] = useState([]);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');

  const addemployee = async () => {
    await fetch('http://localhost:3000/employee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        name,
        email,
        course
      })
    });

    fetchEmployees();
  };
 const updateemployee = async () => {
  await fetch('http://localhost:3000/employee', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      name,
      email,
      course
    })
  });

  fetchEmployees();
};
const deleteemployee = async ()=>{
  await fetch('http://localhost:3000/employee',{
    method:'DELETE',
    headers:{
      'Content-Type':'application/json',
    },
    body:JSON.stringify({
      id,
      name,
      email,
      course
    })

  })
fetchEmployees();
}

  

  const fetchEmployees = async () => {
    const res = await fetch("http://localhost:3000/employee");
    const data = await res.json();
    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div>
      <h1>employee management system</h1>
       <input
        type="number"
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      />
      <button onClick={addemployee}>
        Add employee
      </button>
      <table border='1'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>email</th>
            <th>course</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.course}</td>
              <td>
                <button onClick={updateemployee}>update</button>
                <button on onClick={deleteemployee}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     
    </div>
  );
}

export default App;
