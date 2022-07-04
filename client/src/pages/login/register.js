import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Field, Form, FormSpy } from "react-final-form";
import { email, required } from "../common/modules/form/validation";
import RFTextField from "../common/modules/form/RFTextField";
import FormButton from "../common/modules/form/FormButton";
import FormFeedback from "../common/modules/form/FormFeedback";
import axios from "../../helpers/axios";
import { v4 as uuidv4 } from 'uuid';

export default function Register(props) {
    const [sent, setSent] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(true);
    const [error, setError] = React.useState("");

    const validate = (values) => {
        const errors = required(
            ["firstName", "lastName", "email", "password"],
            values
        );

        if (!errors.email) {
            const emailError = email(values.email);
            if (emailError) {
                errors.email = emailError;
            }
        }

        return errors;
    };

    const handleSubmit = async (values) => {
        const { firstName, lastName, email, password } = values;
        const payload = {
            userName: firstName + lastName,
            userEmail: email,
            password,
            role: "customer",
            userId: uuidv4()
        };
        
        try {
            const result = await axios.post(
                `http://localhost:5000/users`,
                payload
            );
            if (result) {
                if (result.status === 201) {
                    setSent(true);
                    props.moveToLogin(1);
                }
            }
        } catch (error) {
            setIsSubmitting(false);
            setSent(false);
            setError("Could not Create User. Kindly try again");
        }
    };
    return (
        <Form
            onSubmit={handleSubmit}
            subscription={{ submitting: isSubmitting }}
            validate={validate}
        >
            {({ handleSubmit: handleSubmit2, submitting }) => (
                <Box component="form" onSubmit={handleSubmit2} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Field
                                component={RFTextField}
                                disabled={submitting || sent}
                                autoComplete="given-name"
                                fullWidth
                                label="First name"
                                name="firstName"
                                required
                                size="extrasmall"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field
                                component={RFTextField}
                                disabled={submitting || sent}
                                autoComplete="family-name"
                                fullWidth
                                label="Last name"
                                name="lastName"
                                required
                                size="extrasmall"
                            />
                        </Grid>
                    </Grid>
                    <Field
                        autoComplete="email"
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
                        component={RFTextField}
                        disabled={submitting || sent}
                        required
                        name="password"
                        autoComplete="new-password"
                        label="Password"
                        type="password"
                        margin="normal"
                        size="extrasmall"
                    />
                    <FormSpy subscription={{ submitError: true }}>
                        {({ submitError }) =>
                            submitError ? (
                                <FormFeedback error sx={{ mt: 2 }}>
                                    {submitError}
                                </FormFeedback>
                            ) : null
                        }
                    </FormSpy>
                    {error ? (
                        <h6 style={{ color: "red", textAlign: "center" }}>
                            {error}
                        </h6>
                    ) : null}
                    <FormButton
                        sx={{ mt: 3, mb: 2 }}
                        disabled={submitting || sent}
                        color="secondary"
                        fullWidth
                    >
                        {submitting || sent ? "In progress…" : "Sign Up"}
                    </FormButton>
                </Box>
            )}
        </Form>
    );
}
