import { useState } from 'react';
import { Container, Paper, Title, TextInput, Textarea, Select, Button, Stack, Text, NumberInput, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { skillsApi } from '../api/skills';

type Period = 'HOURS' | 'DAYS' | 'WEEKS' | 'MONTHS' | 'YEARS';

export function CreateSkill() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userId = Number(localStorage.getItem('userId'));
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [period, setPeriod] = useState<Period>('DAYS');
  const [number, setNumber] = useState<number | ''>(1);

  const addMutation = useMutation({
    mutationFn: () => skillsApi.add({
      name,
      description,
      level: 1,
      userId,
      period,
      number: number === '' ? 1 : number
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      navigate('/skills');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMutation.mutate();
  };

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
        <Title ta="center" mb="md">Create New Skill</Title>

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

            <Button type="submit" loading={addMutation.isPending} fullWidth mt="xl">
              Create Skill
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
} 