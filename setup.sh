#!/bin/sh

wget https://github.com/ezrizhu/gidmapper/releases/download/0.0.3/gidmapper -O /usr/local/bin/gidmapper
chmod +x /usr/local/bin/gidmapper
setcap 'CAP_SETGID=ep' /usr/local/bin/gidmapper
