#!/bin/bash
if [[ $# -eq 0 ]] ; then
    echo 'run.sh <type: text, base64, grid>'
    exit 0
fi

for ((i=4; i<=24; i+=4))
do
  ./webtest.sh 50 $i $1
done