var http = require('http');
var fs = require('fs');
var server = http.createServer(function (req, res) {
    var fileName = './public/index.html';
    fs.exists(fileName, function (exists) {
        if (exists) {
            fs.stat(fileName, function (error, stats) {
                fs.open(fileName, "r", function (error, fd) {
                    var buffer = new Buffer(stats.size);

                    fs.read(fd, buffer, 0, buffer.length, null, function (error, bytesRead, buffer) {
                        var data = buffer.toString("utf8", 0, buffer.length);
                        res.writeHead(200, {"Content-Type": "text/html"});
                        res.end(data);

                        fs.close(fd);
                    });
                });
            });
        }
    });
});
server.listen(3000);
console.log('server running...')
