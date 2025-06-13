import { useState, useEffect } from 'react';
import { Container, Paper, Title, TextInput, Textarea, Select, Button, Stack, Text, NumberInput, Group, Flex, Modal } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { skillsApi } from '../api/skills';
import type { Period } from '../types/api';

export function EditSkill() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const userId = Number(localStorage.getItem('userId'));
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);

  const { data: skill, isLoading } = useQuery({
    queryKey: ['skill', id],
    queryFn: () => skillsApi.getById(Number(id)),
    enabled: !!id
  });

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [period, setPeriod] = useState<Period>('DAYS');
  const [number, setNumber] = useState<number | ''>(1);

  useEffect(() => {
    if (skill) {
      setName(skill.name);
      setDescription(skill.description);
      setPeriod(skill.period);
      setNumber(skill.number);
    }
  }, [skill]);

  const updateMutation = useMutation({
    mutationFn: () => skillsApi.update({
      id: Number(id),
      name,
      description,
      level: skill?.level || 1,
      userId,
      period,
      number: number === '' ? 1 : number
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      navigate(`/skills/${id}`);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: () => skillsApi.delete(Number(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      navigate('/skills');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate();
  };

  const handleDelete = () => {
    setDeleteModalOpened(true);
  };

  const confirmDelete = () => {
    deleteMutation.mutate();
    setDeleteModalOpened(false);
  };

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
      <Paper radius="md" p="md" withBorder>
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

            <Flex gap="md" mt="md">
              <Button type="submit" loading={updateMutation.isPending} style={{ flex: 1 }}>
                Update Skill
              </Button>
              <Button 
                color="red" 
                loading={deleteMutation.isPending}
                onClick={handleDelete}
                style={{ flex: 1 }}
              >
                Delete Skill
              </Button>
            </Flex>
          </Stack>
        </form>
      </Paper>

      <Modal
        opened={deleteModalOpened}
        onClose={() => setDeleteModalOpened(false)}
        title="Delete Skill"
        centered
      >
        <Stack>
          <Text>Are you sure you want to delete this skill? This action cannot be undone.</Text>
          <Flex gap="md" mt="md">
            <Button 
              variant="outline" 
              onClick={() => setDeleteModalOpened(false)} 
              style={{ flex: 1 }}
            >
              Cancel
            </Button>
            <Button 
              color="red" 
              onClick={confirmDelete}
              loading={deleteMutation.isPending}
              style={{ flex: 1 }}
            >
              Delete
            </Button>
          </Flex>
        </Stack>
      </Modal>
    </Container>
  );
} 
