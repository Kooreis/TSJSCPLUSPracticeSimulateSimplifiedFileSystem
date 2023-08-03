class Dir {
    dirs: { [key: string]: Dir };
    files: { [key: string]: File };

    constructor() {
        this.dirs = {};
        this.files = {};
    }
}

class File {
    content: string;

    constructor() {
        this.content = "";
    }
}