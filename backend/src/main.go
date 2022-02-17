package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Database connection

var (
	usr      = "mongoadmin"
	pwd      = "secret"
	host     = "localhost"
	port     = 27017
	database = "calculator"
)

func GetCollection(collection string) *mongo.Collection {
	uri := fmt.Sprintf("mongodb://%s:%s@%s:%d", usr, pwd, host, port)
	fmt.Print(uri)

	client, err := mongo.NewClient(options.Client().ApplyURI(uri))

	if err != nil {
		log.Fatal(err.Error())
	}

	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)

	if err != nil {
		log.Fatal(err.Error())
	}

	return client.Database(database).Collection(collection)
}

var collection = GetCollection("operations")
var ctx = context.Background()

type Route struct {
	Name     string
	Method   string
	Path     string
	Function http.HandlerFunc
}

type Routes []Route

var routes = Routes{
	Route{Name: "Index", Method: http.MethodGet, Path: "/", Function: HomeHandler},
	Route{Name: "doOperation", Method: "POST", Path: "/doOperation", Function: OperationHandler},
}

type OperationRequest struct {
	Operator1 float64 `json:"op1"`
	Operator2 float64 `json:"op2"`
	Operation string  `json:"operation"`
}

type Operation struct {
	Operator1 float64 `json:"op1"`
	Operator2 float64 `json:"op2"`
	Operation string  `json:"operation"`
	Result    float64 `json:"result"`
	DateTime  string  `json:"datetime"`
}

func OperationHandler(w http.ResponseWriter, r *http.Request) {

	// Decoding information from body
	var operationRequest OperationRequest
	err := json.NewDecoder(r.Body).Decode(&operationRequest)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Oops! There was an error."))
		return
	}

	result := solveOperation(operationRequest.Operator1, operationRequest.Operator2, operationRequest.Operation)

	newOperation := Operation{
		Operator1: operationRequest.Operator1,
		Operator2: operationRequest.Operator2,
		Operation: operationRequest.Operation,
		Result:    result,
		DateTime:  time.Now().String(),
	}

	// Insert to database
	_, err = collection.InsertOne(ctx, newOperation)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Oops! There was an error."))
		return
	}

	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(newOperation)
	w.WriteHeader(http.StatusCreated)
}

func solveOperation(op1 float64, op2 float64, operation string) float64 {
	switch operation {
	case "+":
		return op1 + op2
	case "-":
		return op1 - op2
	case "*":
		return op1 * op2
	case "/":
		return op1 / op2
	default:
		log.Fatal("Not suitable operation")
		return -1
	}
}

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
}

func main() {
	r := mux.NewRouter().StrictSlash(true)

	for _, route := range routes {
		r.Name(route.Name).Methods(route.Method).Path(route.Path).Handler(route.Function)
	}

	log.Fatal(http.ListenAndServe(":8080", r))
}
