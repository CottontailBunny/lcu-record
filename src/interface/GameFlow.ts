interface GameClient {
	observerServerIp: string;
	observerServerPort: number;
	running: boolean;
	serverIp: string;
	serverPort: number;
	visible: boolean;
}

interface PlayerChampionSelection {
	championId: number;
	selectedSkinIndex: number;
	spell1Id: number;
	spell2Id: number;
	summonerInternalName: string;
}

interface Queue {
	allowablePremadeSizes: number[];
	areFreeChampionsAllowed: boolean;
	assetMutator: string;
	category: string;
	championsRequiredToPlay: number;
	description: string;
	detailedDescription: string;
	gameMode: string;
	gameTypeConfig: {
		advancedLearningQuests: boolean;
		allowTrades: boolean;
		banMode: string;
		banTimerDuration: number;
		battleBoost: boolean;
		crossTeamChampionPool: boolean;
		deathMatch: boolean;
		doNotRemove: boolean;
		duplicatePick: boolean;
		exclusivePick: boolean;
		id: number;
		learningQuests: boolean;
		mainPickTimerDuration: number;
		maxAllowableBans: number;
		name: string;
		onboardCoopBeginner: boolean;
		pickMode: string;
		postPickTimerDuration: number;
		reroll: boolean;
		teamChampionPool: boolean;
	};
	id: number;
	isRanked: boolean;
	isTeamBuilderManaged: boolean;
	lastToggledOffTime: number;
	lastToggledOnTime: number;
	mapId: number;
	maximumParticipantListSize: number;
	minLevel: number;
	minimumParticipantListSize: number;
	name: string;
	numPlayersPerTeam: number;
	queueAvailability: string;
	queueRewards: {
		isChampionPointsEnabled: boolean;
		isIpEnabled: boolean;
		isXpEnabled: boolean;
		partySizeIpRewards: any[];
	};
	removalFromGameAllowed: boolean;
	removalFromGameDelayMinutes: number;
	shortName: string;
	showPositionSelector: boolean;
	spectatorEnabled: boolean;
	type: string;
}

interface TeamMember {
	championId: number;
	lastSelectedSkinIndex: number;
	profileIconId: number;
	puuid: string;
	selectedPosition: string;
	selectedRole: string;
	summonerId: number;
	summonerInternalName: string;
	summonerName: string;
	teamOwner: boolean;
	teamParticipantId: number;
}

interface MapAssets {
	// Define map assets properties here...
}

interface GameMap {
	assets: MapAssets;
	// Define other map properties here...
}

export interface GameData {
	httpStatus: number;
	gameClient: GameClient;
	gameData: GameDatas;
	playerChampionSelections: PlayerChampionSelection[];
	queue: Queue;
	teamOne: TeamMember[];
	teamTwo: TeamMember[];
	gameMap: GameMap;
	// Define other game data properties here...
}

interface GameDatas {
	gameId: number;
	gameName: string;
	isCustomGame: boolean;
	password: string;
	playerChampionSelections: PlayerChampionSelection[];
	queue: Queue;
	spectatorsAllowed: boolean;
	teamOne: TeamMember[];
	teamTwo: TeamMember[];
}

interface GameDodge {
	dodgeIds: any[];
	phase: string;
	state: string;
}

interface GameMap {
	// Define map properties here...
}

interface GamePhase {
	// Define game phase properties here...
}

interface GameInfo {
	type: GameData;
	gameDodge: GameDodge;
	gameMap: GameMap;
	phase: GamePhase;
}
