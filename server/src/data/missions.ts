export interface PracticeMission {
  topic: string;
  durationMinutes: number;
}

export const PRACTICE_TOPICS: string[] = [
  "Will AI replace teachers in the future?",
  "What's the biggest challenge in learning a new language?",
  "Should social media platforms verify user identities?",
  "Describe your dream job and why you'd love it.",
  "Is remote work better than working from an office?",
  "What's a skill you wish schools taught but don't?",
  "Talk about a book or movie that changed how you think.",
  "Should college education be free for everyone?",
  "What does success mean to you personally?",
  "Describe the most memorable trip you've ever taken.",
  "Is it better to specialize in one skill or be a generalist?",
  "How has technology changed the way we make friends?",
  "What's one habit that improved your life significantly?",
  "Should countries invest more in space exploration?",
  "Describe a time you had to adapt to a big change.",
];

export const getRandomMission = (): PracticeMission => {
  const topic = PRACTICE_TOPICS[Math.floor(Math.random() * PRACTICE_TOPICS.length)];
  return {
    topic,
    durationMinutes: 5,
  };
};