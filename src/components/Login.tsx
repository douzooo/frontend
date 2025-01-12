import { useEffect, useState } from "react";
import fkStudios from "../assets/fkStudios.jpeg";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
    });

    const auth = useAuth();
    const navigate = useNavigate();

    const handleSubmitEvent = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (input.email !== "" && input.password !== "") {
            auth.loginAction(input);
            return;
        }

        alert("Please provide a valid input.");
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        // Optionally handle side effects when user is logged in
        if (auth.user) {
            console.log("User is already logged in:", auth.user);
        }
    }, [auth.user]);

    if (auth.user) {
        // User is already logged in
        return (
            <>
                <div className="container">
                    <div className="login">
                        <img className="logo" src={fkStudios} alt="FK Studios Logo" />

                        <form action="">
                            <img className="avatar" src={auth.user.avatar} alt="" />
                            <h2>{auth.user.name || auth.user.email}</h2>
                            <button onClick={() => navigate("/dashboard")}>Weiter</button>
                        </form>
                        <a href="/">&#x25c0; Zurück zu Fabian Kranzl</a>
                    </div>
                </div>

                <div className="footer">
                    <p>
                        Elpmis by <a href="https://douzooo.github.io">David B</a>
                    </p>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="container">
                <div className="login">
                    <img className="logo" src={fkStudios} alt="FK Studios Logo" />
                    <form onSubmit={handleSubmitEvent}>
                        <label htmlFor="email">E-Mail</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="E-Mail"
                            required
                            minLength={3}
                            maxLength={60}
                            onChange={handleInput}
                        />
                        <label htmlFor="password">Passwort</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            required
                            onChange={handleInput}
                        />
                        <button type="submit">Anmelden</button>
                    </form>
                    <a href="/">&#x25c0; Zurück zu Fabian Kranzl</a>
                </div>
            </div>

            <div className="footer">
                <p>
                    Elpmis by <a href="https://douzooo.github.io">David B</a>
                </p>
            </div>
        </>
    );
};

export default Login;
