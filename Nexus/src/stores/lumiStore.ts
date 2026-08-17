import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LumiMessage, LumiPersonality } from '@/types';

interface LumiState {
  messages: LumiMessage[];
  personality: LumiPersonality;
  send: (text: string) => void;
  setPersonality: (p: LumiPersonality) => void;
  clear: () => void;
}

const newId = () =>
  `lm_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;

const PERSONALITY_RESPONSES: Record<LumiPersonality, string[]> = {
  default: [
    'Vamos quebrar isso em partes menores. O que parece mais urgente agora?',
    'Boa pergunta. Pelo seu padrão dos últimos dias, sugiro focar em 1 coisa de cada vez.',
    'Posso criar uma quest pra isso. Confirma?',
    'Lembra: consistência > intensidade. Você tá indo bem.',
  ],
  cheerleader: [
    'Vamooos!! Você consegue! Bora fazer isso virar quest agora 💪✨',
    'EU SABIA que você ia perguntar isso! Você tá num momento INSANO 🔥',
    'Ai gente, que orgulho! Olha pra trás — quanto chão já andou. Bora!',
    'Tu é foda. Sério. Continua que tá dando certo 💜',
  ],
  sensei: [
    'Hmm. A pergunta certa raramente é a primeira que fazemos. O que está por trás disso?',
    'No silêncio entre as quests, mora a sabedoria. Talvez seja hora de pausar.',
    'Lembra: o caminho é mais importante que o destino. Por que essa pressa?',
    'Você já conhece a resposta. Eu só te ajudo a ouvi-la.',
  ],
  gamer: [
    'AAAAA bora bora bora 🎮 cria a quest e mete bronca',
    'Vc tá tipo no boss fight da vida real, calma que dá certo',
    'Olha esse XP entrando, viciada em produtividade rs',
    'Bora upar de level kkkk',
  ],
  dark_mentor: [
    'Você sabe o que precisa fazer. Por que ainda está perguntando?',
    'Não me venha com desculpas. Crie a quest e execute.',
    'A procrastinação é o boss mais fácil de derrotar — e você ainda não derrotou. Por quê?',
    'Cada dia que passa sem ação é um dia que o Monarch das Sombras ganha.',
  ],
  cosmic: [
    'As estrelas alinham seu caminho hoje. Sinta o fluxo, não force.',
    'Cada quest é uma constelação se formando. Qual será sua próxima estrela?',
    'O universo escuta. Sua intenção já foi enviada — agora é caminhar.',
    'Você é poeira de estrelas tentando produzir. Seja gentil consigo.',
  ],
};

const PERSONALITY_GREETING: Record<LumiPersonality, string> = {
  default:
    'Oi! Sou a Lumi. Posso criar quests, sugerir foco, comentar sua jornada ou só conversar. O que precisa?',
  cheerleader: 'AIII OI!! 💜 Tô MORRENDO de animação pra trabalhar com você hoje!! Bora?',
  sensei: 'Oi, Hunter. Respira. Conta-me o que pesa hoje.',
  gamer: 'Eai Karen 🎮 bora upar hoje? me conta o plano',
  dark_mentor:
    'Você está aqui. Bom. Agora me diga: o que vai mudar HOJE?',
  cosmic:
    '✨ As marés cósmicas te trouxeram até aqui. Compartilhe sua intenção comigo.',
};

export const useLumiStore = create<LumiState>()(
  persist(
    (set, get) => ({
      messages: [
        {
          id: newId(),
          role: 'lumi',
          text: PERSONALITY_GREETING.default,
          createdAt: new Date().toISOString(),
        },
      ],
      personality: 'default',

      send: (text) => {
        const userMsg: LumiMessage = {
          id: newId(),
          role: 'user',
          text,
          createdAt: new Date().toISOString(),
        };
        set({ messages: [...get().messages, userMsg] });

        // Mock response (Sprint 7 troca pra Claude API real)
        setTimeout(() => {
          const responses = PERSONALITY_RESPONSES[get().personality];
          const reply = responses[Math.floor(Math.random() * responses.length)];
          const lumiMsg: LumiMessage = {
            id: newId(),
            role: 'lumi',
            text: reply,
            createdAt: new Date().toISOString(),
          };
          set({ messages: [...get().messages, lumiMsg] });
        }, 600 + Math.random() * 800);
      },

      setPersonality: (p) => {
        const greeting: LumiMessage = {
          id: newId(),
          role: 'system',
          text: `Lumi mudou pra modo "${p}"`,
          createdAt: new Date().toISOString(),
        };
        const intro: LumiMessage = {
          id: newId(),
          role: 'lumi',
          text: PERSONALITY_GREETING[p],
          createdAt: new Date().toISOString(),
        };
        set({
          personality: p,
          messages: [...get().messages, greeting, intro],
        });
      },

      clear: () =>
        set({
          messages: [
            {
              id: newId(),
              role: 'lumi',
              text: PERSONALITY_GREETING[get().personality],
              createdAt: new Date().toISOString(),
            },
          ],
        }),
    }),
    { name: 'nexus-lumi' },
  ),
);
