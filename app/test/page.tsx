"use client";

import { useNote } from "../../utils/cache";

const TestPage = () => {
  const { data, isLoading, error } = useNote(
    "7ddf0977ed1fef528ef8a2d31a5364fa2d12bf49f3a31f8be1cebfeb673dea40"
  );
  if (error) return <div>{error.toString()}</div>;
  if (isLoading) return <div>Loading</div>;
  console.log(data);
  return <div>Done</div>;
};

export default TestPage;
