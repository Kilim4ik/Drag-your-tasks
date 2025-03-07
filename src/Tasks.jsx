import React, { useState, useEffect, useCallback } from "react";
import "./Styles.css";

export const Tasks = ({ tasks, setLists, listId }) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const deleteTask = useCallback(
    (id) => {
      console.log("task will be deleted", id);
      setLists((prev) => {
        const updatedLists = [...prev];
        const currentList = updatedLists[listId];
        currentList.tasks = currentList.tasks.filter((task) => task.id !== id);

        return updatedLists;
      });

      setDraggedItem(null);
    },
    [listId, setLists]
  );

  const dragStart = (e, task) => {
    setDraggedItem(task);
    document.body.style.userSelect = "none";
  };

  const dragMove = useCallback(
    (e) => {
      if (!draggedItem) return;
      e.preventDefault();
      setPosition({ x: e.clientX, y: e.clientY });
    },
    [draggedItem]
  );

  const dragEnd = useCallback(
    (e, task) => {
      if (!draggedItem) return;
      const listItem = e.target.closest("[data-inlist]");
      if (!listItem || !listItem.dataset.inlist) {
        deleteTask(draggedItem.id);
        return;
      }

      const targetListId = +listItem.dataset.inlist;
      if (targetListId === listId) {
        const updatedTasks = [...tasks];
        const fromIndex = tasks.findIndex((t) => t.id === draggedItem.id);
        const toIndex = tasks.findIndex((t) => t.id === task.id);
        const [movedTask] = updatedTasks.splice(fromIndex, 1);
        updatedTasks.splice(toIndex, 0, movedTask);

        setLists((prev) => {
          const updatedLists = [...prev];
          updatedLists[listId].tasks = updatedTasks;
          return updatedLists;
        });
      } else {
        setLists((prev) => {
          const updatedLists = [...prev];
          const targetList = updatedLists[targetListId];
          targetList.tasks.push(draggedItem);
          deleteTask(draggedItem.id);
          return updatedLists;
        });
      }

      setDraggedItem(null);
      document.body.style.userSelect = "auto";
    },
    [draggedItem, tasks, listId, setLists, deleteTask]
  );

  useEffect(() => {
    if (draggedItem) {
      window.addEventListener("pointermove", dragMove);
      window.addEventListener("pointerup", dragEnd);
    }

    return () => {
      window.removeEventListener("pointermove", dragMove);
      window.removeEventListener("pointerup", dragEnd);
    };
  }, [draggedItem, dragMove, dragEnd]);

  return (
    <>
      {tasks.map((task) => (
        <li
          data-inlist={listId}
          className="task"
          key={task.id}
          onPointerDown={(e) => dragStart(e, task)}
          onPointerMove={dragMove}
          onPointerUp={(e) => dragEnd(e, task)}
          style={{
            cursor: draggedItem ? "grabbing" : "grab",
            opacity: draggedItem && draggedItem.id === task.id ? "0" : "1",
          }}
        >
          {task.text}
        </li>
      ))}
      {draggedItem && (
        <div
          className="dragging-task"
          style={{
            pointerEvents: "none",
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        >
          {draggedItem.text}
        </div>
      )}
    </>
  );
};
