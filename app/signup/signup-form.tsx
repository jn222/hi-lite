import { Form, Formik } from "formik"
import Link from "next/link"
import * as Yup from "yup"
import Button from "../components/button"
import Input from "../components/input"
import ErrorText from "../components/error-text"

const FormSchema = Yup.object({
  email: Yup.string()
    .required("Please enter an email")
    .email("Please enter a valid email"),
  name: Yup.string()
    .required("Please enter a name")
    .max(50, "Name can only contain up to 50 characters"),
  password: Yup.string().required("Please enter a password"),
  confirmPassword: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
})
// Maybe throw this in a types file?
export type FormFields = Yup.InferType<typeof FormSchema>

interface Props {
  onSubmit: (values: Yup.InferType<typeof FormSchema>) => void
  submitError?: string
}

const SignupForm = ({ onSubmit, submitError }: Props) => {
  return (
    <Formik
      initialValues={{
        email: "",
        name: "",
        password: "",
        confirmPassword: ""
      }}
      validationSchema={FormSchema}
      onSubmit={onSubmit}
    >
      {({
        errors,
        touched,
        values,
        handleBlur,
        handleChange,
        handleSubmit,
        isValid,
        dirty
      }) => (
        // TODO make validation look better
        <form onSubmit={handleSubmit} className="my-5 text-center">
          <h1 className="text-2xl">Sign up</h1>
          <div className="text-center my-5">
            <Input
              type="text"
              label="Name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.name && touched.name && <ErrorText error={errors.name} />}
          </div>
          <div className="text-center mb-5">
            <Input
              type="email"
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && (
              <ErrorText error={errors.email} />
            )}
          </div>
          <div className="text-center mb-5">
            <Input
              type="password"
              label="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password && (
              <ErrorText error={errors.password} />
            )}
          </div>
          <div className="text-center mb-5">
            <Input
              type="password"
              label="Confirm password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <ErrorText error={errors.confirmPassword} />
            )}
          </div>
          <div className="my-5">
            <Button type="submit" disabled={!isValid || !dirty}>
              Submit
            </Button>
          </div>
          <ErrorText error={submitError} />
          <Link href="/login">Log in here</Link>
        </form>
      )}
    </Formik>
  )
}

export default SignupForm
