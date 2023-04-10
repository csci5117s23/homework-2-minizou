import { Checkbox, Flex, Text } from '@mantine/core';
import Link from 'next/link';

export default function Todo() {
  return (
      <Checkbox
        label={
          <Link href="#">
            <Text truncate lineClamp={1}>
              this is a test todo
            </Text>
          </Link>
        }
      />
  );
}