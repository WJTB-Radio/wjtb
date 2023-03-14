#!/bin/bash

# this script generates the index.html files for each page
# this is nessecary so that search engines can index our site content properly
# it also prevents the home page from flashing briefly when you get linked to a different page
# it also makes the site slightly more usable without js, but navigation still wont work

for name in `cat page_names.txt`
do
	# if a folder for this page doesnt exist, make it
	if [ ! -d "$name" ]
	then
		mkdir "$name"
	fi
	# delete the old page
	if [ -e "${name}/index.html" ]
	then
		rm ${name}/index.html
	fi
	# create the new page, replacing the tag with the correct data
	cp template.html ${name}/index.html
	# adapted from here: https://stackoverflow.com/questions/67929263/inserting-contents-of-one-text-file-into-another-in-bash
	printf "%s\n" "/INSERT-CONTENTS-HERE-578395676396/r ./pages/${name}.html" w | ed -s ${name}/index.html
	# create symbolic links so that the page has the correct css, javascript, and images
	for symlink_dir in css img js
	do
		if [ -e "${name}/${symlink_dir}" ]
		then
			rm ${name}/${symlink_dir}
		fi
		ln -s ../${symlink_dir} ${name}/${symlink_dir}
	done
done

# we wanna copy the home page to ./index.html too
# we dont need to create any symlinks for this one

cp ./home/index.html ./index.html
