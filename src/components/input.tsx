import { TodoInterface } from '@/pages/todos';
import { useAuth } from '@clerk/nextjs';
import { TextInput, Button, Flex, createStyles } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
  input: {
    width: '100%',
    marginRight: '1em',
  }
}));

// FIXME: idk why typescript wanted me to define this
type InputProps = {
  addTodo: (todo: TodoInterface) => void;
}

export default function Input({ addTodo }: InputProps) {
  const [content, setContent] = useState("");
  const { userId, getToken } = useAuth();

  function submitTodo(event: any) {
    event.preventDefault();
    async function fetchData() {
      if (content == '') {
        console.log("Content is EMPTY: TODO not added.");
        return;
      }
      const newTodo = {
        "content": content,
        "userId": userId,
        "done": false,
        "date": new Date(),
      };
      setContent('');
      
      // create a new todo item
      const token = await getToken({ template: "codehooks" });
      const res = await fetch(process.env.NEXT_PUBLIC_API + "/todo/", {
        method: "POST",
        headers: {
          'Authorization': 'Bearer ' + token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTodo)
      });
      addTodo(newTodo);
    }
    fetchData();
  }

  const {classes} = useStyles();
  return (
    <Flex>
      <TextInput onChange={(event) => setContent(event.target.value)} className={classes.input}
        placeholder={content}
      />
      <Button onClick={submitTodo} leftIcon={<IconPlus />}>
        Add
      </Button>
    </Flex>
  );
}