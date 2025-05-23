import { useState } from "react";
export default function RegisterForm() {
    const[username, setUsername] = useState(null);
    const[email, setEmail] = useState(null);
    const[password, setPassword] = useState(null);

    const handleSubmit = () => {
        const data = {
            username: username,
            email: email,
            password: password
        };
        if(data.username === null || data.email === null || data.password === null) {
            alert('Please fill in all fields!');
            return;
        }
        window.localStorage.setItem('user', JSON.stringify(data));
        alert('Registration successful!');
        window.location.href = '/';
        return;
    }

    return (
        <>
            <div className="container">
                <h2>Register</h2>
                <form className="register-form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" onChange={(e)=> setUsername(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" onChange={(e)=> setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" onChange={(e)=> setPassword(e.target.value)} required  />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Register</button>
                </form>
            </div>
        </>
    )
}
