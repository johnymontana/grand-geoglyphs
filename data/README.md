# Import

1. Scrape Wikipedia pages

Import with Cypher

```cypher
LOAD CSV WITH HEADERS FROM "file:///geoglyphs.csv" AS row
MERGE (s:State {name: row.state})
MERGE (t:Town {name: row.town})
MERGE (m:Monogram {name: row.monogram})
MERGE (g:Geoglyph {location: Point({latitude: toFloat(row.lat), longitude: toFloat(row.lon)})})
SET g.description = row.description
MERGE (g)-[:HAS_MONOGRAM]->(m)
MERGE (g)-[:IN_TOWN]->(t)
MERGE (t)-[:IN_STATE]->(s)
```
