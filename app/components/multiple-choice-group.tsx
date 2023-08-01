"use client";

import { Button, Stack } from "@mui/material";

interface Props {
  choices: string[];
}

const MultipleChoiceGroup = ({ choices }: Props) => {
  return (
    <Stack spacing={2}>
      {choices.map((choice) => (
        <Button key={choice}>{choice}</Button>
      ))}
    </Stack>
  );
};

export default MultipleChoiceGroup;
