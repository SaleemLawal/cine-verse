"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import styles from "./form.module.scss";

const Form = ({
  placeholder,
  handleChange,
  inputValue: propInputValue,
  handleMovieSearch,
}: {
  placeholder: string;
  handleChange: (value: string) => void;
  inputValue: string;
  handleMovieSearch: () => void;
}) => {
  // local state for input value to avoid main page rerendering
  const [localInputValue, setLocalInputValue] = useState(propInputValue);

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
    <form className={styles.form}>
      <div>
        <Input
          type="email"
          value={localInputValue}
          placeholder={placeholder}
          className={`${styles.form__input} border-none rounded-full shadow-md 
            outline-none focus:outline-none focus:shadow-sm transition-all duration-300 ring-0 focus-visible:ring-0`}
          onChange={handleLocalChange}
        />
        <button
          type="submit"
          className={styles.form__submit}
          onClick={handleSubmit}
        >
          <Search color="#ff0000" size={20} />
        </button>
      </div>
    </form>
  );
};

export default Form;
