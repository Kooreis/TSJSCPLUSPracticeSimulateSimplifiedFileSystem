mkdir(path) {
        let node = this.root;
        path.split('/').filter(Boolean).forEach(dir => {
            if (!node[dir]) node[dir] = {};
            node = node[dir];
        });
    }