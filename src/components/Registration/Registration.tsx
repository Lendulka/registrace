import { useEffect, useState } from 'react'
import './Registration.css'

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

export const Registration: React.FC<{}> = () => {

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (user.password === user.passwordConfirm) {
            setSubmitted(true)
            console.log(user)
        } else {
            setError({ ...error, passwordConfirm: "Password does not match" })
            setUser({ ...user, password: "", passwordConfirm: "" })
        }
    }

    return (
        <div className="form__container">

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