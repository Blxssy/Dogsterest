.PHONY: all go_bd nest_server react_app

all: go_bd nest_server react_app

go_bd:
	cd bd/cmd && go run main.go &

nest_server:
	cd backend && npm install && npm run start &

react_app:
	cd school-template && npm i && npm install && npm start &

clean:
	@pkill -f "go run bd/cmd/main.go" || true
	@pkill -f "node .*backend" || true
	@pkill -f "node .*school-template" || true
