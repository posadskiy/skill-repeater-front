import { Container, Title, SimpleGrid, Card, Text, Button, Group, Stack } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { skillsApi } from '../api/skills';

export function Skills() {
  const navigate = useNavigate();
  const userId = Number(localStorage.getItem('userId'));

  const { data: skills, isLoading } = useQuery({
    queryKey: ['skills', userId],
    queryFn: () => skillsApi.getAll(userId),
    enabled: !!userId
  });

  if (!userId) {
    return (
      <Container>
        <Text c="red">Please log in with your User ID and token</Text>
      </Container>
    );
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <Container>
      <Title order={2} mb="md">My Skills</Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
        {skills?.map((skill) => (
          <Card key={skill.id} shadow="sm" padding="lg">
            <Stack gap="xs">
              <Text size="lg" fw={500}>{skill.name}</Text>
              <Text size="sm" c="dimmed">Level: {skill.level}</Text>
              <Text size="sm" c="dimmed">{skill.description}</Text>
              <Text size="sm" c="dimmed">
                Next repeat: {new Date(skill.nextRepeated).toLocaleDateString()}
              </Text>
              <Group justify="flex-end" mt="md">
                <Button variant="light" onClick={() => navigate(`/skills/${skill.id}`)}>
                  Details
                </Button>
                <Button variant="light" onClick={() => navigate(`/skills/${skill.id}/edit`)}>
                  Edit
                </Button>
              </Group>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
} 
