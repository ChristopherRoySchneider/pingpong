export interface Game_event {
	p1_points_scored: number;
	p2_points_scored: number;
	scorer: string,
	_id: string;
	type: string;
	x: number;
	y: number;
	createdAt: string;
	updatedAt: string;
}

export interface Game {
	game_complete: boolean;
	winner?: any;
	p1_points_scored: number;
	p2_points_scored: number;
	game_events: Game_event[];
	_id: string;
	createdAt: string;
  updatedAt: string;
  serving: string;
}

export interface Match {
	winner?: any;
	match_complete: boolean;
	_id: string;
	games: Game[];
	player1: string;
	player2: string;
	p1_games_won: number;
	p2_games_won: number;
	createdAt: string;
	updatedAt: string;
}
