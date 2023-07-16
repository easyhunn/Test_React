
const addToDo = (todoList) => {
    return {
        type: "ADD_TODO",
        payload: todoList
    }
}

const getData = async () => {
    return new Promise ((res, rej) => {
        const listTodo = ["study", "cook", "eat", "sleep"];
        setTimeout(() => {
            res(listTodo);
        }, 1000)
    })
}

export const addToDoData = () => {
    return (dispatch) => {
        
        getData().then((res) => {
            dispatch(addToDo(res));
        })
    }
}