import React, { use, useEffect, useState } from "react";
import { addCustomer, getCustomerByUsername ,getCustomers, deleteCustomer, updateCustomer } from "./Services";

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState({
    id:"",fullname:"",username:"",contact:0
  });
  const [newView,setNewView] = useState(false)
  const [editView,setEditView] = useState(false)

  // Fetch items on load
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCustomers();
      setCustomers(data);
    };
    fetchData();
  }, []);

  // Add a new customer
  const handleAdd = async () => {
    await addCustomer(customer)
    setCustomer({})
    const data = await getCustomers();
    setCustomers(data);
    setNewView(false)
  };

  const handleEdit = async(username)=>{
    console.log(username)
    setCustomer(await getCustomerByUsername(username))
    console.log(customer)
    setEditView(true)
  }

  // Update an customer
  const handleUpdate = async () => {
    await updateCustomer(customer);
    setCustomer({})
    const data = await getCustomers();
    setCustomers(data);
    setEditView(false)
  };

  // Delete an customer
  const handleDelete = async (username) => {
    await deleteCustomer(username);
    const data = await getCustomers();
    setCustomers(data);
  };

  const collectInputs=(eve)=>{
    const{name, value} = eve.target
    setCustomer((old)=>{
      return{
        ...old,
        [name]:value
      }
    })
  }

  return (
    <div>
      <h1>CRUD with React & Firebase</h1>
      {
      editView?
      <>
        <input type="hidden" value={customer.id} onChange={collectInputs} name="id" />
        <input type="text" value={customer.fullname} name="fullname" placeholder="customer name" onChange={collectInputs} />
        <input type="text" value={customer.username} name="username" placeholder="user name" onChange={collectInputs} />
        <input type="text" value={customer.contact} name="contact" placeholder="contact" onChange={collectInputs} />
        <button onClick={handleUpdate}>Edit Customer</button>
      </>
      :
      newView?
      <>
        <input type="text" value={customer.fullname} name="fullname" placeholder="customer name" onChange={collectInputs} />
        <input type="text" value={customer.username} name="username" placeholder="user name" onChange={collectInputs} />
        <input type="text" value={customer.contact} name="contact" placeholder="contact" onChange={collectInputs} />
        <button onClick={handleAdd}>Add Customer</button>
      </>
      :
      <>
        <button onClick={()=>{setNewView(true)}}>New Customer</button>
        {/* List Items */}
        <table>
          <thead><tr><th>Name</th><th>User name</th><th>Contact</th><th>Actions</th></tr></thead>
          <tbody>
            {
              customers.map((v)=>(
                <tr>
                  <td>{v.fullname}</td><td>{v.username}</td><td>{v.contact}</td>
                  <td>
                    <ol>
                      <li onClick={()=>{handleEdit(v.username)}} >Edit</li>
                      <li onClick={()=>{handleDelete(v.username)}}>Delete</li>
                    </ol>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </>
      }
    </div>
  );
};

export default App;


// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
