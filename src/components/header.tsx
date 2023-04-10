import React, { useState } from 'react';
import { createStyles, Header, Container, Group, Burger, rem, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { UserButton, useAuth, useUser } from '@clerk/nextjs';
import {
  IconHome2,
  IconChecklist
} from '@tabler/icons-react';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

interface HeaderSimpleProps {
  links: { link: string; label: string, icon: React.FC<any> }[];
}

export default function HeaderCustom() {
  const links = [
    {
      "link": "/todos",
      "label": "TODOs",
      "icon": IconHome2,
    },
    {
      "link": "/done",
      "label": "Done",
      "icon": IconChecklist,
    },
  ];

  const { userId, sessionId, getToken } = useAuth();
  const { isLoaded, isSignedIn, user } = useUser();
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    <Link
      key={link.link}
      href={link.link}
      className={cx(classes.link, { [classes.linkActive]: active === link.link })}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      <Tooltip label={link.label} position="bottom" color="dark" transitionProps={{ duration: 0 }}>
        <link.icon size="1.2rem" stroke={1.5} />
      </Tooltip>
    </Link>
  ));

  if (!isLoaded || !isSignedIn) {
    return null;
  } else {
    return (
      <Header height={60} mb={40}>
        <Container className={classes.header}>
          <UserButton
            appearance={{
              variables: {
                colorPrimary: '#F4B32D',
                colorBackground: '#2B2C2F',
              }
            }}
            afterSignOutUrl="/" />
          welcome, {user.firstName?.toLowerCase()}!
          <Group spacing={5} className={classes.links}>
            {items}
          </Group>

          <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
        </Container>
      </Header>
    );
  }
}