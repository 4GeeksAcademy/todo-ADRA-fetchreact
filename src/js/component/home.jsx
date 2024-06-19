import React, { useState } from "react";

//create your first component
const Home = () => {
    const [inputValue, setInputValue] = useState("");
    const [todoList, setTodoList] = useState([]);

    const addTask = () => {
        if (inputValue.trim() !== "") {
            setTodoList((preState) => [...preState, inputValue]);
            setInputValue("");
        }
    };

    const deleteTask = (index) => {
        const newList = todoList.filter((_, i) => i !== index);
        setTodoList(newList);
    };

    return (
        <div className="container input-group mb-3 w-50">
            <h1 className="d-flex justify-content-center align-items-center mt-5 mb-2">
                TODO LIST
            </h1>
            <div className="FormList d-flex flex-column justify-content-center align-items-center mb-1">
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
                        <i className="fa-solid fa-plus"></i>
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
                                className="fa-solid fa-trash btn btn-outline-secondary"
                                onClick={() => deleteTask(index)}
                                style={{ cursor: "pointer" }}
                            ></i>
                        </li>
                    ))}
                </ul>
                <strong>
                    <div
                        id="howManyTasks"
                        className="d-flex justify-content-start align-items-start"
                        style={{ width: "778px" }}
                    >
                        {todoList.length}{" "}
                        {todoList.length === 1 ? "task" : "tasks"}
                    </div>
                </strong>
            </div>
        </div>
    );
};

export default Home;
