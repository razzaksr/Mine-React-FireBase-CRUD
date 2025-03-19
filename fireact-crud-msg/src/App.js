import React, { useEffect, useState } from "react";
import { openAccount, suspendAccount, updateAccount, viewAccountByAccountNumber, viewAccountByCustomer, viewAccounts } from "./Services";

const App = () => {
  const [accounts, setAccounts] = useState([]);
  const [account, setAccount] = useState({
    id:"",number:0,balance:0.0,customer:""
  });
  const [newView,setNewView] = useState(false)
  const [editView,setEditView] = useState(false)
  const [selected, setSelected] = useState("")

  // Fetch items on load
  useEffect(() => {
    const fetchData = async () => {
      const data = await viewAccounts();
      setAccounts(data);
    };
    fetchData();
  }, []);


  // Add a new account
  const handleAdd = async () => {
    await openAccount(account)
    setAccounts({})
    const data = await viewAccounts();
    setAccounts(data);
    setNewView(false)
  };

  const collectInputs=(eve)=>{
    const{name, value} = eve.target
    setAccount((old)=>{
      return{
        ...old,
        [name]:value
      }
    })
  }

  const handleEdit = async(number)=>{
    console.log(number)
    setAccount(await viewAccountByAccountNumber(number))
    console.log(account)
    setEditView(true)
  }

  // Update an account
  const handleUpdate = async () => {
    alert(JSON.stringify(account))
    await updateAccount(account)
    setAccount({})
    const data = await viewAccounts();
    setAccounts(data) 
    setEditView(false)
  };

  // Delete an account
  const handleDelete = async (number) => {
    await suspendAccount(number);
    const data = await viewAccounts();
    setAccounts(data);
  };

  const selectCustomer = (eve)=>{
    setSelected(eve.target.value);
  }

  const handleOnlyCustomers=async()=>{
    const data = await viewAccountByCustomer(selected)
    // alert(found)
    setAccounts(data)
    alert('filtered')
  }

  return (
    <div>
      <h1>CRUD with React & Firebase</h1>
      {
      editView?
      <>
        <input type="hidden" value={account.id} onChange={collectInputs} name="id" />
        <input type="text" value={account.number} name="number" placeholder="account number" onChange={collectInputs} />
        <input type="text" value={account.balance} name="balance" placeholder="balance" onChange={collectInputs} />
        <input type="text" value={account.customer} name="customer" placeholder="customer" onChange={collectInputs} />
        <button onClick={handleUpdate}>Edit account</button>
      </>
      :
      newView?
      <>
        <input type="text" value={account.number} name="number" placeholder="account number" onChange={collectInputs} />
        <input type="text" value={account.balance} name="balance" placeholder="balance" onChange={collectInputs} />
        <input type="text" value={account.contact} name="customer" placeholder="customer" onChange={collectInputs} />
        <button onClick={handleAdd}>Add account</button>
      </>
      : 
      <>
        <button onClick={()=>{setNewView(true)}}>New Account</button>
        {/* List Items */}
        <input type="text" name="customer" placeholder="customer username name" onChange={selectCustomer}/>
        <button onClick={handleOnlyCustomers}>Filter</button>
        <table>
          <thead><tr><th>Account Number</th><th>Account Balance</th><th>Customer</th><th>Actions</th></tr></thead>
          <tbody>
            {
              accounts.map((v)=>(
                <tr>
                  <td>{v.number}</td><td>{v.balance}</td><td>{v.customer}</td>
                  <td>
                    <ol>
                      <li onClick={()=>{handleEdit(v.number)}} >Edit</li>
                      <li onClick={()=>{handleDelete(v.number)}}>Delete</li>
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
