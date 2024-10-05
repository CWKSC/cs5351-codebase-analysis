import { Button, Form, Grid, Header, Message, Segment, FormField, Input } from 'semantic-ui-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '../hook/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import getSchema from '../schema';
import { useTranslation } from 'react-i18next';
import { yupResolver } from "@hookform/resolvers/yup";
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';



const LoginPage = () => {
    const { handleGoogleLogin, handleGithubLogin } = useAuthContext();  // Note the change here
    const { t, i18n } = useTranslation();

    return (
        <Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    {t('login.title')}
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                console.log(credentialResponse);
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />;
                        <Form.Button onClick={handleGoogleLogin}>Google</Form.Button>
                        <Form.Button onClick={() => handleGithubLogin()}>GitHub</Form.Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    );
}

export default LoginPage;