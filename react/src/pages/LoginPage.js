import React from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import { useAuthContext } from '../hook/AuthContext';
import { useTranslation } from 'react-i18next';
import { GoogleLogin } from '@react-oauth/google';
import '../styles/GitHubButton.css';
const LoginPage = () => {
    const { handleGoogleLogin, initiateGitHubLogin } = useAuthContext();
    const { t } = useTranslation();

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
                                handleGoogleLogin(credentialResponse);
                            }}
                            onError={() => {
                                console.log('Google Login Failed');
                            }}
                        />
                        <Form.Button onClick={handleGoogleLogin}>Google</Form.Button>
                        <div style={{ marginTop: '10px' }}>
                            <button className="github-button" onClick={initiateGitHubLogin}>
                                Login with GitHub
                            </button>
                        </div>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    );
}

export default LoginPage;