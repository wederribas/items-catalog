#!/bin/bash
docker exec -it --user root webapp bash -c "cd /usr/src/catalog-app; exec /bin/bash";