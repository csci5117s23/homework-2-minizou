import { TextInput, TextInputProps, ActionIcon, useMantineTheme, Button, Flex, Container, createStyles } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  input: {
    width: '100%',
    marginRight: '1em',
  }
}));

export default function Input(props: TextInputProps) {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();

  return (
      <Flex>
        <TextInput className={classes.input}
          placeholder="Finish CSCI 5451 Assignment 3"
          {...props} /><Button leftIcon={<IconPlus />}>
          Add
        </Button>
      </Flex>
  );
}