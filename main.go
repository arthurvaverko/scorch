// main.go
package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

type Character struct {
	Name    string
	HP      int
	MaxHP   int
	Mana    int
	MaxMana int
}

type GameState struct {
	StoryLines []string
	Character  Character
}

func main() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)

	// Serve static files
	r.Handle("/static/*", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	// Game routes
	r.Get("/", handleIndex)

	http.ListenAndServe(":3000", r)
}

func handleIndex(w http.ResponseWriter, r *http.Request) {
	gameState := GameState{
		StoryLines: []string{
			"You find yourself in a dimly lit ancient temple.",
			"Intricate carvings cover the weathered stone walls.",
			"A mysterious altar glows faintly in the distance.",
			"The air is thick with the scent of age-old incense.",
		},
		Character: Character{
			Name:    "John Constantine",
			HP:      80,
			MaxHP:   100,
			Mana:    54,
			MaxMana: 100,
		},
	}

	component := Layout(gameState)
	component.Render(r.Context(), w)
}
