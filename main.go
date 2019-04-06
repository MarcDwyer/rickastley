package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("Sever started")
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./frontend/static/"))))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "/manifest.json" || r.URL.Path == "/favicon.png" {
			str := fmt.Sprintf("./public/build/%v", r.URL.Path)
			http.ServeFile(w, r, str)
			return
		}
		http.ServeFile(w, r, "./frontend/index.html")
	})

	http.ListenAndServe(":3000", nil)
}
