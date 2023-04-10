import { createStyles, Container, Text, Button, Group, rem } from '@mantine/core';
import { GithubIcon } from '@mantine/ds';
import { useAuth, SignInButton} from '@clerk/nextjs';
import { useRouter } from 'next/router';
import Link from 'next/link';

const NUM_CATS = 0;

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
}));

export default function Home() {
  const router = useRouter();
  const { classes } = useStyles();
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  if (userId) {
    // FIXME: I have no idea what makes this different from Router.push('/todos/') 
    router.push('/todos/');
  }

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
          There are currently {NUM_CATS} meows hidden on the website.
        </Text>

        <Group className={classes.controls}>
          <Link href="/todos/">
            <Button
              size="xl"
              className={classes.control}
            >
              Login
            </Button>
          </Link>

          <Button
            component="a"
            href="https://github.com/mantinedev/mantine"
            size="xl"
            variant="default"
            className={classes.control}
            leftIcon={<GithubIcon size={20} />}
          >
            Repo
          </Button>
        </Group>
      </Container>
    </div>
  );
}