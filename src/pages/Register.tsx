import { useState } from 'react';
import { Container, Paper, Title, TextInput, PasswordInput, Button, Text, Anchor, Stack } from '@mantine/core';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { userApi } from '../api/user';

export function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerMutation = useMutation({
    mutationFn: () => userApi.signup({ username, email, password }),
    onSuccess: () => {
      // After successful registration, redirect to login
      navigate('/login');
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate();
  };

  return (
    <Container size="xs" h="100vh" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper radius="md" p="xl" withBorder style={{ width: '100%' }}>
        <Title ta="center" mb="md">Create an account</Title>
        <Text ta="center" c="dimmed" mb="xl">
          Already have an account?{' '}
          <Anchor component={Link} to="/login" size="sm">
            Sign in
          </Anchor>
        </Text>

        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              required
              label="Username"
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={registerMutation.isError ? 'Registration failed' : null}
            />

            <TextInput
              required
              label="Email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" loading={registerMutation.isPending} fullWidth mt="xl">
              Register
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
} 