Here is a simple JavaScript console application that simulates a simplified file system:

```javascript
class FileSystem {
    constructor() {
        this.root = {};
    }

    mkdir(path) {
        let node = this.root;
        path.split('/').filter(Boolean).forEach(dir => {
            if (!node[dir]) node[dir] = {};
            node = node[dir];
        });
    }

    ls(path) {
        let node = this.root;
        const dirs = path.split('/').filter(Boolean);
        for (let i = 0; i < dirs.length; i++) {
            node = node[dirs[i]];
        }
        if (typeof node === 'string') return [dirs.pop()];
        return Object.keys(node).sort();
    }

    addContentToFile(filePath, content) {
        let node = this.root;
        const dirs = filePath.split('/').filter(Boolean);
        const file = dirs.pop();
        for (let i = 0; i < dirs.length; i++) {
            if (!node[dirs[i]]) node[dirs[i]] = {};
            node = node[dirs[i]];
        }
        node[file] = node[file] ? node[file] + content : content;
    }

    readContentFromFile(filePath) {
        let node = this.root;
        const dirs = filePath.split('/').filter(Boolean);
        const file = dirs.pop();
        for (let i = 0; i < dirs.length; i++) {
            node = node[dirs[i]];
        }
        return node[file] || '';
    }
}

const fs = new FileSystem();
fs.mkdir('/a/b/c');
fs.addContentToFile('/a/b/c/d', 'hello');
console.log(fs.ls('/a/b/c')); // ['d']
console.log(fs.readContentFromFile('/a/b/c/d')); // 'hello'
```

This application uses a JavaScript object to simulate a file system, where each key-value pair represents a directory or a file. The `mkdir` method creates directories, the `ls` method lists files and directories, the `addContentToFile` method creates or appends content to a file, and the `readContentFromFile` method reads content from a file.