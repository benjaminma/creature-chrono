cat sampleData.csv | jq --slurp --raw-input --raw-output 'split("\n")
	| .[1:] | map(split(","))
	| map({"type":.[0],"name":.[1], "imageUrl":.[2], "estMph":.[3], "speed":.[4], "height":.[5], "weight":.[6]})' \
	> sampleData.json
