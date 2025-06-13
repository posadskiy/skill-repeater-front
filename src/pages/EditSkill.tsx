import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Paper, Title, TextInput, Textarea, Select, Button, Stack, Text } from '@mantine/core';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { skillsApi } from '../api/skills';

export function EditSkill() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const { data: skill, isLoading } = useQuery({
    queryKey: ['skill', id],
    queryFn: () => skillsApi.getById(Number(id))
  });

  const updateMutation = useMutation({
    mutationFn: () => skillsApi.update(Number(id), {
      name,
      description,
      category,
      level: skill?.level || 1,
      lastRepeated: skill?.lastRepeated || new Date().toISOString(),
      nextRepeated: skill?.nextRepeated || new Date().toISOString()
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['skills'] });
      queryClient.invalidateQueries({ queryKey: ['skill', id] });
      navigate(`/skills/${id}`);
    }
  });

  useEffect(() => {
    if (skill) {
      setName(skill.name);
      setDescription(skill.description);
      setCategory(skill.category);
    }
  }, [skill]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate();
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!skill) {
    return <Text>Skill not found</Text>;
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

            <Select
              required
              label="Category"
              placeholder="Select category"
              data={[
                { value: 'programming', label: 'Programming' },
                { value: 'language', label: 'Language' },
                { value: 'music', label: 'Music' },
                { value: 'sport', label: 'Sport' },
                { value: 'other', label: 'Other' }
              ]}
              value={category}
              onChange={(value) => setCategory(value || '')}
            />

            <Button type="submit" loading={updateMutation.isPending} fullWidth mt="xl">
              Update Skill
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
} 
