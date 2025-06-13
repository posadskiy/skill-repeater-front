import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Skills } from './pages/Skills';
import { SkillDetails } from './pages/SkillDetails';
import { CreateSkill } from './pages/CreateSkill';
import { EditSkill } from './pages/EditSkill';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Notifications />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<AppShell />}>
              <Route index element={<Navigate to="/skills" replace />} />
              <Route path="skills" element={<Skills />} />
              <Route path="skills/:id" element={<SkillDetails />} />
              <Route path="skills/create" element={<CreateSkill />} />
              <Route path="skills/:id/edit" element={<EditSkill />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
