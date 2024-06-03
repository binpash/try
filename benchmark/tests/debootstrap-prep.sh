#!/bin/sh

mkdir /work
cd /work || exit
wget http://http.us.debian.org/debian/pool/main/d/debootstrap/debootstrap_1.0.134_all.deb
ar -x debootstrap_1.0.134_all.deb
cd / || exit
zcat /work/data.tar.gz | tar xv
mkdir /srv/debinstall
