Vagrant.configure("2") do |config|

  config.vm.provider "virtualbox" do |vb|
    vb.memory = 8192
    vb.cpus = 2
  end

  # Regular debian testing box
  config.vm.define "debian" do |debian|
    debian.vm.box = "debian/testing64"
    debian.vm.provision "file", source: "./", destination: "/home/vagrant/try"
    debian.vm.provision "shell", privileged: false, inline: "
      sudo apt-get update
      sudo apt-get install -y git expect curl attr pandoc
      sudo chown -R vagrant:vagrant try
      cd try
      scripts/run_tests.sh

      ./configure && make
      sudo make install
      scripts/run_tests.sh
    "
  end

  # Regular debian testing box but we try the rustup oneliner
  config.vm.define "debianrustup" do |debianrustup|
    debianrustup.vm.box = "debian/testing64"
    debianrustup.vm.provision "file", source: "./", destination: "/home/vagrant/try"
    debianrustup.vm.provision "shell", privileged: false, inline: "
      sudo apt-get update
      sudo apt-get install -y curl attr pandoc
      sudo chown -R vagrant:vagrant try
      cd try
      mkdir rustup
      ./try -D rustup \"curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y\"
      ls -lah rustup/upperdir/home/vagrant/.cargo/bin

      rm -rf rustup
      ./configure && make
      sudo make install
      mkdir rustup
      ./try -D rustup \"curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y\"
      ls -lah rustup/upperdir/home/vagrant/.cargo/bin
    "
  end

  # Regular debian testing box with LVM
  config.vm.define "debianlvm" do |debianlvm|
    debianlvm.vm.box = "debian/testing64"
    debianlvm.vm.provision "file", source: "./", destination: "/home/vagrant/try"
    debianlvm.vm.provision "shell", privileged: false, inline: "
      sudo apt-get update
      sudo apt-get install -y git expect lvm2 mergerfs curl attr pandoc

      # Create an image for the lvm disk
      sudo fallocate -l 2G /root/lvm_disk.img

      # Setup a loopback device
      sudo losetup /dev/loop0 /root/lvm_disk.img

      # Create the lv physicalvolume, volumegroup, and logicalvolumes
      sudo pvcreate /dev/loop0
      sudo vgcreate vg0 /dev/loop0
      sudo lvcreate -n lv0 -l 50%FREE vg0
      sudo lvcreate -n lv1 -l 100%FREE vg0

      sudo mkfs.ext4 /dev/vg0/lv0
      sudo mkfs.ext4 /dev/vg0/lv1
      sudo mkdir /mnt/lv0
      sudo mount /dev/vg0/lv0 /mnt/lv0
      sudo mkdir /mnt/lv0/lv1
      sudo mount /dev/vg0/lv1 /mnt/lv0/lv1

      # This is intentional, if we moved try to lv1 it'd work since itself does not contain a nested mount
      sudo mv /home/vagrant/try /mnt/lv0
      sudo chown -R vagrant:vagrant /mnt/lv0/try

      cd /mnt/lv0/try
      scripts/run_tests.sh

      ./configure && make
      sudo make install

      scripts/run_tests.sh
    "
  end

  # Regular rocky testing box
  config.vm.define "rocky9" do |rocky|
    rocky.vm.box = "generic/rocky9"
    rocky.vm.provision "file", source: "./", destination: "/home/vagrant/try"
    rocky.vm.provision "shell", privileged: false, inline: "
      sudo yum install -y git expect curl attr pandoc
      sudo chown -R vagrant:vagrant try
      cd try
      TRY_TOP=$(pwd) scripts/run_tests.sh
      ./configure && make
      sudo make install
      TRY_TOP=$(pwd) scripts/run_tests.sh
    "
  end
  #
  # Regular rocky testing box
  config.vm.define "fedora33" do |fedora|
    fedora.vm.box = "generic/fedora33"
    fedora.vm.provision "file", source: "./", destination: "/home/vagrant/try"
    fedora.vm.provision "shell", privileged: false, inline: "
      sudo yum install -y git expect curl attr pandoc
      sudo chown -R vagrant:vagrant try
      cd try
      TRY_TOP=$(pwd) scripts/run_tests.sh
      ./configure && make
      sudo make install
      TRY_TOP=$(pwd) scripts/run_tests.sh
    "
  end
end
