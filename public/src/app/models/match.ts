export interface Game_event {
	p1_points_scored: number;
	p2_points_scored: number;
	_id: string;
	type: string;
	createdAt: string;
	updatedAt: string;
}

export interface Game {
	game_complete: boolean;
	winner?: any;
	game_events: Game_event[];
	_id: string;
	createdAt: string;
	updatedAt: string;
}

export interface Match {
	winner?: any;
	match_complete: boolean;
	_id: string;
	games: Game[];
	player1: string;
	player2: string;
	createdAt: string;
	updatedAt: string;
}