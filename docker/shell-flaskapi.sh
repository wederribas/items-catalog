#!/bin/bash
docker exec -it --user root flaskapi bash -c "cd /usr/src/catalog-api; exec /bin/bash";