# Dev Tools
templ:
	templ generate --watch --proxy="http://localhost:3000" --open-browser=false -v

server:
	air \
	--build.cmd "go build -o tmp/bin/main ./cmd/server" \
	--build.bin "tmp/bin/main" \
	--build.delay "100" \
	--build.exclude_dir "node_modules" \
	--build.include_ext "go" \
	--build.stop_on_error "false" \
	--misc.clean_on_exit true

dev:
	make server templ

