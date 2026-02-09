// Types
export interface GameSummary {
  id: string;
  date: string;
  opponent: string;
  result: "Win" | "Loss" | "Draw";
  timeControl: string;
  analysisStatus: "Pending" | "Completed";
  accuracy?: number;
  rating?: number;
}

export interface MoveClassification {
  brilliant: number;
  great: number;
  best: number;
  inaccuracy: number;
  mistake: number;
  blunder: number;
}

export interface PhaseAccuracy {
  phase: string;
  accuracy: number;
  commonError: string;
}

export interface BlunderArchetype {
  id: string;
  type: "Ghost Threat" | "Tunnel Vision" | "Desperado Miss";
  moveNumber: number;
  severity: "Low" | "Medium" | "High";
  explanation: string;
  fen: string;
}

export interface TimePressurePoint {
  timeRemaining: number;
  accuracy: number;
  ratingBand?: string;
}

export interface PlayerDNA {
  aggression: number;
  risk: number;
  tactics: number;
  endgame: number;
  timeUsage: number;
}

export interface WhatIfPosition {
  id: string;
  moveNumber: number;
  evaluation: number;
  fen: string;
  description: string;
}

export interface GameAnalysis {
  id: string;
  accuracy: number;
  rating: number;
  moveClassifications: MoveClassification;
  phaseAccuracy: PhaseAccuracy[];
  archetypes: BlunderArchetype[];
  timePressureData: TimePressurePoint[];
}

export interface OpponentScout {
  name: string;
  rating: number;
  gamesPlayed: number;
  favoriteOpening: string;
  weakness: string;
}

// Mock Data
export const mockGames: GameSummary[] = [
  {
    id: "g1",
    date: "2026-02-08",
    opponent: "MagnusFan2024",
    result: "Loss",
    timeControl: "10+0",
    analysisStatus: "Completed",
    accuracy: 72.4,
    rating: 1685,
  },
  {
    id: "g2",
    date: "2026-02-07",
    opponent: "KnightRider99",
    result: "Win",
    timeControl: "5+3",
    analysisStatus: "Completed",
    accuracy: 88.1,
    rating: 1720,
  },
  {
    id: "g3",
    date: "2026-02-06",
    opponent: "QueenGambitPro",
    result: "Draw",
    timeControl: "15+10",
    analysisStatus: "Completed",
    accuracy: 81.5,
    rating: 1702,
  },
  {
    id: "g4",
    date: "2026-02-05",
    opponent: "SicilianDragon",
    result: "Win",
    timeControl: "3+2",
    analysisStatus: "Completed",
    accuracy: 91.3,
    rating: 1745,
  },
  {
    id: "g5",
    date: "2026-02-04",
    opponent: "EndgameWiz",
    result: "Loss",
    timeControl: "10+0",
    analysisStatus: "Pending",
  },
  {
    id: "g6",
    date: "2026-02-03",
    opponent: "BishopPair42",
    result: "Win",
    timeControl: "5+3",
    analysisStatus: "Completed",
    accuracy: 85.9,
    rating: 1710,
  },
];

export const mockAnalysis: GameAnalysis = {
  id: "g1",
  accuracy: 72.4,
  rating: 1685,
  moveClassifications: {
    brilliant: 1,
    great: 3,
    best: 18,
    inaccuracy: 5,
    mistake: 3,
    blunder: 2,
  },
  phaseAccuracy: [
    { phase: "Opening", accuracy: 92, commonError: "Early deviation from theory" },
    { phase: "Middlegame", accuracy: 65, commonError: "Over-trading pieces" },
    { phase: "Endgame", accuracy: 40, commonError: "Poor king activity" },
  ],
  archetypes: [
    {
      id: "a1",
      type: "Ghost Threat",
      moveNumber: 23,
      severity: "High",
      explanation:
        "Responded to a non-existent threat on the kingside, allowing opponent to consolidate center control.",
      fen: "r1bqkb1r/pppppppp/2n2n2/8/4P3/5N2/PPPP1PPP/RNBQKB1R",
    },
    {
      id: "a2",
      type: "Tunnel Vision",
      moveNumber: 31,
      severity: "Medium",
      explanation:
        "Focused entirely on queenside attack while missing a tactical shot on the kingside.",
      fen: "r1bqkb1r/pppppppp/2n2n2/8/4P3/5N2/PPPP1PPP/RNBQKB1R",
    },
    {
      id: "a3",
      type: "Desperado Miss",
      moveNumber: 37,
      severity: "High",
      explanation:
        "Failed to recognize that the knight could be sacrificed for two pawns and a winning endgame.",
      fen: "r1bqkb1r/pppppppp/2n2n2/8/4P3/5N2/PPPP1PPP/RNBQKB1R",
    },
  ],
  timePressureData: [
    { timeRemaining: 600, accuracy: 95 },
    { timeRemaining: 540, accuracy: 93 },
    { timeRemaining: 480, accuracy: 91 },
    { timeRemaining: 420, accuracy: 88 },
    { timeRemaining: 360, accuracy: 85 },
    { timeRemaining: 300, accuracy: 82 },
    { timeRemaining: 240, accuracy: 75 },
    { timeRemaining: 180, accuracy: 68 },
    { timeRemaining: 120, accuracy: 55 },
    { timeRemaining: 60, accuracy: 40 },
    { timeRemaining: 30, accuracy: 28 },
  ],
};

