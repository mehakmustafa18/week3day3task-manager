import { useFormik } from 'formik'
import * as Yup from 'yup'
import { createTask } from '../services/api'

const taskSchema = Yup.object({
  title: Yup.string()
    .min(2, 'Title must be at least 2 characters')
    .required('Title is required'),
})

function TaskForm({ onTaskAdded }) {
  const formik = useFormik({
    initialValues: { title: '' },
    validationSchema: taskSchema,
    onSubmit: async (values, { setSubmitting, setStatus, resetForm }) => {
      try {
        const res = await createTask({ title: values.title.trim() })
        onTaskAdded(res.data.data)
        resetForm()
      } catch (err) {
        setStatus(err.response?.data?.message || 'Failed to add task. Please try again.')
      } finally {
        setSubmitting(false)
      }
    },
  })

  return (
    <div className="task-form-card">
      <p className="task-form-title">➕ Add New Task</p>

      {formik.status && (
        <div className="alert-error">{formik.status}</div>
      )}

      <form onSubmit={formik.handleSubmit}>
        <div className="task-form-row">
          <div style={{ flex: 1 }}>
            <input
              type="text"
              name="title"
              placeholder="What needs to be done?"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={formik.touched.title && formik.errors.title
                ? { borderColor: '#ef4444' } : {}}
            />
            {formik.touched.title && formik.errors.title && (
              <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                ⚠ {formik.errors.title}
              </p>
            )}
          </div>

          <button
            className="btn-add"
            type="submit"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Adding...' : 'Add Task'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default TaskForm