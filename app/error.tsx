"use client";
import { FC, useEffect } from "react";
import EmptyState from "./components/EmptyState";

interface errorProps {
  error?: Error;
}

const Error: FC<errorProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return <EmptyState title="Uh no" subtitle="Something went wrong" />;
};

export default Error;
