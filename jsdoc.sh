#!/bin/sh
rm -r ./doc
jsdoc --readme README.md -r ./ -d doc
