import * as React from "react"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className="block px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
      {...props}
    />
  )
}

export { Input }
