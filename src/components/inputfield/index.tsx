import React, { useRef } from "react";
import "./style.css";

interface Props {
  todo: string;
  settodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent<EventTarget>) => void;
}

const InputField: React.FC<Props> = ({ todo, settodo, handleAdd }) => {
  const inputref = useRef<HTMLInputElement>(null);

  return (
    <form
      className="input"
      onSubmit={(e) => {
        handleAdd(e);
        inputref.current?.blur();
      }}
    >
      <input
        ref={inputref}
        type="text"
        value={todo}
        className="input_text"
        placeholder="Enter your task"
        onChange={(e) => settodo(e.target.value)}
      />
      <button className="input_submit" type="submit">
        Add
      </button>
    </form>
  );
};

export default InputField;
