// Run:  mongosh "newDB" "C:/Users/Lokesh/Desktop/stock-portal/src/dbscripts/insert_stocks.js"


// Insert 10 stock watchlists into "Watchlists" collection
db.Watchlists.insertMany([
  { watchlist_name: "Tech Giants", symbols: ["AAPL", "MSFT", "GOOGL"] },
  { watchlist_name: "EV Leaders", symbols: ["TSLA", "NIO", "LCID"] },
  { watchlist_name: "Chipmakers", symbols: ["NVDA", "AMD", "INTC"] },
  { watchlist_name: "Streaming", symbols: ["NFLX", "DIS", "ROKU"] },
  { watchlist_name: "Retail", symbols: ["AMZN", "WMT", "TGT"] },
  { watchlist_name: "Financials", symbols: ["JPM", "BAC", "WFC"] },
  { watchlist_name: "Healthcare", symbols: ["PFE", "JNJ", "MRK"] },
  { watchlist_name: "Energy", symbols: ["XOM", "CVX", "BP"] },
  { watchlist_name: "Social Media", symbols: ["META", "TWTR", "SNAP"] },
  { watchlist_name: "Cloud", symbols: ["CRM", "ORCL", "SAP"] }
]);

print("Inserted 10 watchlists successfully!");
db.Watchlists.find().pretty()