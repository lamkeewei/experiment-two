#!/bin/bash
if [[ $# -eq 0 ]] ; then
    echo 'webtest.sh <number of runs> <number of chunks> <type: text, base64, grid>'
    exit 0
fi

if [ -f "$3/output/output_$2_chunks.csv" ]; then
    rm "$3/output/output_$2_chunks.csv"
fi

if [ "$3" = "grid" ]
then
  phantomas "http://192.168.1.1/$3/$2_chunks.html"  --modules=httpTrafficCompleted -R csv > tmp.csv
else
  phantomas "http://192.168.1.1/$3/$2_chunks.html"  --modules=httpTrafficCompleted --wait-for-selector "body.loaded" -R csv > tmp.csv
fi
echo "Finished 1..."

for i in $(seq 2 $1)
do

  if [ "$3" = "grid" ]
  then
    phantomas "http://192.168.1.1/$3/$2_chunks.html"  --modules=httpTrafficCompleted -R csv:no-header >> tmp.csv
  else
    phantomas "http://192.168.1.1/$3/$2_chunks.html"  --modules=httpTrafficCompleted --wait-for-selector "body.loaded" -R csv:no-header >> tmp.csv
  fi

  echo "Finished $i..."
done

cp tmp.csv "$3/output/output_$2_chunks.csv"
rm tmp.csv
