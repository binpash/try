Vagrant.configure("2") do |config|

  #Reguar debian testing box
  config.vm.define "debian" do |debian|
    debian.vm.box = "debian/testing64"
    debian.vm.provision "file", source: "./", destination: "/home/vagrant/try"
    debian.vm.provision "shell", privileged: false, inline: "
      sudo apt update
      sudo apt install -y git expect
      sudo chown -R vagrant:vagrant try
      cd try
      TRY_TOP=$(pwd) bash test/run_tests.sh"
  end

  # Reguar debian testing box with LVM
  config.vm.define "debianlvm" do |debianlvm|
    debianlvm.vm.box = "debian/testing64"
    debianlvm.vm.provision "file", source: "./", destination: "/home/vagrant/try"
    debianlvm.vm.provision "shell", privileged: false, inline: "
      sudo apt update
      sudo apt install -y git expect lvm2 mergerfs

      sudo fallocate -l 2G /root/lvm_disk.img
      sudo losetup /dev/loop0 /root/lvm_disk.img
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
      TRY_TOP=$(pwd) bash test/run_tests.sh"
  end

  #Reguar rocky testing box
  config.vm.define "rocky" do |rocky|
    rocky.vm.box = "generic/rocky9"
    rocky.vm.provision "file", source: "./", destination: "/home/vagrant/try"
    rocky.vm.provision "shell", privileged: false, inline: "
      sudo yum update
      sudo yum install -y git expect
      sudo chown -R vagrant:vagrant try
      cd try
      TRY_TOP=$(pwd) bash test/run_tests.sh"
  end

  # Reguar rocky testing box with LVM
  config.vm.define "rocky9lvm" do |rocky9lvm|
    rocky9lvm.vm.box = "generic/rocky9"
    rocky9lvm.vm.provision "file", source: "./", destination: "/home/vagrant/try"
    rocky9lvm.vm.provision "shell", privileged: false, inline: "
      sudo yum update
      sudo yum install -y git expect lvm2 mergerfs

      sudo fallocate -l 2G /root/lvm_disk.img
      sudo losetup /dev/loop0 /root/lvm_disk.img
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
      TRY_TOP=$(pwd) bash test/run_tests.sh"
  end
end
