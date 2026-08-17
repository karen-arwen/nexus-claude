import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Quest, QuestStatus, CraftingMaterials } from '@/types';
import { mockQuests } from '@/lib/mock';
import { useCharacterStore } from './characterStore';

type NewQuestInput = Omit<Quest, 'id' | 'status'> & { status?: QuestStatus };

interface QuestState {
  quests: Quest[];

  // CRUD
  add: (input: NewQuestInput) => Quest;
  update: (id: string, patch: Partial<Quest>) => void;
  remove: (id: string) => void;

  // Lifecycle
  complete: (id: string) => void;
  fail: (id: string) => void;
  snooze: (id: string, hours: number) => void;

  // Selectors
  getActive: () => Quest[];
  getCompletedToday: () => Quest[];
  getByDungeon: (dungeonId: string) => Quest[];
}

const newId = () =>
  `q_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;

const isToday = (iso?: string) => {
  if (!iso) return false;
  const d = new Date(iso);
  const t = new Date();
  return d.toDateString() === t.toDateString();
};

export const useQuestStore = create<QuestState>()(
  persist(
    (set, get) => ({
      quests: mockQuests,

      add: (input) => {
        const quest: Quest = {
          ...input,
          id: newId(),
          status: input.status ?? 'active',
        };
        set({ quests: [quest, ...get().quests] });
        return quest;
      },

      update: (id, patch) => {
        set({
          quests: get().quests.map((q) => (q.id === id ? { ...q, ...patch } : q)),
        });
      },

      remove: (id) => {
        set({ quests: get().quests.filter((q) => q.id !== id) });
      },

      complete: (id) => {
        const q = get().quests.find((x) => x.id === id);
        if (!q || q.status === 'completed') return;

        set({
          quests: get().quests.map((x) =>
            x.id === id
              ? { ...x, status: 'completed', completedAt: new Date().toISOString() }
              : x,
          ),
        });

        // Recompensas no Character
        const ch = useCharacterStore.getState();
        ch.gainXp(q.rewards.xp);
        const c = useCharacterStore.getState().character;

        // Aplica gold/essence diretamente
        const newGold = c.currencies.gold + q.rewards.gold;
        const newEssence = c.currencies.essence + q.rewards.essence;

        // Drop de material (chance-based)
        let materials: CraftingMaterials = { ...c.currencies.craftingMaterials };
        const drop = q.rewards.materialDrop;
        if (drop && Math.random() < drop.chance) {
          materials = { ...materials, [drop.type]: materials[drop.type] + 1 };
        }

        useCharacterStore.setState({
          character: {
            ...c,
            currencies: {
              ...c.currencies,
              gold: newGold,
              essence: newEssence,
              craftingMaterials: materials,
            },
          },
        });

        // Streak — completar pelo menos 1 quest no dia tica o streak
        ch.tickStreak();
      },

      fail: (id) => {
        set({
          quests: get().quests.map((q) =>
            q.id === id
              ? { ...q, status: 'failed', failedAt: new Date().toISOString() }
              : q,
          ),
        });
      },

      snooze: (id, hours) => {
        const q = get().quests.find((x) => x.id === id);
        if (!q) return;
        const newDue = new Date(
          new Date(q.schedule.dueDate).getTime() + hours * 3600 * 1000,
        ).toISOString();
        get().update(id, { schedule: { ...q.schedule, dueDate: newDue } });
      },

      getActive: () =>
        get()
          .quests.filter((q) => q.status === 'active' || q.status === 'planned')
          .sort(
            (a, b) =>
              new Date(a.schedule.dueDate).getTime() -
              new Date(b.schedule.dueDate).getTime(),
          ),

      getCompletedToday: () =>
        get().quests.filter(
          (q) => q.status === 'completed' && isToday(q.completedAt),
        ),

      getByDungeon: (dungeonId) =>
        get().quests.filter((q) => q.dungeonId === dungeonId),
    }),
    { name: 'nexus-quests' },
  ),
);
