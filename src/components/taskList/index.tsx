import React from "react";
import { Todo } from "../../model";
import TodoBox from "../todoBox";
import "./style.css";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  settodo: React.Dispatch<React.SetStateAction<Todo[]>>;
  Todo: Todo[];
  completedTodo: Todo[];
  setcompletedTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TaskList: React.FC<Props> = ({
  settodo,
  Todo,
  completedTodo,
  setcompletedTodo,
}) => {
  return (
    <div className="tasks">
      <Droppable droppableId="TodoList">
        {(provided, snapshot) => (
          <div
            className={`active ${snapshot.isDraggingOver ? "dragActive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="heading">Active Tasks</span>
            {Todo.map((todo, index) => (
              <TodoBox
                index={index}
                todo={todo}
                key={todo.id}
                Todo={Todo}
                settodo={settodo}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="TodoCompleted">
        {(provided, snapshot) => (
          <div
            className={`completed active ${
              snapshot.isDraggingOver ? "dragComplete" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="heading">Completed Tasks</span>
            {completedTodo.map((todo, index) => (
              <TodoBox
                index={index}
                todo={todo}
                key={todo.id}
                Todo={completedTodo}
                settodo={setcompletedTodo}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskList;
