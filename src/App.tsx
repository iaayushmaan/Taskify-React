import React, { useState } from "react";
import "./App.css";
import InputField from "./components/inputfield";
import { Todo } from "./model";
import TaskList from "./components/taskList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [todo, settodo] = useState<string>("");
  const [Todo, setTodo] = useState<Todo[]>([]);
  const [completedTodo, setcompletedTodo] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    if (todo) {
      setTodo([...Todo, { id: Date.now(), todo, isDone: false }]);
    }
    settodo("");
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    let add,
      active = Todo,
      completed = completedTodo;
    if (source.droppableId === "TodoList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = completed[source.index];
      completed.splice(source.index, 1);
    }

    if (destination.droppableId === "TodoList") {
      active.splice(destination.index, 0, add);
    } else {
      completed.splice(destination.index, 0, add);
    }
    setcompletedTodo(completed);
    setTodo(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">TASKIFY</span>
        <InputField todo={todo} settodo={settodo} handleAdd={handleAdd} />
        <TaskList
          settodo={setTodo}
          Todo={Todo}
          completedTodo={completedTodo}
          setcompletedTodo={setcompletedTodo}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
