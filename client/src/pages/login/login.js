import * as React from "react";
import Box from "@mui/material/Box";
import { Field, Form, FormSpy } from "react-final-form";
import { email, required } from "../common/modules/form/validation";
import RFTextField from "../common/modules/form/RFTextField";
import FormButton from "../common/modules/form/FormButton";
import FormFeedback from "../common/modules/form/FormFeedback";
import { Redirect } from "react-router-dom";
import axios from "../../helpers/axios";
import {useDispatch} from 'react-redux';

export default function Login() {
    const [sent, setSent] = React.useState(false);
    const [isLogin, setIsLogin] = React.useState(true);
    const [error, setError] = React.useState("");
    const [isSubmitting, setIsSubmitting] = React.useState(true);
    const dispatch = useDispatch();

    const validate = (values) => {
        const errors = required(["email", "password"], values);

        if (!errors.email) {
            const emailError = email(values.email);
            if (emailError) {
                errors.email = emailError;
            }
        }

        return errors;
    };

    const handleSubmit = async (values) => {
        const { email } = values;
        try {
            const result = await axios.get(
                `http://localhost:5000/users?email=${email}`
            );
            if (result) {
                if (result.data) {
                    const { password } = result.data;
                    if (password === values.password) {
                        setIsLogin(false);
                        dispatch({
                            type: 'USER',
                            payload: result.data
                        })
                    } else {
                        console.log("password is not right");
                    }
                }
            }
        } catch (error) {
            console.log("🚀 ~ handleSubmit ~ error", error);
            setIsSubmitting(false);
            setSent(false);
            setError("Error Please try again")
        }
    };
    return (
        <div>
            {isLogin ? (
                <Form
                    onSubmit={handleSubmit}
                    subscription={{ submitting: isSubmitting }}
                    validate={validate}
                >
                    {({ handleSubmit: handleSubmit2, submitting }) => (
                        <Box
                            component="form"
                            onSubmit={handleSubmit2}
                            noValidate
                        >
                            <Field
                                autoComplete="email"
                                // autoFocus
                                component={RFTextField}
                                disabled={submitting || sent}
                                fullWidth
                                label="Email"
                                margin="normal"
                                name="email"
                                required
                                size="extrasmall"
                            />
                            <Field
                                fullWidth
                                size="extrasmall"
                                component={RFTextField}
                                disabled={submitting || sent}
                                required
                                name="password"
                                autoComplete="current-password"
                                label="Password"
                                type="password"
                                margin="normal"
                            />
                            <FormSpy
                                subscription={{
                                    submitError: true,
                                }}
                            >
                                {({ submitError }) =>
                                    submitError ? (
                                        <FormFeedback
                                            error
                                            sx={{
                                                mt: 2,
                                            }}
                                        >
                                            {submitError}
                                        </FormFeedback>
                                    ) : null
                                }
                            </FormSpy>
                            {error ? (
                                <h6
                                    style={{
                                        color: "red",
                                        textAlign: "center",
                                    }}
                                >
                                    {error}
                                </h6>
                            ) : null}
                            <FormButton
                                sx={{ mt: 3, mb: 2 }}
                                disabled={submitting || sent}
                                size="large"
                                color="secondary"
                                fullWidth
                            >
                                {submitting || sent
                                    ? "In progress…"
                                    : "Sign In"}
                            </FormButton>
                        </Box>
                    )}
                </Form>
            ) : (
                <Redirect to="/" />
            )}
        </div>
    );
}
