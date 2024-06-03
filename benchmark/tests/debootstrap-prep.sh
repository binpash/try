mkdir /work
cd /work
wget http://http.us.debian.org/debian/pool/main/d/debootstrap/debootstrap_1.0.134_all.deb
ar -x debootstrap_1.0.134_all.deb
cd /
zcat /work/data.tar.gz | tar xv
mkdir /srv/debinstall
