import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@clerk/nextjs";
import { IconEdit } from '@tabler/icons-react';
import { Button, Checkbox, Container, Flex, Text, Textarea, createStyles } from "@mantine/core";
const useStyles = createStyles((theme) => ({
  todo: {
    marginBottom: "1em",
  },
  stats: {
    display: "flex",
  },
  card: {
    padding: "1em",
    fontSize: "1em",
  },
  heading: {
    fontWeight: "bold",
    fontSize: "2em",
    marginLeft: "0.5em",
  },
  button: {
    justifySelf: "end",
    margin: "0.5em 0 2em 0",
  }
}));

// most jank page
// in due need of refactoring; there's a lot fo redundancy here w/
// the async funcs lmao
export default function Todo() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [newContent, setNewContent] = useState('');
  const [errorMsg, setErrorMsg] = useState("");
  const [editable, setEditable] = useState(false);
  const [isDone, setIsDone] = useState<any>();
  const [todo, setTodo] = useState<any>();
  const router = useRouter();
  const _id = router.query.id;
  const { classes } = useStyles();

  function handleClick() {
    // save value
    if (editable) {
      if (newContent == '') {
        setErrorMsg("TODO item must have a message.")
        return;
      } else if (errorMsg != '') {
        setErrorMsg("");
      }
      console.log(_id);
      saveNewContent();
    }
    setEditable(!editable);
  }

  useEffect(() => {
    if (!_id) {
      return;
    }
    const fetchData = async () => {
      const token = await getToken({ template: "codehooks" });
      const res = await fetch(process.env.NEXT_PUBLIC_API + "/todo/" + _id, {
        method: "GET",
        headers: {
          'Authorization': 'Bearer ' + token,
        }
      });
      const todo = await res.json();
      setTodo(todo);
      if (newContent == '') {
        setNewContent(todo.content);
        setIsDone(todo.done);
      }
    }
    fetchData();
  }, [todo]);

  useEffect(() => {
    if (!_id) {
      return;
    }
    // handle edited done values
    // FIXME: merge w/ top func and pass in params
    const fetchData = async () => {
      if (!_id) {
        return;
      }
      const token = await getToken({ template: "codehooks" });
      const res = await fetch(process.env.NEXT_PUBLIC_API + "/todo/" + _id, {
        method: "PATCH",
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ done: isDone })
      });
    }
    fetchData();
  }, [isDone]);

  // handle edited content
  const saveNewContent = () => {
    const fetchData = async () => {
      if (!_id) {
        return;
      }
      const token = await getToken({ template: "codehooks" });
      const response = await fetch(process.env.NEXT_PUBLIC_API + "/todo/" + _id, {
        method: "PATCH",
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: newContent })
      });
    }
    fetchData();
  }

  return (
    // FIXME
    <Container>
      <Textarea
        value={newContent} onChange={(event) => setNewContent(event.currentTarget.value)}
        placeholder={todo != null ? todo.content : "loading..."}
        className={classes.todo}
        radius="xs"
        size="xl"
        disabled={!editable}
        autosize
        minRows={4}
        error={errorMsg}
      />
      <Flex justify="flex-end">
        <Button onClick={handleClick} className={classes.button} leftIcon={<IconEdit />} size="md">{editable ? "Save" : "Edit"}</Button>
      </Flex>
      <hr />
      <Container className={classes.stats}>
        <Container className={classes.card}>
        <Text>Status:</Text>
        <Flex justify="center" align="center">
          <Checkbox checked={isDone} onChange={() => {setIsDone(!isDone)}} size="xl"/>
          <Text variant="gradient" gradient={{ from: 'red', to: 'yellow' }} className={classes.heading}>
            {todo != null ? (todo.done ? "Done" : "Not Done") : "loading..."}
          </Text>
        </Flex>
        </Container>
        <Container className={classes.card}>
          <Text>Date created:</Text>
          <Text variant="gradient" gradient={{ from: 'red', to: 'yellow' }} className={classes.heading}>
            {todo != null ? new Date(todo.date).toLocaleString() : "loading..."}
          </Text>
        </Container>
      </Container>
    </Container>
  );
}