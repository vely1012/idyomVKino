import Header from "../components/client/Header/Header"
import LoginForm from "../components/admin/LoginForm/LoginForm"
import AdminFlag from "../components/admin/AdminFlag";


export default function Login() {
    // document.body.classList.add('admin');

    return (
        <>
        <Header />
        <LoginForm />
        <AdminFlag />
        </>
    )
}