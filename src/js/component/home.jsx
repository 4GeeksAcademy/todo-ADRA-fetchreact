import React, { useState } from "react";

//create your first component
const Home = () => {
    const [inputValue, setInputValue] = useState("");
    const [todoList, setTodoList] = useState([]);

    const addTask = () => {
        if (inputValue.trim() !== "") {
            setTodoList([...todoList, inputValue]);
            setInputValue("");
        }
    };

    const deleteTask = (index) => {
        const newList = todoList.filter((_, i) => i !== index);
        setTodoList(newList);
    };

    return (
        <div className="container mt-5 input-group mb-3 w-50">
            <div className="FormList d-flex flex-column justify-content-center align-items-center mb-5">
                <form
                    id="todoListForm"
                    className="form-control d-flex justify-content-between"
                    onSubmit={(e) => {
                        e.preventDefault();
                        addTask();
                    }}
                >
                    <input
                        type="text"
                        onChange={(e) => setInputValue(e.target.value)}
                        value={inputValue}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                addTask();
                            }
                        }}
                        placeholder="Add a new task"
                        className="form-control me-1"
                        aria-label="Add a new task"
                        aria-describedby="button-addon2"
                    />
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        id="button-addon2"
                        onClick={addTask}
                    >
                        Add
                    </button>
                </form>
                <ul
                    id="todoList"
                    className="list-group mt-1"
                    style={{ width: "778px" }}
                >
                    {todoList.map((item, index) => (
                        <li
                            key={index}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            {item}
                            <i
                                className="fa fa-solid fa-trash"
                                onClick={() => deleteTask(index)}
                                style={{ cursor: "pointer" }}
                            ></i>
                        </li>
                    ))}
                </ul>
            </div>
            <div id="howManyTasks" className="text-end">
                {todoList.length} {todoList.length === 1 ? "task" : "tasks"}
            </div>
        </div>
    );
};

export default Home;
