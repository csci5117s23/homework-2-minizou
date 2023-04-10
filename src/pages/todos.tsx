import { SignedIn, SignedOut, UserButton, useAuth } from '@clerk/nextjs';
import HeaderCustom from '../components/header';
import SignInPage from './signin';
import Input from '@/components/input';
import { Container, Title, createStyles, Text } from '@mantine/core';
import Todo from '@/components/todo';

// a text box and a submit button to create a new to-do item
// a list of to-do items that have not been marked “done”; sorted by most-recently created, and hyperlinked to /todo/:id. Each of these to-do items must have:
//     a summary of the to-do item’s contents (if the to-do item is too long to display, show a preview limited to one line)
//     a button or checkbox that allows you to mark a to-do item as “done”
// a link to visit /done

const useStyles = createStyles((theme) => ({
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  heading: {
    marginBottom: '1em',
    paddingLeft: '0',
    paddingRight: '0',
  }
}));

const NUM_TODOS = 1;

export default function Todos() {
  // const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { classes, cx } = useStyles();

  return (<>
    <SignedIn>
      <HeaderCustom />
      <Container className={classes.header}>
        <Container className={classes.heading}>
          <Title display="flex" align="center">wow, you still have
            <Title
              variant="gradient"
              gradient={{ from: 'red', to: 'yellow', deg: 45 }}>
              {' '}{NUM_TODOS} task{NUM_TODOS == 1 ? "" : "s"}{' '}
            </Title>
            to do</Title>
          <Text>better get on that before the procrastination monster gets you</Text>
        </Container>
        <Input />
        <Todo />
        <Todo />
      </Container>
    </SignedIn>
    <SignedOut>
      <SignInPage />
    </SignedOut>
  </>)
}