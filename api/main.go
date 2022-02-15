package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
)

// Players model
type Players struct {
	Players []Player `json:"players"`
}

// Player model
type Player struct {
	Name      string `json:"name"`
	Score     int    `json:"score"`
	Levels    int    `json:"levels"`
	Time      string `json:"time"`
	CreatedAt int    `json:"createdAt"`
}

func main() {
	handleRequests()
}

// handleRequests handles all requests
func handleRequests() {
	myRouter := mux.NewRouter().StrictSlash(true)

	myRouter.HandleFunc("/get-scoreboard", getScoreBoard).Methods("GET")
	myRouter.HandleFunc("/post-scoreboard", postScoreBoard).Methods("POST", "OPTIONS")

	log.Fatal(http.ListenAndServe(":8080", myRouter))
}

// getScoreBoard gets players data from the file and sends it as json response
func getScoreBoard(w http.ResponseWriter, r *http.Request) {
	var players Players = getJsonData()
	jsonResponse, _ := json.MarshalIndent(players.Players, "", "    ")

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Write(jsonResponse)
}

// postScoreBoard gets players data from the file, updates it (locally and in the file) and sends it as json response
func postScoreBoard(w http.ResponseWriter, r *http.Request) {
	newPlayerInByte, _ := ioutil.ReadAll(r.Body)
	var newPlayer Player
	json.Unmarshal(newPlayerInByte, &newPlayer)

	var players Players = getJsonData()
	players.Players = append(players.Players, newPlayer)

	fileData, _ := json.MarshalIndent(players, "", " ")
	_ = ioutil.WriteFile("./api/scoreboard.json", fileData, 0644)

	jsonResponse, _ := json.MarshalIndent(players.Players, "", "    ")
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Write(jsonResponse)
}

// getJsonData returns players data from the file
func getJsonData() Players {
	jsonFile, err := os.Open("./api/scoreboard.json")

	if err != nil {
		log.Fatal(err)
	}
	defer jsonFile.Close()

	byteValue, _ := ioutil.ReadAll(jsonFile)
	var players Players

	json.Unmarshal(byteValue, &players)

	return players
}
