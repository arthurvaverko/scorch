// main.go
package main

import (
	"context"
	"net/http"

	"github.com/arthurvaverko/imaginerium/components"
	"github.com/arthurvaverko/imaginerium/lib/log"
	"github.com/arthurvaverko/imaginerium/models"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func main() {
	ctx := context.Background()
	r := chi.NewRouter()
	r.Use(middleware.Logger)

	// Serve static files
	r.Handle("/static/*", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	// Game routes
	r.Get("/", handleIndex)

	log.Info(ctx, "Starting server on http://localhost:3000")
	http.ListenAndServe(":3000", r)
}

func handleIndex(w http.ResponseWriter, r *http.Request) {
	gameState := models.GameScene{
		StoryLines: []string{
			"You find yourself in a dimly lit ancient temple.",
			"Intricate carvings cover the weathered stone walls.",
			"A mysterious altar glows faintly in the distance.",
			"The air is thick with the scent of age-old incense.",
		},
		MainImageUrl: "https://fastly.picsum.photos/id/10/500/900.jpg?hmac=Nx5iSs6BJ8Y09z6ZwCrvK5zBX8GcGdOhOUeoszYa3Hg",
		Character: models.Character{
			Name:    "John Constantine",
			HP:      80,
			MaxHP:   100,
			Mana:    54,
			MaxMana: 100,
		},
	}

	component := components.Layout(gameState)
	component.Render(r.Context(), w)
}
