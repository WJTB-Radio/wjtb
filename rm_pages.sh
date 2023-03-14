#!/bin/bash

# delete all of the automatically generated pages

for name in `cat page_names.txt`
do
	if [ -d "$name" ]
	then
		rm -rf "$name"
	fi
done
