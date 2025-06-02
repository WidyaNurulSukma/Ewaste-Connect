#/usr/bin/env python3

# bash script for settting env variables

export MONGO_URI="mongodb://127.0.0.1/bloglist"
export PORT=1337
export JWT_SECRET_KEY=$SSH_AUTH_SOCK # don't use this
