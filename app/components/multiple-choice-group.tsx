import Button from "./button"

type Highlight = {
  id: string
  created_at: string
  content: string
}

interface Props {
  choices: Highlight[]
}

const MultipleChoiceGroup = ({ choices }: Props) => {
  return (
    <div>
      {choices.map((choice) => (
        <Button className={"my-5"} key={choice.id}>
          {choice.content}
        </Button>
      ))}
    </div>
  )
}

export default MultipleChoiceGroup
