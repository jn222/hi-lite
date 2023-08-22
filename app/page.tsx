"use client";

import { Container, TextField, Button, Box } from "@mui/material";
import { useState, useEffect } from "react";
import MaterialWrapper from "./components/material-wrapper";
import MultipleChoiceGroup from "./components/multiple-choice-group";
import NavigationBar from "./components/navigation-bar";

const Page = () => {
  // TODO type this correctly
  const [highlights, setHighlights] = useState<any>([]);
  const [highlight, setHighlight] = useState<string>("");
  // TODO Use better state?
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string>("");
  async function fetchHighlights() {
    const response = await fetch("/api/highlights");
    const data = await response.json();
    setHighlights(data.data);
  }
  useEffect(() => {
    fetchHighlights();
  }, []);

  const handleSubmit = async () => {
    try {
      setError("");
      // TODO Abstract this
      const res = await fetch("http://localhost:3001/highlights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //   "API-Key": process.env.DATA_API_KEY,
        },
        body: JSON.stringify({ content: highlight }),
      });

      const data = await res.json();
      setHighlights([...highlights, ...data]);
    } catch (error: any) {
      // TODO display error msg
      console.error(error);
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <MaterialWrapper>
      <main>
        <Container>
          <Box>
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
          </Box>
          <Box
            display="flex"
            sx={{ m: 2 }}
            alignItems="center"
            justifyContent="center"
          >
            <Button variant="outlined" onClick={handleSubmit}>
              Done
            </Button>
          </Box>
        </Container>
        <Container>
          {highlights && <MultipleChoiceGroup choices={highlights} />}
        </Container>
      </main>
    </MaterialWrapper>
  );
};

export default Page;
