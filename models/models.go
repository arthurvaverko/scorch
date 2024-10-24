package models

type SceneType string

const (
	SceneTypeCombat SceneType = "combat"
	SceneTypeStory  SceneType = "story"
	SceneTypePuzzle SceneType = "puzzle"
)

type GameScene struct {
	StoryLines   []string
	MainImageUrl string
	SceneType    SceneType
	Character    Character
}

type Character struct {
	Name    string
	HP      int
	MaxHP   int
	Mana    int
	MaxMana int
}
