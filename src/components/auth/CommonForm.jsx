import { useState } from "react"
import { Link } from "react-router-dom"
import Loader from "../common/Loader"

export default function CommonForm({ title, fields, submitText, onSubmit, loading, alternateLink }) {
  const [formData, setFormData] = useState({})

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="sm:w-full sm:max-w-md font-montserrat flex flex-col justify-center bg-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-black/80">{title}</h2>
      </div>

      <div className="mt-8 w-full sm:mx-auto sm:max-w-md">
        <div className="px-4 py-8 sm:bg-white sm:shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {fields.map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id} className="block text-sm font-medium text-gray-900">
                  {field.label}
                </label>
                <div className="mt-1">
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    required={field.required}
                    placeholder={field.placeholder}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black text-base"
                    disabled={loading}
                  />
                </div>
              </div>
            ))}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                disabled={loading}
              >
                {loading ? <Loader custom='w-6 h-6' /> : submitText}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <p className="text-center text-sm text-gray-600">
              {alternateLink.text}{" "}
              <Link to={alternateLink.href} className="font-medium text-black hover:text-gray-800">
                {alternateLink.linkText}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}