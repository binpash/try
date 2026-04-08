use std::thread;

fn main() {
    // Using a thread here because we can't edit the uid/gid of the current process
    let handler = thread::spawn(|| {
        let usage = "Usage: gidmapper targetpid outeruid inneruid uidcount outergid innergid uidcount";
        let targetpid = std::env::args().nth(1).expect(usage);
        let outeruid = std::env::args().nth(2).expect(usage);
        let inneruid = std::env::args().nth(3).expect(usage);
        let uidcount = std::env::args().nth(4).expect(usage);
        let outergid = std::env::args().nth(5).expect(usage);
        let innergid = std::env::args().nth(6).expect(usage);
        let gidcount = std::env::args().nth(7).expect(usage);

        // If mapping a user that's not the current user, then sudo is required
        let uid_map = format!("{} {} {}", outeruid, inneruid, uidcount);
        // Requires cap_setgid
        let gid_map = format!("{} {} {}", outergid, innergid, gidcount);

        let uid_path = format!("{}{}{}", "/proc/",targetpid,"/uid_map");
        let gid_path = format!("{}{}{}", "/proc/",targetpid,"/gid_map");

        std::fs::write(uid_path, uid_map)
            .expect("unable to write uid_map file");
        std::fs::write(gid_path, gid_map)
            .expect("unable to write gid_map file");
        });

    handler.join().unwrap();
}
