#!/bin/sh

wget https://github.com/ericzty/gidmapper/releases/download/0.0.3/gidmapper
chmod +x gidmapper
sudo setcap 'CAP_SETGID=ep' gidmapper
