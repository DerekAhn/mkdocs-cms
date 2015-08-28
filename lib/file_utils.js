var utils = {

  find: function(page) {
    return new Promise(function(resolve, reject) {
      var html = _.isUndefined(page.html)? page.all : page.html;

      _.forEach(page.all.pages || page.all, function(object) {
        _.forIn(object, function(array, section) {
          _.forEach(array, function(obj) {
            _.forIn(obj, function(path, url) {
              if (_.isArray(path)) {
                _.forEach(path, function(_obj) {
                  _.forIn(_obj, function(_path, _url) {
                    
                    if ( _.isEqual(_url.toLowerCase(), page.url.toLowerCase().split('_').join(' ')) ) {
                      resolve({ path: _path, section: _url, content: html });
                    }

                  });
                });
              } else {

                if ( _.isEqual(url.toLowerCase(), page.url.toLowerCase().split('_').join(' ')) ) {
                  resolve({ path: path, section: url, content: html });
                }
                
              }
            });
          });
        });
      });

      reject('Could not associate path');
    });
  },

  mkdir: function(body) {
    return new Promise(function(resolve, reject) {
      var path = body.path? _.snakeify(body.path)+'/'+_.snakeify(body.name): _.snakeify(body.name);

      require('mkdirp')(env.MKDOCS + path +'/', function(err) {
        err? reject(err) : resolve(body);
      });
    });
  },

  rm: function(obj) {
    return new Promise(function(resolve, reject) {
      require('remove')(_.formatPath(obj, true), function(err) {
        err? reject(err) : resolve(obj);
      });
    });
  },

  read: function(file) {
    return new Promise(function(resolve, reject) {
      require('read-file')(env.MKDOCS+ file.path, 'utf8', function(err, buffer) {
        err? reject(err) : resolve(buffer);
      });
    });
  },

  write: function(obj) {
    return new Promise(function(resolve, reject) {
      require('fs').writeFile(_.formatPath(obj, true), _.hasContent(obj), function(err) {
        err? reject(err) : resolve(obj);
      });
    });
  },

  validate: function(obj) {
    return new Promise(function(resolve, reject) {
      _.forEach(_.onlyConfig(obj.all).pages, function(section) {
        _.forIn(section, function(pages, key) {

          if (_.has(obj, 'section')) {
            if (_.has(obj, 'path')) {
              if (_.isEqual(key, _.startCase(obj.path))) {
                _.forEach(pages, function(tertiary) {
                  if (_.has(tertiary, _.startCase(obj.name))) {
                    reject('That sub-section already exists!');
                  }
                });
              }
            } else {
              if (_.isEqual(key, _.startCase(obj.name))) {
                reject('That section already exists!');
              }
            }
          } else {
            if (_.isTertiary(obj.path)) {
              _.forEach(pages, function(subDirectory) {
                _.forIn(subDirectory, function(tertiary) {
                  if (_.isArray(tertiary)) {
                    _.forEach(subDirectory, function(name) {
                      if ( _.has(name, _.startCase(obj.name)) ) {
                        reject('A page in that section already exists!');
                      };
                    });
                  }
                });
              });
            } else {
              if ( _.isEqual(_.startCase(obj.path), key) ) {
                _.forEach(pages, function(name) {
                  if ( _.has(name, _.startCase(obj.name)) ) {
                    reject('A page in that section already exists!');
                  };
                });
              }
            }
          }
        });
      });

      resolve(obj);
    });
  },

  build: function(cmd) {
    return new Promise(function(resolve, reject) {
      require('child_process').exec(cmd, function(err, out, code) {
        resolve(code);
      });
    });
  },

  zip: function() {
    return new Promise(function(resolve, reject) {
      require('zip-dir')(env.MKDOCS_SITE, function(err, buffer) {
        err? reject(err) : resolve(buffer);
      });
    });
  }

};


module.exports = utils;