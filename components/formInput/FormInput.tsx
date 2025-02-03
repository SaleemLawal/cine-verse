"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import styles from "./FormInput.module.scss";

const FormInput = ({
  placeholder,
  handleChange,
  inputValue,
  handleMovieSearch,
}: {
  placeholder: string;
  handleChange: (value: string) => void;
  inputValue: string;
  handleMovieSearch: () => void;
}) => {
  // local state for input value to avoid main page rerendering
  const [localInputValue, setLocalInputValue] = useState(inputValue);

  const handleLocalChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setLocalInputValue(event.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    handleChange(localInputValue);
    handleMovieSearch();
    setLocalInputValue("");
  };

  return (
    <div className={styles.form__input}>
      <Input
        type="email"
        value={localInputValue}
        placeholder={placeholder}
        className={`${styles.input} border-none rounded-full shadow-md 
      outline-none focus:outline-none focus:shadow-sm transition-all duration-300 ring-0 focus-visible:ring-0`}
        onChange={handleLocalChange}
      />
      <button type="submit" className={styles.submit} onClick={handleSubmit}>
        <Search color="#ff0000" size={20} />
      </button>
    </div>
  );
};

export default FormInput;
