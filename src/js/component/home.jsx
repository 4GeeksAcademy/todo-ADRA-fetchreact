import React, { useEffect, useState } from "react";

//create your first component
const Home = () => {
    const [inputValue, setInputValue] = useState("");
    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        getTask();
    }, []);

    async function getTask() {
        try {
            const response = await fetch(
                "https://playground.4geeks.com/todo/users/kinnetik0"
            );
            if (!response.ok) {
                if (response.status === 404) {
                    await createUser();
                    await getTask(); // Retry getting tasks after creating user
                } else {
                    throw new Error(`Error: ${response.statusText}`);
                }
            } else {
                const data = await response.json();
                setTodoList(data.todos);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function createUser() {
        try {
            const response = await fetch(
                "https://playground.4geeks.com/todo/users/kinnetik0",
                {
                    method: "POST",
                    headers: {
                        accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify([]), // Enviar un array vacío para crear el usuario
                }
            );
            if (!response.ok) {
                throw new Error(`Error creating user: ${response.statusText}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function addTodo(e) {
        try {
            if (inputValue.trim() !== "") {
                const response = await fetch(
                    "https://playground.4geeks.com/todo/todos/kinnetik0",
                    {
                        method: "POST",
                        headers: {
                            accept: "application/jason",
                            "Content-type": "application/json",
                        },
                        body: JSON.stringify({
                            label: inputValue,
                            is_done: false,
                        }),
                    }
                );
                if (response.ok) {
                    setInputValue("");
                    getTask();
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteTask(id) {
        try {
            const response = await fetch(
                `https://playground.4geeks.com/todo/todos/${id}`,
                { method: "DELETE" }
            );
            if (response.ok) {
                getTask();
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteAll() {
        try {
            const promises = todoList.map((item) => {
                return fetch(
                    `https://playground.4geeks.com/todo/todos/${item.id}`,
                    {
                        method: "DELETE",
                    }
                ).then((resp) => {
                    if (!resp.ok || resp.status !== 204) {
                        throw new Error(
                            `Error deleting item with id ${item.id}: ${resp.statusText}`
                        );
                    }
                    return resp;
                });
            });

            const responses = await Promise.all(promises);
            responses.forEach((resp) => {
                console.log(`Deleted item with status: ${resp.status}`);
            });
            getTask();

            console.log("All items deleted successfully");
        } catch (error) {
            console.error("Error in deleteAll:", error);
        }
    }

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
                                addTodo();
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
                        onClick={addTodo}
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
                            {item.label}
                            <i
                                className="fa-solid fa-trash btn btn-outline-secondary"
                                onClick={() => deleteTask(item.id)}
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
            <div className="deleteAll d-flex justify-content-center aling-content-center">
                <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => deleteAll()}
                >
                    Borrar Todo
                </button>
            </div>
        </div>
    );
};

export default Home;
