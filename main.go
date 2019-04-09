package main

import (
	"fmt"
	"net/http"
	"os"
)

func main() {
	fmt.Println("Sever started")
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./frontend/static/"))))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		str := fmt.Sprintf("./frontend/%v", r.URL.Path)
		http.ServeFile(w, r, str)
	})
	http.ListenAndServe(os.Getenv("PORT"), nil)
}
