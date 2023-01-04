import React from 'react';
import './sign-in.css'
import '../../static/template';
import content from '../../static/template2';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import {Link} from 'react-router-dom';

const schema = yup.object().shape({
    projectname: yup.string().required().min(6),
    email: yup.string().required("please enter a valid email"),
    password: yup.string().required("please enter password").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 
    'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and special case Character')
});

const SignIn = () => {
    
const {register, handleSubmit, formState:{errors}} = useForm({
    resolver: yupResolver(schema),
});

const onSubmit=(data)=>{
    console.log(data);
}

    return ( 
        <div className="sign-in">
            <h1>CHATSCRUM</h1>
           <h1>Have an account Already?</h1>
           <form className='sign-in-form' onSubmit={handleSubmit(onSubmit)}>
              <h3>Sign in here!</h3>
                {content.inputs.map((input, key) =>{
                    return(
                        <div key={key}>
                            <label htmlFor={input.name}>{input.label}</label>
                            <br />
                            <input type={input.type} name={input.name} {...register(input.name)} />
                            <span className='message'>{errors[input.name]?.message}</span>
                        </div>
                    )
                })}

                <div className="hidden">
                <label htmlFor="options">User Type</label>
                <select id="options" {...register('usertype')} name="usertype">
                    <option value="Developer">Developer</option>
                    <option value="Owner">Owner</option>
                </select>
                </div>
               
                <Link to='/scrumboard'><button className='SignIn-btn'>SIGN IN</button></Link>

                <p>Don't Have an account? <Link to="/signup">Sign up!</Link></p>
                
            </form>

            <p><Link to="/">Back to Home</Link></p>
        </div>
     );
}
 
export default SignIn;