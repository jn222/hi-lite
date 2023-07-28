import { TextField } from "@mui/material";

export default function Page() {
  return (
    <main className="flex items-center p-24">
      <div className="w-full items-center">
        <TextField
          id="standard-textarea"
          label="What went well?"
        //   placeholder="Placeholder"
          multiline
          variant="standard"
        />
      </div>
    </main>
  );
}
