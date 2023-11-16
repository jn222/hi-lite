import classNames from "classnames"
import Button from "./button"
import { type Highlight, type TimeUnit } from "../types/highlight.types"
import { type FC } from "react"
import ErrorText from "./error-text"

interface Props {
  choices: Highlight[]
  className?: string
  designation?: TimeUnit
  onSelect: (id: number, designation: TimeUnit) => void
  error?: string
}

/** Multiple choice component for designating highlights */

const MultipleChoiceGroup: FC<Props> = ({
  choices,
  className,
  designation,
  onSelect,
  error
}: Props) => {
  return designation ? (
    <div className={classNames("text-center", className)}>
      <h1 className="text-2xl my-5">
        What was your favorite highlight from
        {designation === "day" ? " yesterday" : ` last ${designation}`}?
      </h1>
      {choices.map(({ id, content }, index) => (
        <Button
          className={classNames(
            // TODO make growWrapper house other common anims?
            "w-96 my-5 w-full animate-in fade-in slide-in-from-left-4 ease-in-out duration-500",
            `delay-${100 * index}`
            // TODO make delay work, maybe don't use tailwindcss anim package
          )}
          key={id}
          onClick={() => {
            onSelect(id, designation)
          }}
        >
          {content}
        </Button>
      ))}
      <ErrorText error={error} />
    </div>
  ) : null
}

export default MultipleChoiceGroup
