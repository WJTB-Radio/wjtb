#!/bin/bash

# without this, we will delete the database whenever we deploy
cat ./api/database.sqlite3 > ../api/public/database.sqlite3

git fetch --depth 1
git reset --hard origin/master
git clean -dfx
./create_pages.sh

# load the saved database
cat ../api/public/database.sqlite3 > ./api/database.sqlite3

# remove the temporary file
rm ../api/public/database.sqlite3
