"use client";

import Button from "./Button";

export default function AddContentButton({
  onClick,
  isPending,
  pendingLabel,
  children,
}) {
  return (
    <Button onClick={onClick} isPending={isPending} pendingLabel={pendingLabel}>
      {children}
    </Button>
  );
}
