package postgres

import (
	"encoding/json"
	"fmt"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"io/ioutil"
	"log"
	"net/http"
)

type Config struct {
	Host     string
	Port     string
	Username string
	Password string
	DBName   string
	SSLMode  string
}

type Dog struct {
	id       int
	fileName string `json:"fileName"`
	likes    int
}

type PostgresDB struct {
	db *sqlx.DB
}

func New(db *sqlx.DB) *PostgresDB {
	return &PostgresDB{
		db: db,
	}
}

func NewPostgresDB(cfg Config) (*sqlx.DB, error) {
	db, err := sqlx.Open("postgres", fmt.Sprintf("host=%s port=%s user=%s dbname=%s password=%s sslmode=%s",
		cfg.Host, cfg.Port, cfg.Username, cfg.DBName, cfg.Password, cfg.SSLMode))
	if err != nil {
		return nil, err
	}

	err = db.Ping()
	if err != nil {
		return nil, err
	}

	return db, nil
}

func (pg *PostgresDB) CreateTables() error {
	_, err := pg.db.Exec(`CREATE TABLE dog (
    	id SERIAL PRIMARY KEY,
    	fileName TEXT NOT NULL,
    	likes INT NOT NULL
    );`)
	if err != nil {
		log.Println(err)
		return err
	}
	return nil
}

func (pg *PostgresDB) ImportData() error {
	response, err := http.Get("https://random.dog/doggos")
	if err != nil {
		return err
	}
	defer response.Body.Close()

	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return err
	}

	var data []string
	err = json.Unmarshal(body, &data)
	if err != nil {
		return err
	}
	//fmt.Println(data)
	for _, f := range data {
		pg.importData(f)
	}

	return nil
}

func (pg *PostgresDB) importData(filename string) error {
	likes := 0
	query := fmt.Sprintf("INSERT INTO dog (fileName, likes) VALUES ('%s', '%d')", filename, likes)
	_, err := pg.db.Exec(query)
	if err != nil {
		return err
	}

	return nil
}
