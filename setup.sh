#!/bin/sh

wget https://github.com/ezrizhu/gidmapper/releases/download/0.0.3/gidmapper -O /usr/bin/gidmapper
chmod +x /usr/bin/gidmapper
setcap 'CAP_SETGID=ep' /usr/bin/gidmapper
