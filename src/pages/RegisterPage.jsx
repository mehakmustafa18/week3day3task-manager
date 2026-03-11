import { useNavigate, Link } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { registerUser } from '../services/api'

const registerSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

function RegisterPage() {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema: registerSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        const res = await registerUser(values)
        const { token, ...user } = res.data.data
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        navigate('/dashboard')
      } catch (err) {
        setStatus(err.response?.data?.message || 'Registration failed')
      } finally {
        setSubmitting(false)
      }
    },
  })

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1 className="auth-title">Create an account ✨</h1>
        <p className="auth-subtitle">
           Don't have an account?{' '}
          <Link to="/">Login here</Link>
        </p>

        {formik.status && (
          <div className="alert-error">{formik.status}</div>
        )}

        <form onSubmit={formik.handleSubmit}>

          {/* Name */}
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={formik.touched.name && formik.errors.name
                ? { borderColor: '#ef4444' } : {}}
            />
            {formik.touched.name && formik.errors.name && (
              <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                ⚠ {formik.errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={formik.touched.email && formik.errors.email
                ? { borderColor: '#ef4444' } : {}}
            />
            {formik.touched.email && formik.errors.email && (
              <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                ⚠ {formik.errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Min 6 characters"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={formik.touched.password && formik.errors.password
                ? { borderColor: '#ef4444' } : {}}
            />
            {formik.touched.password && formik.errors.password && (
              <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                ⚠ {formik.errors.password}
              </p>
            )}
          </div>

          <button
            className="btn-primary"
            type="submit"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Creating account...' : 'Register'}
          </button>

        </form>
      </div>
    </div>
  )
}

export default RegisterPage