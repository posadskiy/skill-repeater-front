import { AppShell as MantineAppShell, Text, Button, Group, Box } from '@mantine/core';
import { Outlet, useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth';

export function AppShell() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authApi.logout();
  };

  return (
    <MantineAppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm' }}
      padding="md"
    >
      <MantineAppShell.Header p="xs">
        <Group justify="space-between">
          <Text size="xl" fw={700}>Skill Repeater</Text>
          <Button variant="light" onClick={handleLogout}>Logout</Button>
        </Group>
      </MantineAppShell.Header>

      <MantineAppShell.Navbar p="xs">
        <Button variant="subtle" fullWidth onClick={() => navigate('/skills')}>
          Skills
        </Button>
        <Button variant="subtle" fullWidth onClick={() => navigate('/skills/create')}>
          Add New Skill
        </Button>
      </MantineAppShell.Navbar>

      <MantineAppShell.Main>
        <Outlet />
      </MantineAppShell.Main>
    </MantineAppShell>
  );
} 