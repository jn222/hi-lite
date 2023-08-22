"use client";

import { Button, Stack } from "@mui/material";

type Highlight = {
  id: string;
  created_at: string;
  content: string;
};

interface Props {
  choices: Highlight[];
}

const MultipleChoiceGroup = ({ choices }: Props) => {
  return (
    <Stack spacing={2}>
      {choices.map((choice) => (
        <Button key={choice.id}>{choice.content}</Button>
      ))}
    </Stack>
  );
};

export default MultipleChoiceGroup;
