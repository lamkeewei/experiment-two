#!/bin/bash
if [[ $# -eq 0 ]] ; then
    echo 'webtest.sh <number of runs> <number of chunks> <type: text, base64, grid>'
    exit 0
fi

if [ -f "$3/output/output_$2_chunks.csv" ]; then
    rm "$3/output/output_$2_chunks.csv"
fi

phantomas "http://localhost/$3/$2_chunks.html"  --modules=httpTrafficCompleted --wait-for-selector "body.loaded" -R csv > tmp.csv
echo "Finished 1..."

for i in $(seq 2 $1)
do
  phantomas "http://localhost/$3/$2_chunks.html"  --modules=httpTrafficCompleted --wait-for-selector "body.loaded" -R csv:no-header >> tmp.csv
  echo "Finished $i..."
done

cat tmp.csv | awk -F ',' '{ print $8}' > "$3/output/output_$2_chunks.csv"
rm tmp.csv
