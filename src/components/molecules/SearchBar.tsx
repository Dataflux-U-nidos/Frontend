// src/components/molecules/SearchBar.tsx
import { FC, ChangeEvent, useState, useEffect } from "react";
import { AtomInput } from "../atoms/Input";

export interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

export const SearchBar: FC<SearchBarProps> = ({
  onSearch,
  initialValue = "",
}) => {
  const [term, setTerm] = useState(initialValue);

  // whenever `term` changes, wait `delay` ms then call onSearch
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(term.trim());
    });
    return () => clearTimeout(handler);
  }, [term]);

  return (
    <AtomInput
      placeholder="Search users…"
      value={term}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setTerm(e.target.value)}
      className="w-full"
    />
  );
};
