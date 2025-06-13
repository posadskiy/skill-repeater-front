import { useState } from 'react';
import { Container, Paper, Title, TextInput, Textarea, Select, Button, Stack, Text, NumberInput, Group } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { skillsApi } from '../api/skills';
import type { Period } from '../types/api';

export function EditSkill() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userId = Number(localStorage.getItem('userId'));

  const { data: skill, isLoading } = useQuery({
    queryKey: ['skill', id],
    queryFn: () => skillsApi.getById(Number(id)),
    enabled: !!id
  });

  const [name, setName] = useState(skill?.name || '');
  const [description, setDescription] = useState(skill?.description || '');
  const [period, setPeriod] = useState<Period>(skill?.period || 'DAYS');
  const [number, setNumber] = useState<number | ''>(skill?.number || 1);

  const updateMutation = useMutation({
    mutationFn: () => skillsApi.update(Number(id), {
      name,
      description,
      level: skill?.level || 1,
      lastRepeated: skill?.lastRepeated || new Date().toISOString(),
      nextRepeated: skill?.nextRepeated || new Date().toISOString(),
      userId,
      period,
      number: number === '' ? 1 : number
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      navigate(`/skills/${id}`);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate();
  };

  if (isLoading) {
    return (
      <Container>
        <Text>Loading...</Text>
      </Container>
    );
  }

  if (!userId) {
    return (
      <Container>
        <Text c="red">Please log in with your User ID and token</Text>
      </Container>
    );
  }

  return (
    <Container size="sm">
      <Paper radius="md" p="xl" withBorder>
        <Title ta="center" mb="md">Edit Skill</Title>

        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              required
              label="Name"
              placeholder="Skill name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Textarea
              required
              label="Description"
              placeholder="Describe your skill"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Group grow>
              <NumberInput
                required
                label="Repeat Every"
                placeholder="Enter number"
                min={1}
                value={number}
                onChange={(value) => setNumber(typeof value === 'string' ? '' : value)}
                style={{ flex: 1 }}
              />

              <Select
                required
                label="Period"
                placeholder="Select period"
                data={[
                  { value: 'HOURS', label: 'Hours' },
                  { value: 'DAYS', label: 'Days' },
                  { value: 'WEEKS', label: 'Weeks' },
                  { value: 'MONTHS', label: 'Months' },
                  { value: 'YEARS', label: 'Years' }
                ]}
                value={period}
                onChange={(value) => setPeriod(value as Period)}
                style={{ flex: 1 }}
              />
            </Group>

            <Button type="submit" loading={updateMutation.isPending} fullWidth mt="xl">
              Update Skill
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
} 
