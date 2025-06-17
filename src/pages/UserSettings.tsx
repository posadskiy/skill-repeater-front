import { Container, Paper, Title } from '@mantine/core';
import { UserService } from 'user-service-react';

export function UserSettings() {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const handleError = (error: Error) => {
    console.error('Error in user settings:', error);
  };

  const handleSuccess = (message: string) => {
    console.log('Success in user settings:', message);
  };

  if (!token || !userId) {
    return null;
  }
  
  return (
    <Container size="md" h="100vh" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper radius="md" p="xl" withBorder style={{ width: '100%' }}>
        <Title ta="center" mb="xl">User Settings</Title>
        <UserService
          apiUrl="http://user-service.local"
          userId={userId}
          bearerToken={token}
          onError={handleError}
          onSuccess={handleSuccess}
        />
      </Paper>
    </Container>
  );
} 
