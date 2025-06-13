import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Text, Button, Group, Stack, Title, Paper } from '@mantine/core';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { skillsApi } from '../api/skills';

function getDaysAgo(date: Date): string {
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'yesterday';
  return `${diffDays} days ago`;
}

export function SkillDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: skill, isLoading: isLoadingSkill } = useQuery({
    queryKey: ['skill', id],
    queryFn: () => skillsApi.getById(Number(id))
  });

  const { data: history, isLoading: isLoadingHistory } = useQuery({
    queryKey: ['skill-history', id],
    queryFn: () => skillsApi.getHistory(Number(id))
  });

  const repeatMutation = useMutation({
    mutationFn: () => skillsApi.repeat(Number(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skill', id] });
      queryClient.invalidateQueries({ queryKey: ['skill-history', id] });
    }
  });

  if (isLoadingSkill || isLoadingHistory) {
    return <Text>Loading...</Text>;
  }

  if (!skill) {
    return <Text>Skill not found</Text>;
  }

  return (
    <Container>
      <Stack gap="md">
        <Group justify="space-between">
          <Title order={2}>{skill.name}</Title>
          <Group>
            <Button variant="light" onClick={() => navigate(`/skills/${id}/edit`)}>
              Edit
            </Button>
            <Button onClick={() => repeatMutation.mutate()}>
              Mark as Repeated
            </Button>
          </Group>
        </Group>

        <Card shadow="sm" padding="lg">
          <Stack gap="xs">
            <Text size="lg" fw={500}>Details</Text>
            <Text size="sm" c="dimmed">Level: {skill.level}</Text>
            <Text size="sm" c="dimmed">{skill.description}</Text>
            <Text size="sm" c="dimmed">
              Next repeat: {new Date(skill.nextRepeated).toLocaleDateString()}
            </Text>
          </Stack>
        </Card>

        <Card shadow="sm" padding="lg">
          <Stack gap="xs">
            <Text size="lg" fw={500}>Repeat History</Text>
            {history?.map((record) => (
              <Group key={record.id} justify="space-between" wrap="nowrap">
                <Text size="sm" c="dimmed">
                  {new Date(record.repeatedAt).toLocaleDateString()}
                </Text>
                <Text size="sm" c="dimmed">
                  {getDaysAgo(new Date(record.repeatedAt))}
                </Text>
                <Text size="sm" c="dimmed">
                  {new Date(record.repeatedAt).toLocaleTimeString()}
                </Text>
              </Group>
            ))}
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
} 
