Here is a TypeScript solution for the problem:

```typescript
class FileSystem {
    root: Dir;

    constructor() {
        this.root = new Dir();
    }

    mkdir(path: string): void {
        let dirs = path.split("/");
        let cur = this.root;
        for (let dir of dirs) {
            if (!cur.dirs[dir]) {
                cur.dirs[dir] = new Dir();
            }
            cur = cur.dirs[dir];
        }
    }

    ls(path: string): string[] {
        let dirs = path.split("/");
        let cur = this.root;
        let name = "";
        for (let dir of dirs) {
            if (dir.length === 0) continue;
            if (cur.files[dir]) {
                return [dir];
            }
            name = dir;
            cur = cur.dirs[dir];
        }
        let res = Object.keys(cur.dirs).concat(Object.keys(cur.files));
        res.sort();
        return res;
    }

    addContentToFile(filePath: string, content: string): void {
        let dirs = filePath.split("/");
        let cur = this.root;
        for (let i = 0; i < dirs.length - 1; i++) {
            let dir = dirs[i];
            if (dir.length === 0) continue;
            cur = cur.dirs[dir];
        }
        let file = dirs[dirs.length - 1];
        if (!cur.files[file]) {
            cur.files[file] = new File();
        }
        cur.files[file].content += content;
    }

    readContentFromFile(filePath: string): string {
        let dirs = filePath.split("/");
        let cur = this.root;
        for (let i = 0; i < dirs.length - 1; i++) {
            let dir = dirs[i];
            if (dir.length === 0) continue;
            cur = cur.dirs[dir];
        }
        let file = dirs[dirs.length - 1];
        return cur.files[file].content;
    }
}

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

let fs = new FileSystem();
fs.mkdir("/a/b/c");
fs.addContentToFile("/a/b/c/d", "hello");
console.log(fs.ls("/"));
console.log(fs.ls("/a/b"));
console.log(fs.readContentFromFile("/a/b/c/d"));
```

This solution uses a tree structure to simulate the file system. Each node in the tree is either a directory or a file. The `FileSystem` class provides methods to create directories (`mkdir`), list contents (`ls`), add content to a file (`addContentToFile`), and read content from a file (`readContentFromFile`). The `Dir` and `File` classes represent directories and files, respectively.