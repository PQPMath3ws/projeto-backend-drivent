#!/bin/bash

set -e
set -u

if [ -n "$POSTGRES_MULTIPLE_DATABASES" ]; then
    for dbname in $(echo $POSTGRES_MULTIPLE_DATABASES | tr ',' ' '); do
        psql -v ON_ERROR_STOP=1 --username postgres -tc "SELECT 1 FROM pg_database WHERE datname = '$dbname';" | grep -q 1 | psql -v ON_ERROR_STOP=1 --username "postgres" -c "CREATE DATABASE $dbname; GRANT CONNECT ON DATABASE $dbname TO postgres;"
    done
fi