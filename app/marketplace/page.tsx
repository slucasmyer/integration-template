"use client"
import { useState, useEffect, useContext } from 'react'
import { Container, Stack, TextField } from '@mui/material'
import { Counter } from '@/components/Counter/Counter'
import Button from '@/components/Button'



export default function Marketplace(props: any) {
  const [value, setValue] = useState<string | null>(null)
  
  const onChange = async (e: any) =>  {
    const { name, value } = e.currentTarget || e.target
    setValue(value)
  }
  const testSignIn = async () => {
    try {
      console.log('auth')
    } catch (err) {
      console.log('err', err)
    }
  }

  return (
    <Container maxWidth={`lg`}>
      <Stack direction={'column'} spacing={3} className={'page-content'}>
        <h1 className={`self-center`}>Marketplace</h1>
        <TextField className={"self-center"} sx={{width:300}} id="outlined-basic" label="Outlined" variant="outlined" color={`secondary`} onChange={onChange} />
        <Counter />
      </Stack>
    </Container>
  )
}