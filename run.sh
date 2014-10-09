#!/bin/bash
for ((i=4; i<=24; i+=4))
do
  ./webtest.sh 50 $i $1
done