import { useState } from 'react';
import { Container, Paper, Title, TextInput, PasswordInput, Button, Text, Anchor, Stack, Divider, NumberInput } from '@mantine/core';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/auth';

export function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState<number | ''>('');

  const loginMutation = useMutation({
    mutationFn: () => authApi.login(username, password),
    onSuccess: () => {
      navigate('/');
    },
    onError: (error) => {
      console.error('Login failed:', error);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token && userId) {
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId.toString());
      navigate('/');
    }
  };

  return (
    <Container size="xs">
      <Paper radius="md" p="xl" withBorder>
        <Title ta="center" mb="md">Welcome back!</Title>
        <Text ta="center" c="dimmed" mb="xl">
          Don't have an account yet?{' '}
          <Anchor component={Link} to="/register" size="sm">
            Create account
          </Anchor>
        </Text>

        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              required
              label="Username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={loginMutation.isError ? 'Invalid credentials' : null}
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" loading={loginMutation.isPending} fullWidth mt="xl">
              Sign in
            </Button>
          </Stack>
        </form>

        <Divider my="xl" label="Or" labelPosition="center" />

        <form onSubmit={handleTokenSubmit}>
          <Stack>
            <NumberInput
              required
              label="User ID"
              placeholder="Enter your User ID"
              value={userId}
              onChange={(value) => setUserId(value === '' ? '' : Number(value))}
              min={1}
              description="Your unique user identifier"
            />

            <TextInput
              required
              label="Bearer Token"
              placeholder="Enter your Bearer token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              description="If you have a Bearer token, you can enter it here"
            />

            <Button type="submit" fullWidth>
              Use Token
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
} 