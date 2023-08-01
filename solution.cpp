```cpp
#include <iostream>
#include <map>
#include <vector>
#include <algorithm>

using namespace std;

class FileSystem {
    map<string, map<string, int>> dirs;
    map<string, string> files;
public:
    FileSystem() {
        dirs[""];
    }

    vector<string> ls(string path) {
        if (files.count(path)) {
            int idx = path.find_last_of('/');
            return {path.substr(idx + 1)};
        }
        auto m = dirs[path];
        vector<string> res(m.begin(), m.end());
        return res;
    }

    void mkdir(string path) {
        istringstream is(path);
        string t = "", dir;
        while (getline(is, dir, '/')) {
            if (dir.empty()) continue;
            if (t.empty()) t += "/" + dir;
            else t += dir;
            dirs[t];
        }
    }

    void addContentToFile(string filePath, string content) {
        int idx = filePath.find_last_of('/');
        string dir = filePath.substr(0, idx);
        string file = filePath.substr(idx + 1);
        if (!dir.empty()) mkdir(dir);
        files[filePath].append(content);
    }

    string readContentFromFile(string filePath) {
        return files[filePath];
    }
};

int main() {
    FileSystem fs;
    fs.mkdir("/a/b/c");
    fs.addContentToFile("/a/b/c/d", "hello");
    vector<string> res1 = fs.ls("/a/b/c");
    for (string s : res1) {
        cout << s << " ";
    }
    cout << endl;
    string res2 = fs.readContentFromFile("/a/b/c/d");
    cout << res2 << endl;
    return 0;
}
```