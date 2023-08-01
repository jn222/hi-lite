"use client";

import { Container, TextField } from "@mui/material";
import { useState } from "react";
import MaterialWrapper from "../components/material-wrapper";
import MultipleChoiceGroup from "../components/multiple-choice-group";

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet porttitor eget dolor morbi non arcu.";

const Page = () => {
  const [highlight, setHighlight] = useState<string>("");
  return (
    <MaterialWrapper>
      <main>
        <Container>
          <TextField
            fullWidth
            id="standard-textarea"
            label="What went well?"
            multiline
            variant="standard"
            value={highlight}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setHighlight(event.target.value);
            }}
          />
        </Container>
        <Container>
          <MultipleChoiceGroup choices={[lorem, lorem, lorem]} />
        </Container>
      </main>
    </MaterialWrapper>
  );
};

export default Page;
