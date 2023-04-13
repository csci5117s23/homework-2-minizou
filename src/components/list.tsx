import { useState, useEffect } from "react"
import { TodoInterface } from '@/pages/todos';
import { useAuth } from '@clerk/nextjs';
import TodoItem from "./todo";

export default function List(props : {isDone : boolean, updatedTodos : any}) {
  const [todos, setTodos] = useState<TodoInterface[]>([]);
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  let doneFilter = (props.isDone) ? "&done=true" : "&done=false";

  useEffect(() => {
    const fetchData = async () => {
      // read all todo items
      // doneFilter filters for reading {done, undone} todo items
      const token = await getToken({ template: "codehooks" });
      const response = await fetch(process.env.NEXT_PUBLIC_API
        + "/todo/?userId=" + userId + doneFilter, {
        method: "GET",  
        headers: {
          'Authorization': 'Bearer ' + token,
        }
      });
      let data = await response.json();

      // sort data by most recent
      data = data.sort((a: any, b: any) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      });
      setTodos(data);
    }
    fetchData();
  }, [todos]); // [props.updatedTodos]
  
  return (
    <div>
      {todos != null ?
        todos.map((todo : any) => {
          return (
            <TodoItem
              key={todo._id}
              id={todo._id}
              userId={todo.userId}
              content={todo.content}
              done={todo.done}
            />
          )
        }
      ) : <div>no todos!</div>}
    </div>
  );
}