import classNames from "classnames"
import {
  type ReactNode,
  type ChangeEvent,
  type FocusEvent,
  type HTMLInputTypeAttribute
} from "react"

interface Props {
  type?: HTMLInputTypeAttribute
  className?: string
  label: string
  value?: string
  name?: string
  maxLength?: number
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: FocusEvent<any, Element>) => void
}

const Input = ({
  type = "text",
  className = "",
  value = "",
  name,
  label,
  maxLength,
  onChange,
  onBlur
}: Props): ReactNode => (
  <div
    className={classNames(
      "flex justify-center items-center bg-black",
      className
    )}
  >
    <label className="relative">
      <input
        type={type}
        placeholder={label}
        className="h-10 w-72 px-3 text-lg text-white bg-black border-white border-2 rounded-lg border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
        value={value}
        name={name}
        maxLength={maxLength}
        onChange={onChange}
        onBlur={onBlur}
      />
      <span className="text-lg text-white text-opacity-80 bg-black absolute left-3 top-2 px-.5 transition duration-200 cursor-text input-animate">
        {label}
      </span>
    </label>
  </div>
)

export default Input
