"use client";
import { useState, useEffect } from 'react'
import { Container, Stack, Box } from '@mui/material'
import { useRouter } from 'next/navigation';
import Button from '../../components/Button';

export default function Account(props: any) {
  const [message, setMessage] = useState('');

  const router = useRouter();

  const createAccount = async () => {
    const response = await fetch('/api/create_account', {
      method: 'POST',
    });
    console.log('response', response)

    if (response.ok) {
      const {account, accountLink } = await response.json();
      const { id } = account;

      console.log('account', account, id)
      setMessage(`Account created: ${account.id}`);
      const { url } = accountLink;
      router.push(url);
    } else {
      setMessage('Error creating account. Please try again.');
    }
  };

  return (
    <Container maxWidth={`lg`}>
      <Stack direction={'column'} spacing={3} className={'page-content'}>
        <h1 className={'self-center'}>Account</h1>
        <Button className={`btn-blue w-fit self-center`} onClick={createAccount}>Create Account</Button>
        <p className={'self-center'}>{message}</p>
      </Stack>
    </Container>
  );
};