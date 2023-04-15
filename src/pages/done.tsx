import { useAuth } from '@clerk/nextjs';
import HeaderCustom from '../components/header';
import { Container, Title, createStyles, Text } from '@mantine/core';
import Signin from './signin';
import { useState } from 'react';
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
  },
  title: {
    marginBottom: '0.25em',
  }
}));

export interface TodoInterface {
  userId: string | null | undefined;
  content: string;
  done: boolean;
}

export default function Done(isDonePage = false) {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [todos, setTodos] = useState<TodoInterface[]>([]);
  const { classes } = useStyles();

  if (!isLoaded || !userId) {
    return <Signin/>;
  }

  console.log(todos.length);

  // FIXME: refactor into list or smth since this is redundant
  return (<>
    <Container className={classes.header}>
      <Container className={classes.heading}>
        <Title 
          display="flex"
          align="center"
          variant="gradient"
          gradient={{ from: 'cyan', to: 'yellow', deg: 45 }}
          className={classes.title}>
          Wow, look at all those DONE tasks
        </Title>
        <Text>🐇🐇🐇 im so proud of you</Text>
      </Container>
      <List
        updatedTodos={todos}
        isDone={true}
      />
    </Container>
  </>)
}