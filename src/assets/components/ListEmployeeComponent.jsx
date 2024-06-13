// This "rfce" command in code is normal js function but still we prefer arrow funciton "rafce"..

import React, {useEffect, useState} from 'react'
import { listEmployees } from '../../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

//Inorder to hold the response of the REST API we want to use the state variable and in the functional component in order to 
//contd: define the state variable we have to use "useState" hook---> usestatehook allows us to use the state variables in the 
//contd: funcitonal components.
const ListEmployeeComponent = () => {
    const navigate=useNavigate();


    //usestate take the parameter which is the initial value of the state variable. in this case we use an empty array.
    // usestate hook returns an array with exact 2 values.. 1- state variable..2- funtion that updates the state variable

    const [employees, setEmployees] = useState([])

    //Inorder to make the REST API call or the ajax call in the reactfunctional components we have to use the useEffect hook..
    //It take 2 parametes which are the call back function and the dependency list..(as of now there is no dependency so we keep it as the empty array list [])

    useEffect(() => {
            listEmployees().then((response)=> {
                setEmployees(response.data);
            }).catch(error => { 
                console.error(error);
            })
    },[])

    function addNewEmployee(){
        navigate('/add-employee')
    }
  return (
    <div className='container'>

        <h2 className='text-center'>LIST OF USERS</h2>
        <button className='btn btn-outline-primary ' onClick={addNewEmployee}>ADD USER</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>USER ID</th>
                    <th>USER firstname</th>
                    <th>USER lastname</th>
                    <th>USER email</th>
                </tr>
            </thead>
            <tbody>
                {   // this open and curverd curly braces are used to write the javascript code in the html 

                    employees.map(employee => 
                        <tr key={employee.id}>
                            <td>{employee.id}</td>  
                            <td>{employee.firstname}</td>  
                            <td>{employee.lastname}</td>  
                            <td>{employee.email}</td>                    
                        </tr>
                    )
                }

            </tbody>
        </table>
    </div>
  )
}

export default ListEmployeeComponent


