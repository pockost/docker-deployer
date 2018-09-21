dockerfileTemplate = require("dockerfile-template");
fs = require("fs")

function Dockerfile(php_version, os) {
    this.php_version = php_version,
    this.os = os,
    this.path = function() {
        return this.php_version + "/" + this.os
    },
    this.variables = function() {
        return {
            TAG: this.php_version + "-cli-" + this.os
        }
    }
}

var dockerfiles = [
    new Dockerfile('7.2', 'alpine3.8'),
    new Dockerfile('7.2', 'alpine3.7'),
    new Dockerfile('7.2', 'alpine3.6'),
    new Dockerfile('7.1', 'alpine3.8'),
    new Dockerfile('7.1', 'alpine3.7'),
    new Dockerfile('7.0', 'alpine3.7'),
    new Dockerfile('5.6', 'alpine3.8'),
    new Dockerfile('5.6', 'alpine3.7'),
]

var template = `FROM php:%%TAG%%

WORKDIR /app

RUN apk add --no-cache tzdata bash curl

COPY entrypoint.sh /usr/local/bin/

RUN chmod o+x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]

CMD ["dep"]`

dockerfiles.forEach(function(element) {
    fs.mkdir(element.php_version, function() {
        fs.mkdir(element.path(), function() {
            file_content = dockerfileTemplate.process(template, element.variables())
            fs.appendFile(element.path() + "/Dockerfile", file_content, function() {
              fs.copyFile("entrypoint.sh", element.path() + "/entrypoint.sh", function() {})
            })
        })
    })
});
