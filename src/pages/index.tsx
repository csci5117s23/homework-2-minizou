import { createStyles, Container, Text, Button, Group, Image, rem } from '@mantine/core';
import { GithubIcon } from '@mantine/ds';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    boxSizing: 'border-box',
  },

  inner: {
    position: 'relative',
    paddingTop: rem(120),
    paddingBottom: rem(120),

    [theme.fn.smallerThan('sm')]: {
      paddingBottom: rem(80),
      paddingTop: rem(80),
    },
  },

  title: {
    fontSize: rem(62),
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(42),
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: theme.spacing.xl,
    fontSize: rem(24),

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(18),
    },
  },

  controls: {
    marginTop: `calc(${theme.spacing.xl} * 2)`,

    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xl,
    },
  },

  control: {
    height: rem(54),
    paddingLeft: rem(38),
    paddingRight: rem(38),

    [theme.fn.smallerThan('sm')]: {
      height: rem(54),
      paddingLeft: rem(18),
      paddingRight: rem(18),
      flex: 1,
    },
  },

  bunny: {
    position: 'fixed',
    right: rem(80),
    bottom: rem(-100)
  }
}));

export default function Home() {
  const router = useRouter();
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  if (userId) {
    // FIXME: I have no idea what makes this different from Router.push('/todos/') 
    console.log(userId)
    router.push('/todos/');
  }

  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          yet another {' '}
          <Text component="span" variant="gradient" gradient={{ from: 'red', to: 'yellow' }} inherit>
            funky todo list app
          </Text>{' '}
          
        </h1>

        <Text className={classes.description} color="dimmed">
          Alternatively: spot how many rabbits I can fit into this app.
        </Text>

        <Group className={classes.controls}>
            <Button
              onClick={() => {router.push("/signin")}}
              size="xl"
              className={classes.control}
            >
              Login
            </Button>

          <Button
            component="a"
            href="https://github.com/csci5117s23/homework-2-minizou"
            size="xl"
            variant="default"
            className={classes.control}
            leftIcon={<GithubIcon size={20} />}
          >
            Repo
          </Button>
        </Group>
      </Container>
      <Image width={400} src="./bunny.png" alt="bunny" className={classes.bunny} />
    </div>
  );
}