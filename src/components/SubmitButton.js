"use client";

import Button from "./Button";

export default function SubmitButton({ isPending, pendingLabel, children }) {
  return (
    <Button isPending={isPending} pendingLabel={pendingLabel}>
      {children}
    </Button>
  );
}
