import { FC, FormEvent, useState } from "react";
import { AtomInput } from "../atoms/Input";
import { AtomButton } from "../atoms/Button";

export interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

export const SearchBar: FC<SearchBarProps> = ({
  onSearch,
  initialValue = "",
}) => {
  const [term, setTerm] = useState(initialValue);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(term.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <AtomInput
        placeholder="Search users…"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="flex-1"
      />
      <AtomButton type="submit">Search</AtomButton>
    </form>
  );
};
