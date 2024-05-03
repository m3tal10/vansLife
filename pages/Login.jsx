import React from "react"
import { useLoaderData, Form, redirect, useActionData, useNavigation } from "react-router-dom"
import { loginUser } from "../api"

export async function loginLoader({ request }) {
    const message = new URL(request.url).searchParams.get("message")
    return message
}
export async function action({ request }) {

    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")
    const pathname= new URL(request.url).searchParams.get("redirectTo")||"/host"
    try {
        const data = await loginUser({ email, password })
        localStorage.setItem("loggedin", true)
        return redirect(pathname)
    }
    catch (err) {
        return err.message
    }
}
export default function Login() {
    const message = useLoaderData()
    const errorMessage = useActionData()
    const navigation = useNavigation().state

    return (
        <div className="login-container">
            {message && !errorMessage && <h3 className="red">{message}</h3>}
            {errorMessage && <h3 className="red">{errorMessage}</h3>}
            <h1>Sign in to your account</h1>
            <Form method="POST" className="login-form" replace>
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                <button
                    disabled={navigation === "submitting"}
                >
                    {navigation === "submitting"
                        ? "Logging in..."
                        : "Log in"
                    }
                </button>
            </Form>
        </div>
    )

}