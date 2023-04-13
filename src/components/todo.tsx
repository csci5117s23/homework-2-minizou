import { Checkbox, Flex, Text, createStyles, rem } from '@mantine/core';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';

const useStyles = createStyles((theme) => ({
  todo: {
    margin: '1em 0',
  },
  link: {
    textDecoration: 'none',
  },
  todoText: {
    maxWidth: '800px',
    color: 'white',
    transition: 'color 0.5s ease',
    '&:hover': {
      color: 'orange',
    }
  },
}));

export default function TodoItem(todo: { id: number; userId: string; content: string; done: boolean; }) {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [isDone, setIsDone] = useState(todo.done);
  const { classes } = useStyles(  );

  useEffect(() => {
    // mark a specific todo item as done
    async function updateTodo() {
      const token = await getToken({ template: "codehooks" });
      const res = await fetch(process.env.NEXT_PUBLIC_API + "/todo/" + todo.id, {
        method: "PATCH",
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({done: isDone})
      });
    }
    updateTodo();
    // console.log(todo.content + " - " + isDone);
  }, [isDone])
  return (
    <Checkbox checked={isDone} size="xl" className={classes.todo}
      onChange={e => { setIsDone(!todo.done) }}
      label={
        <Link className={classes.link} href={"/todo/" + todo.id}>
          <Text truncate className={classes.todoText}>
            {todo.content}
          </Text>
        </Link>
      }
    />
  );
}