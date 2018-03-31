#!/bin/bash
docker exec -it --user root catalog_webapp bash -c "cd /usr/src/catalog_app; exec /bin/bash";
