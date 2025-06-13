import { Container, Card, Text, Button, Group, Stack, Title, SimpleGrid } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { skillsApi } from '../api/skills';

export function Skills() {
  const navigate = useNavigate();
  const userId = Number(localStorage.getItem('userId'));

  const { data: skills, isLoading } = useQuery({
    queryKey: ['skills', userId],
    queryFn: () => skillsApi.getAll(userId),
    enabled: !!userId
  });

  if (isLoading) {
    return (
      <Container size="xs" px="xs">
        <Text>Loading...</Text>
      </Container>
    );
  }

  if (!userId) {
    return (
      <Container size="xs" px="xs">
        <Text c="red">Please log in with your User ID and token</Text>
      </Container>
    );
  }

  return (
    <Container size="xs" px="xs">
      <Stack gap="md">
        <Group justify="space-between" align="center">
          <Title order={2}>Skills</Title>
          <Button onClick={() => navigate('/skills/create')}>Create Skill</Button>
        </Group>

        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          {skills?.map((skill) => (
            <Card key={skill.id} withBorder>
              <Stack gap="xs">
                <Title order={3}>{skill.name}</Title>
                <Text size="sm" c="dimmed">Level: {skill.level}</Text>
                <Text size="sm" c="dimmed" lineClamp={2}>{skill.description}</Text>
                <Text size="sm" c="dimmed">
                  Next: {new Date(skill.nextRepeated).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} at {new Date(skill.nextRepeated).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                </Text>
                <Group>
                  <Button variant="light" onClick={() => navigate(`/skills/${skill.id}`)}>
                    Details
                  </Button>
                  <Button variant="light" color="blue" onClick={() => navigate(`/skills/${skill.id}/edit`)}>
                    Edit
                  </Button>
                </Group>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  );
} 
