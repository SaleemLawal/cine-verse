import FormInput from "../formInput/FormInput";
import styles from "./form.module.scss";

const Form = ({
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

  return (
    <form className={styles.form}>
      <FormInput
        placeholder={placeholder}
        handleChange={handleChange}
        inputValue={inputValue}
        handleMovieSearch={handleMovieSearch}
      />
    </form>
  );
};

export default Form;
