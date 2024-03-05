"use client";
import { Container, Stack } from '@mui/material'

export default function About(props: any) {
  return (
    <Container maxWidth={`lg`}>
      <Stack direction={'column'} spacing={3} className={'page-content'}>
        <h1 className={`self-center`}>About</h1>
      </Stack>
    </Container>
  );
};