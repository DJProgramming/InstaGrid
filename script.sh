#!/bin/bash

echo "var files = " > js/files.js

python -c 'import os, json; print json.dumps(os.listdir("./images"))' >> ./js/files.js

exit