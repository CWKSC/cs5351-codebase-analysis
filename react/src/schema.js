import * as yup from "yup";
const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default schema;