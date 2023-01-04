import React from 'react';
import './sign-up.css';
import content from '../../static/template';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Link} from 'react-router-dom';


const schema = yup.object().shape({
   fullname: yup.string().required().min(6),
   email: yup.string().required('Please enter a valid email address.'),
   usertype: yup.string(),
   password: yup.string().required('Please enter password.')
   .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 
   'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and special case Character')
});

const SignUp = () => {
    
    const {register, handleSubmit, formState: {errors}} = useForm(
        {
            resolver: yupResolver(schema),
        }
    );


    const onSubmit =(data)=>{

        console.log(data);
        console.log('Sign up successful');
    }

    


    return ( 
        <div className="sign-up" >
            <h1>CHATSCRUM</h1>
            <h1>Don't Have an account?</h1>
            <form className='sign-up-form' onSubmit={handleSubmit(onSubmit)}>
             <h3>Sign up here!</h3>
                {content.inputs.map((input, key) =>{
                    return(
                        <div key={key}>
                            <label htmlFor={input.name}>{input.label}</label>
                            <br />
                            <input  type={input.type} name={input.name} {...register(input.name)}/>
                            <span className='message'>{errors[input.name]?.message}</span>
                        </div>
                    )
                })}

                <label htmlFor="options">User Type</label>
                <select id="options" {...register('usertype')} name="usertype">
                    <option value="Developer">Developer</option>
                    <option value="Owner">Owner</option>
                </select>

                <button className='SignUp-btn'>SIGN UP</button>

                <p>Have an account? <Link to="/signin">Sign In</Link> </p>

            </form>
                <p><Link to="/">Back to Home</Link></p>
           </div>
     );
}
 
export default SignUp;