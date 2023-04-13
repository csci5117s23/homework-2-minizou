import { useAuth } from '@clerk/nextjs';
import HeaderCustom from '../components/header';
import { Container, Title, createStyles, Text } from '@mantine/core';
import { useRouter } from 'next/router';
import Signin from './signin';
import { useState } from 'react';
import Input from '@/components/input';
import List from '@/components/list';

const useStyles = createStyles((theme) => ({
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  heading: {
    marginBottom: '2em',
    paddingLeft: '0',
    paddingRight: '0',
  }
}));

export interface TodoInterface {
  userId: string | null | undefined;
  content: string;
  done: boolean;
}

export default function Todos() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [todos, setTodos] = useState<TodoInterface[]>([]);
  const { classes } = useStyles();

  if (!isLoaded || !userId) {
    return <Signin/>;
  }

  function addTodo(todo: TodoInterface): void {
    setTodos([...todos, todo]);
  }

  return (<>
    <HeaderCustom />
    <Container className={classes.header}>
      <Container className={classes.heading}>
        <Title 
          display="flex"
          align="center"
          variant="gradient"
          gradient={{ from: 'red', to: 'yellow', deg: 45 }}>
          wow, you have {todos.length} task{todos.length == 1 ? "" : "s"} that {todos.length == 1 ? "is " : "are "}
          not done
        </Title>
        <Text>(this is supposed to be the not done page if you can't tell)</Text>
      </Container>
      <Input 
        addTodo={addTodo}
      />
      <List
        isDone={false}
        updatedTodos={todos}
      />
    </Container>
  </>)
}