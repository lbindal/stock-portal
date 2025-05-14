import csv
from pymongo import MongoClient

# MongoDB Connection
client = MongoClient("mongodb://localhost:27017")

# Switch to new database and collection
db = client["myNewWatchlistDB"]
collection = db["Watchlists"]

# Read symbols from CSV
symbols = []
with open("C:/Users/Lokesh/Desktop/stock-portal/data/symbols.csv", "r") as file:
    reader = csv.DictReader(file)
    for row in reader:
        symbols.append(row["symbol"])

# Insert into new watchlist
collection.insert_one({
    "watchlist_name": "Imported CSV Watchlist",
    "symbols": symbols
})

print("Symbols inserted successfully:", symbols)
