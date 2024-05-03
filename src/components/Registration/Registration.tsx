import './Registration.css'
import { useEffect, useState } from 'react'

interface FormStructure {
    email: string;
    readonly username: string;
    password: string;
    passwordConfirm: string;
}

interface ErrorStructure {
    email: string;
    passwordConfirm: string;
}

export const Registration = () => {

    const [user, setUser] = useState<FormStructure>({
        email: "",
        username: "",
        password: "",
        passwordConfirm: "",
    })

    const [submitted, setSubmitted] = useState<boolean>(false)

    const [error, setError] = useState<ErrorStructure>({
        email: "",
        passwordConfirm: "",
    })

    useEffect(() => {
        if (user.email !== "") {
            let index: number = user.email.indexOf("@")
            if (index === (-1)) {
                setUser({ ...user, email: "", username: "" })
                setError({ ...error, email: "Incorrect e-mail format" })
            } else {
                setUser({ ...user, username: user.email.slice(0, index) })
                setError({ ...error, email: "" })
            }
        }
    }, [user.email])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    /*
        const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            let index: number = user.email.indexOf("@")
            if (user.username === "" && index !== (-1)) {
                setUser({ ...user, [e.target.name]: user.email.slice(0, index) })
                setError({ ...error, email: "" })
                console.log(index)
            } else {
                setUser({ ...user, email: "", username: "" })
                setError({ ...error, email: "Incorrect e-mail format" })
                alert("Email musí obsahovat @")
            }
        }
    */

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (user.password === user.passwordConfirm) {
            setError({ ...error, passwordConfirm: "" })
            setSubmitted(true)
            console.log(user)
        } else {
            setError({ ...error, passwordConfirm: "Passwords do not match" })
            /*alert("Přihlášení nebylo úspěšné.")*/
            setUser({ ...user, password: "", passwordConfirm: "" })
        }
    }

    return (
        <div className="form__container">
            <h1>REGISTRATION</h1>
            {submitted ? (
                <div>Login was successful!</div>
            ) : (
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="form__input"
                        name="email"
                        defaultValue={user.email}
                        placeholder="Email Address"
                        aria-label="Email Address"
                        onChange={handleChange}
                        required
                        autoFocus
                    />
                    <input
                        type="text"
                        className="form__input"
                        name="username"
                        value={user.username}
                        placeholder="User Name"
                        aria-label="User Name"
                        /*onChange={handleUserChange}*/
                        readOnly
                        required
                    />
                    <input
                        type="password"
                        className="form__input"
                        name="password"
                        value={user.password}
                        placeholder="Password"
                        aria-label="Password"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        className="form__input"
                        name="passwordConfirm"
                        value={user.passwordConfirm}
                        placeholder="Confirm Password"
                        aria-label="Confirm Password"
                        onChange={handleChange}
                        required
                    />
                    <button className="form__button" type="submit">REGISTER</button>

                    {error.email && <div>{error.email}</div>}
                    {error.passwordConfirm && <div>{error.passwordConfirm}</div>}

                </form>
            )}
        </div>
    )
}