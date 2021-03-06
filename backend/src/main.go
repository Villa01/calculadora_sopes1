package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Database connection

func GetCollection(collection string) *mongo.Collection {

	client, err := mongo.NewClient(options.Client().ApplyURI(os.Getenv("MONGODB_URI")))

	if err != nil {
		log.Fatal(err.Error())
	}

	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)

	if err != nil {
		log.Fatal(err.Error())
	}

	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Connected to MongoDB")

	return client.Database("calculator").Collection(collection)
}

func GetAllOperations() []bson.M {
	cursor, err := collection.Find(ctx, bson.M{})

	if err != nil {
		log.Fatal(err)
	}

	var operations []bson.M
	if err = cursor.All(ctx, &operations); err != nil {
		log.Fatal(err)
	}

	return operations
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
	Route{Name: "doOperation", Method: http.MethodPost, Path: "/doOperation", Function: OperationHandler},
	Route{Name: "getOperations", Method: http.MethodGet, Path: "/getOperations", Function: GetOperationsHandler},
}

type OperationRequest struct {
	Operator1 float64 `json:"op1"`
	Operator2 float64 `json:"op2"`
	Operation string  `json:"operator"`
}

type Operation struct {
	Operator1 float64 `json:"op1"`
	Operator2 float64 `json:"op2"`
	Operation string  `json:"operation"`
	Result    float64 `json:"result"`
	DateTime  string  `json:"datetime"`
}

type Operations []Operation

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode("Go api running on port: 8080")
}

func OperationHandler(w http.ResponseWriter, r *http.Request) {

	// Decoding information from body
	var operationRequest OperationRequest
	err := json.NewDecoder(r.Body).Decode(&operationRequest)
	if err != nil {
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Oops! There was an error."))
		return
	}
	fmt.Println(operationRequest)
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
		fmt.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Oops! There was an error."))
		return
	}

	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(newOperation)
	w.WriteHeader(http.StatusCreated)
}

func GetOperationsHandler(w http.ResponseWriter, r *http.Request) {

	operations := GetAllOperations()

	w.Header().Set("Content-type", "application/json")
	json.NewEncoder(w).Encode(operations)
	w.WriteHeader(http.StatusOK)
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

func main() {
	router := mux.NewRouter().StrictSlash(true)

	for _, route := range routes {
		router.Name(route.Name).Methods(route.Method).Path(route.Path).Handler(route.Function)
	}

	credentials := handlers.AllowCredentials()
	methods := handlers.AllowedMethods([]string{"POST", "GET", "OPTIONS"})
	headers := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type"})
	origins := handlers.AllowedOrigins([]string{"*"})

	fmt.Printf("Go api running on port: 8080\n")
	log.Fatal(http.ListenAndServe(":8080", handlers.CORS(credentials, headers, methods, origins)(router)))
}
