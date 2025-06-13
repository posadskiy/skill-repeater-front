import { AppShell, Burger, Group, Text, UnstyledButton, Stack, rem, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link, Outlet, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { IconLogout } from '@tabler/icons-react';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Skills } from './pages/Skills';
import { SkillDetails } from './pages/SkillDetails';
import { CreateSkill } from './pages/CreateSkill';
import { EditSkill } from './pages/EditSkill';
import { Routes, Route } from 'react-router-dom';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  if (!token || !userId) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}

function AppLayout() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <AppShell
      header={{ height: { base: 60, sm: 70 } }}
      navbar={{
        width: { base: '100%', sm: 300 },
        breakpoint: 'sm',
        collapsed: { mobile: !opened }
      }}
      padding={{ base: 'xs', sm: 'md' }}
    >
      <AppShell.Header>
        <Group h="100%" px={{ base: 'xs', sm: 'md' }} justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Text size="lg" fw={700}>Skill Repeater</Text>
          </Group>
          <Button variant="light" onClick={handleLogout}>Logout</Button>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p={{ base: 'xs', sm: 'md' }}>
        <Stack gap="xs">
          <UnstyledButton
            onClick={() => {
              navigate('/skills');
              close();
            }}
            style={{
              padding: rem(8),
              borderRadius: rem(6),
              fontWeight: 500,
              textAlign: 'left',
            }}
          >
            Skills
          </UnstyledButton>
          <UnstyledButton
            onClick={() => {
              navigate('/skills/create');
              close();
            }}
            style={{
              padding: rem(8),
              borderRadius: rem(6),
              fontWeight: 500,
              textAlign: 'left',
            }}
          >
            Create Skill
          </UnstyledButton>
        </Stack>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/skills" replace />} />
        <Route path="skills" element={<Skills />} />
        <Route path="skills/create" element={<CreateSkill />} />
        <Route path="skills/:id" element={<SkillDetails />} />
        <Route path="skills/:id/edit" element={<EditSkill />} />
      </Route>
    </Routes>
  );
}