export const mockTimePressureBands: TimePressurePoint[] = [
  { timeRemaining: 600, accuracy: 90, ratingBand: "2100+" },
  { timeRemaining: 480, accuracy: 88, ratingBand: "2100+" },
  { timeRemaining: 360, accuracy: 85, ratingBand: "2100+" },
  { timeRemaining: 240, accuracy: 80, ratingBand: "2100+" },
  { timeRemaining: 120, accuracy: 72, ratingBand: "2100+" },
  { timeRemaining: 60, accuracy: 65, ratingBand: "2100+" },
  { timeRemaining: 600, accuracy: 82, ratingBand: "1800-2100" },
  { timeRemaining: 480, accuracy: 78, ratingBand: "1800-2100" },
  { timeRemaining: 360, accuracy: 73, ratingBand: "1800-2100" },
  { timeRemaining: 240, accuracy: 65, ratingBand: "1800-2100" },
  { timeRemaining: 120, accuracy: 50, ratingBand: "1800-2100" },
  { timeRemaining: 60, accuracy: 38, ratingBand: "1800-2100" },
  { timeRemaining: 600, accuracy: 75, ratingBand: "1200-1800" },
  { timeRemaining: 480, accuracy: 70, ratingBand: "1200-1800" },
  { timeRemaining: 360, accuracy: 62, ratingBand: "1200-1800" },
  { timeRemaining: 240, accuracy: 52, ratingBand: "1200-1800" },
  { timeRemaining: 120, accuracy: 38, ratingBand: "1200-1800" },
  { timeRemaining: 60, accuracy: 25, ratingBand: "1200-1800" },
];

export const mockPlayerDNA: PlayerDNA = {
  aggression: 72,
  risk: 58,
  tactics: 81,
  endgame: 45,
  timeUsage: 63,
};

export const mockWhatIfPositions: WhatIfPosition[] = [
  {
    id: "w1",
    moveNumber: 18,
    evaluation: 2.3,
    fen: "r1bqkb1r/pppppppp/2n2n2/8/4P3/5N2/PPPP1PPP/RNBQKB1R",
    description: "Winning knight fork missed in the middlegame",
  },
  {
    id: "w2",
    moveNumber: 25,
    evaluation: 3.5,
    fen: "r1bqkb1r/pppppppp/2n2n2/8/4P3/5N2/PPPP1PPP/RNBQKB1R",
    description: "Failed to convert rook endgame with extra pawn",
  },
  {
    id: "w3",
    moveNumber: 32,
    evaluation: 1.8,
    fen: "r1bqkb1r/pppppppp/2n2n2/8/4P3/5N2/PPPP1PPP/RNBQKB1R",
    description: "Missed discovered attack on the queen",
  },
];

export const mockOpponentScouts: OpponentScout[] = [
  {
    name: "MagnusFan2024",
    rating: 1720,
    gamesPlayed: 5,
    favoriteOpening: "Sicilian Defense",
    weakness: "Endgame technique under time pressure",
  },
  {
    name: "KnightRider99",
    rating: 1650,
    gamesPlayed: 3,
    favoriteOpening: "King's Indian",
    weakness: "Tactical oversights in open positions",
  },
];

export const mockMoves = [
  { number: 1, white: "e4", black: "e5", eval: 0.2 },
  { number: 2, white: "Nf3", black: "Nc6", eval: 0.3 },
  { number: 3, white: "Bb5", black: "a6", eval: 0.1 },
  { number: 4, white: "Ba4", black: "Nf6", eval: 0.2 },
  { number: 5, white: "O-O", black: "Be7", eval: 0.3 },
  { number: 6, white: "Re1", black: "b5", eval: 0.1 },
  { number: 7, white: "Bb3", black: "d6", eval: 0.4 },
  { number: 8, white: "c3", black: "O-O", eval: 0.3 },
  { number: 9, white: "h3", black: "Nb8", eval: 0.5 },
  { number: 10, white: "d4", black: "Nbd7", eval: 0.4 },
  { number: 11, white: "Nbd2", black: "Bb7", eval: 0.3 },
  { number: 12, white: "Bc2", black: "Re8", eval: 0.5 },
  { number: 13, white: "Nf1", black: "Bf8", eval: 0.6 },
  { number: 14, white: "Ng3", black: "g6", eval: 0.4 },
  { number: 15, white: "Bg5", black: "Bg7", eval: 0.7 },
  { number: 16, white: "Qd2", black: "h6", eval: -0.2 },
  { number: 17, white: "Bh4", black: "Nh5", eval: -0.5 },
  { number: 18, white: "Nxe5", black: "Nxe5", eval: 0.8 },
  { number: 19, white: "dxe5", black: "Qb8", eval: 1.2 },
  { number: 20, white: "Rad1", black: "Qc8", eval: 0.9 },
];
