import { Button, Form, Grid, Header, Message, Segment ,FormField,Input} from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useAuthContext } from '../hook/AuthContext';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
const signUp = (
    <>
        <p >Create your account</p>

    </>
)
const login = (
    <>
        <p> Please login in your account</p>
    </>
)
const LoginPage = () => {
    const [showSignUp, setShowSignUp] = useState(false)
    const { register, handleSubmit, formState: { errors }, watch } = useFormContext();
    const watchfield = watch();
    const { login } = useAuthContext()

    const onSubmit = (data) => {
        console.log(watchfield)
        login(data)
            .then(response => {
                console.log("sucess login")
                //push to location
            }).catch(error => {
                console.log(error)
            });
        //Axios handling in
    }
    useEffect(() => {
        console.log(errors);
    }, [errors])
    return (<>
        <Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    Log-in to your account
                </Header>
                {showSignUp ? signUp : login}
                <Form size='large' onSubmit={handleSubmit(onSubmit)}>

                    <Segment stacked>

                        <FormField>
                            <input  {...register('username')}/>
                        </FormField>
                        <FormField>
                            <input type='password' {...register('password')}/>
                        </FormField>

                        <Form.Button type='submit'>{showSignUp ? 'SignUp' : 'Login'}</Form.Button>
                    </Segment>
                </Form>
                {showSignUp ? <small>Already have an account?<a href='#' onClick={() => setShowSignUp(false)}> Log in here </a></small> : <small>Don't have an account?<a href='#' onClick={() => setShowSignUp(true)}> Sign up here </a></small>}





            </Grid.Column>
        </Grid>
    </>)
}

export default LoginPage;