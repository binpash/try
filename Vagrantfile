require "rbconfig"

Vagrant.configure("2") do |config|
  host_os = RbConfig::CONFIG["host_os"]
  host_cpu = RbConfig::CONFIG["host_cpu"]
  apple_silicon = host_os.include?("darwin") && ["arm64", "aarch64"].include?(host_cpu)
  debian_box = apple_silicon ? "bento/debian-12" : "generic/debian12"

  config.vm.provider "virtualbox" do |vb|
    vb.memory = 8192
    vb.cpus = 2
  end

  # Regular debian testing box
  config.vm.define "debian" do |debian|
    debian.vm.box = debian_box
    debian.vm.box_architecture = "arm64" if apple_silicon
    debian.vm.provision "file", source: "./", destination: "/home/vagrant/try"
    debian.vm.provision "shell", privileged: false, inline: "
      sudo apt-get update
      sudo apt-get install -y git expect curl attr pandoc gcc make autoconf automake libtool mergerfs python3-matplotlib python3-pip docker.io nodejs npm time cargo rustc strace
      sudo systemctl enable docker || true
      sudo systemctl start docker || sudo service docker start
      sudo usermod -aG docker vagrant
      sudo chown -R vagrant:vagrant try
      cd try

      autoconf && ./configure && make
      sudo make install
      which try-commit || exit 2
    "
  end

  # Regular debian testing box but we try the rustup oneliner
  config.vm.define "debianrustup" do |debianrustup|
    debianrustup.vm.box = debian_box
    debianrustup.vm.box_architecture = "arm64" if apple_silicon
    debianrustup.vm.provision "file", source: "./", destination: "/home/vagrant/try"
    debianrustup.vm.provision "shell", privileged: false, inline: "
      sudo apt-get update
      sudo apt-get install -y curl attr pandoc gcc make autoconf mergerfs
      sudo chown -R vagrant:vagrant try
      cd try
      mkdir rustup
      ./try -D rustup \"curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y\"
      ls -lah rustup/upperdir/home/vagrant/.cargo/bin

      rm -rf rustup
      autoconf && ./configure && make
      sudo make install
      which try-commit || exit 2

      mkdir rustup
      ./try -D rustup \"curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y\"
      ls -lah rustup/upperdir/home/vagrant/.cargo/bin
    "
  end

  # Regular debian testing box with LVM
  config.vm.define "debianlvm" do |debianlvm|
    debianlvm.vm.box = debian_box
    debianlvm.vm.box_architecture = "arm64" if apple_silicon
    debianlvm.vm.provision "file", source: "./", destination: "/home/vagrant/try"
    debianlvm.vm.provision "shell", privileged: false, inline: "
      sudo apt-get update
      sudo apt-get install -y git expect lvm2 mergerfs curl attr pandoc gcc make autoconf mergerfs

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

      autoconf && ./configure && make
      sudo make install
      which try-commit || exit 2
    "
  end

  config.vm.define "debianloginshell" do |debianloginshell|
    debianloginshell.vm.box = debian_box
    debianloginshell.vm.box_architecture = "arm64" if apple_silicon
    debianloginshell.vm.provision "file", source: "./", destination: "/home/vagrant/try"
    debianloginshell.vm.provision "shell", privileged: false, inline: <<-'SHELL'
      sudo apt-get update
      sudo apt-get install -y curl attr pandoc gcc make autoconf mergerfs zsh
      sudo chown -R vagrant:vagrant try
      cd try


      autoconf && ./configure && make
      sudo make install
      which try-commit || exit 2

      check_case() {
        try_shell="$1"
        shell="$2"
        expected_output="$3"
        case="$4"

        TRY="/usr/local/bin/try"

        expected="$(mktemp)"
        out="$(mktemp)"
        echo "$expected_output" >"$expected"
        TRY_SHELL="$try_shell" SHELL="$shell" "$TRY" 'echo $TRY_SHELL' >"$out" || exit 1

        if ! diff -q "$expected" "$out"; then
          exit "$case"
        fi

        rm "$expected"
        rm "$out"
      }

      username="$(whoami)"
      sudo chsh "$username" --shell=/usr/bin/zsh

      sudo chmod +x "/usr/bin/zsh"
      check_case "" "" "/usr/bin/zsh" "3"

      sudo chmod -x "/usr/bin/zsh"

      check_case "" "" "/bin/sh" "4"

      echo "Test Complete"
    SHELL
  end


  # Regular rocky testing box
  config.vm.define "rocky9" do |rocky|
    rocky.vm.box = "generic/rocky9"
    rocky.vm.provision "file", source: "./", destination: "/home/vagrant/try"
    rocky.vm.provision "shell", privileged: false, inline: "
      sudo yum install -y git expect curl attr pandoc fuse
      wget https://github.com/trapexit/mergerfs/releases/download/2.40.2/mergerfs-2.40.2-1.el9.x86_64.rpm
      sudo rpm -i mergerfs-2.40.2-1.el9.x86_64.rpm
      sudo chown -R vagrant:vagrant try
      cd try
      autoconf && ./configure && make
      sudo make install
      which try-commit || exit 2
    "
  end
  #
  # Regular rocky testing box
  config.vm.define "fedora39" do |fedora|
    fedora.vm.box = "generic/fedora39"
    fedora.vm.provision "file", source: "./", destination: "/home/vagrant/try"
    fedora.vm.provision "shell", privileged: false, inline: "
      sudo yum install -y git expect curl attr pandoc fuse
      wget https://github.com/trapexit/mergerfs/releases/download/2.40.2/mergerfs-2.40.2-1.fc39.x86_64.rpm
      sudo rpm -i mergerfs-2.40.2-1.fc39.x86_64.rpm
      sudo chown -R vagrant:vagrant try
      cd try
      autoconf && ./configure && make
      sudo make install
      which try-commit || exit 2
    "
  end
end
