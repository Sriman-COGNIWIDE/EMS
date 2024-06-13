import React, {useState} from 'react'
import { createEmployee } from '../../services/EmployeeService'
import { useNavigate } from 'react-router-dom'



const EmployeeComponent = () => {

    const [firstname, setFirstname]= useState('')
    const [lastname, setLastname]= useState('')
    const [email, setEmail]= useState('')

    // here we have used the usestate hook to initiialize the statevariables that does the validation error
    const[errors, setErrors]= useState({
        firstname:'',
        lastname:'',
        email:''
    })

    const navigate=useNavigate();

    function handleFirstName(e){
        setFirstname(e.target.value);
    }
    function handleLastName(e){
        setLastname(e.target.value);
    }
    function handleEmail(e){
        setEmail(e.target.value);
    }

    function saveEmployee(e){
        e.preventDefault();

        if(validateForm()){
            const employee = {firstname,lastname,email}
            console.log(employee)
    
            createEmployee(employee).then((response)=>{
                console.log(response.data);
    
                navigate('/employees')
            })
        }

 

    }

    function validateForm(){
        let valid=true;

        const errorCopy={...errors}  //spread operaor is just ussed to copy one obj to the other

        if(firstname.trim()){
            errorCopy.firstname='';
            }else{
                errorCopy.firstname='The first name is required';
                valid = false;
            }
        if(lastname.trim()){
            errorCopy.lastname='';
        }else{
            valid=false;
            errorCopy.lastname='The last name is required';
        }

        if(email.trim()){
            errorCopy.email='';
        }else{
            valid=false;
            errorCopy.email='The email is required';
        }

        setErrors(errorCopy);

        return valid;
    }


  return (
    <div className='container'>
        <br/>
        <br/>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                <h2 className='text-center'>Add Employee</h2>
                <form>
                    <div className='form-group mb2'>
                        <label className='form-label'>First Name</label>
                        <input 
                        type='text'
                        placeholder='Enter First Name'
                        name='firstname'
                        value={firstname}
                        className={`form-control ${errors.firstname ? 'is-invalid' :'' }` } //backtik symbol not single quote
                        onChange={handleFirstName}
                        >
                        </input>
                        {errors.firstname && <div className='invalid-feedback'>{errors.firstname}</div>} 
                    </div>
                    <div className='form-group mb2'>
                        <label className='form-label'>Last Name</label>
                        <input 
                        type='text'
                        placeholder='Enter Last Name'
                        name='Lastname'
                        value={lastname}
                        className={`form-control ${errors.lastname ? 'is-invalid' : '' }`}
                        onChange={handleLastName}
                        >
                        </input>
                        {errors.lastname && <div className='invalid-feedback'>{errors.lastname}</div>}
                    </div>
                    <div className='form-group mb2'>
                        <label className='form-label'>Email</label>
                        <input 
                        type='text'
                        placeholder='Enter email'
                        name='email'
                        value={email}
                        className={`form-control ${errors.email ? 'is-invalid' : '' }`}
                        onChange={handleEmail}
                        >
                        </input>
                        {errors.email && <div className='invalid-feedback'>{errors.email}</div>}

                    </div>
                    <button className='btn btn-success' onClick={saveEmployee}>SUBMIT</button>
                </form>

            </div>

        </div>
    </div>
  )
}

export default EmployeeComponent