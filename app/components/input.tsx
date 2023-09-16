import { HTMLInputTypeAttribute } from "react"

interface Props {
  type?: HTMLInputTypeAttribute
  className?: string
  label: string
  value?: string
  maxLength?: number
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({
  type = "text",
  className = "",
  value = "",
  label,
  maxLength,
  onChange,
}: Props) => (
  <div className="flex justify-center items-center bg-black">
    <label className="relative">
      <input
        type="text"
        placeholder={label}
        className="h-10 w-48 px-3 text-lg text-white bg-black border-white border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
        value={value}
        maxLength={maxLength}
        onChange={onChange}
      />
      <span className="text-lg text-white text-opacity-80 bg-black absolute left-3 top-2 px-.5 transition duration-200 cursor-text input-animate">
        {label}
      </span>
    </label>
  </div>
)

export default Input
