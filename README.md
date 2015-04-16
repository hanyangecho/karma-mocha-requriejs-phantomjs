# karma-mocha-chai-requriejs-phantomjs
karma moch requirejs phantomjs test
使用karma+mocha进行前端单元测试
==================================
## 知识点

1. 学习使用测试框架 karma : http://karma-runner.github.io/0.8/intro/installation.html
2. 学习使用测试框架 mocha : http://mochajs.org/
3. 学习使用断言库 chai : http://chaijs.com/api/bdd/
4. 学习使用测试率覆盖工具 istanbul : https://github.com/gotwarlost/istanbul
5. 简单 Makefile 的编写 : http://blog.csdn.net/haoel/article/details/2886

下面一步一步进行介绍：

###1、第一步，新建一个文件夹
```bash
$ mkdir ut-karma && cd ut-karma
```
npm初始化
```bash
$ npm init
```
对npm基本操作不是很了解，请看这里[npm]
根据自己情况进行设置，初始化之后，文件夹会新增一个package.json
我的文件刚建好是下面这样的:
```javascript
{
  "name": "karma",
  "version": "0.1.0",
  "description": "unit test",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "test"
  ],
  "author": "hanyangecho",
  "license": "ISC"
}
```
scripts之后会有用到，这里先去掉：
```javascript
{
  "name": "karma",
  "version": "0.1.0",
  "description": "unit test",
  "main": "index.js",
  "keywords": [
    "test"
  ],
  "author": "hanyangecho"
}
```
###2、安装karma框架
```bash
$ npm install karma -D
```
由于仅仅是测试使用，所以就直接配置到devDependencies，而不是dependencies

配置如下：
```javascript
{
  "name": "karma",
  "version": "0.1.0",
  "description": "unit test",
  "main": "index.js",
  "keywords": [
    "test"
  ],
  "author": "hanyangecho",
  "devDependencies": {
    "karma": "^0.12.32"
  }
}
```
直接安装：
```bash
$ npm install
```
###3、karma初始化
由于都是本地安装，需要取本地路径
```bash
./node_modules/karma/bin/karma init
```
由于路径比较长，太难记了，反正我是记不住。还记得上面提到过`scripts`，这里可以配上用场了：
```javascript
{
  "name": "karma",
  "version": "0.1.0",
  "description": "unit test",
  "main": "index.js",
  "keywords": [
    "test"
  ],
  "scripts": {
      "karma-init": "./node_modules/karma/bin/karma init"
  },
  "author": "hanyangecho",
  "devDependencies": {
    "karma": "^0.12.32",
    "karma-chrome-launcher": "^0.1.7",
    "karma-mocha": "^0.1.10",
    "karma-requirejs": "^0.2.2",
    "mocha": "^2.2.4",
    "requirejs": "^2.1.17"
  }
}
```
这样只需要输入如下命令即可：
```bash
$ npm run karma-init
```
觉得上面命令输入还是有点长，好吧！那就再短点。
新增一个Makefile文件，添加如下内容：
```bash
init:   
    ./node_modules/karma/bin/karma init
.PHONY: init
```
至于make命令和Makefile的介绍，请看这里[make]和[Makefile]，两位大神。
好了，现在这样就可以搞定了：
```bash
$ make init
```
好了，终于可以初始化了。按照提示一步一步往下，这里有几步需要注意：

第一步，选择`mocha`

第二步，选择`yes`

第六步，
```bash
Do you wanna generate a bootstrap file for RequireJS?
```
选择`yes`。
其他都默认即可。
初始化之后，根目录下会新增两个文件：
* `karma.conf.js` &mdash; Karma配置文件
* `test-main.js` &mdash; Require.js测试配置文件
注意一下`package.json`或者`node_modules`目录，发现新增了几个模块
```javascript
{
  "name": "karma",
  "version": "0.1.0",
  "description": "unit test",
  "main": "index.js",
  "keywords": [
    "test"
  ],
  "scripts": {
      "karma-init": "./node_modules/karma/bin/karma init"
  },
  "author": "hanyangecho",
  "devDependencies": {
    "karma": "^0.12.32",
    "karma-chrome-launcher": "^0.1.7",
    "karma-mocha": "^0.1.10",
    "karma-requirejs": "^0.2.2",
    "mocha": "^2.2.4",
    "requirejs": "^2.1.17"
  }
}
```
###4、mocha初始化
新增文件，目录结构如下：
```bash
.
|-- index.html
|-- Makefile
|-- package.json
|-- karma.conf.js
|-- lib
|   |-- require.js
|-- src
|   |-- app.js
|   |-- main.js
|-- test
    |-- appSpec.js
    |-- test-main.js

```
mocha初始化
```bash
$ ./node_modules/.bin/mocha init lib
```
自己看了，放到`scripts`或者`Makefile`下都可以，因为就用一次，所以我这里就不放了。
为什么要初始化`lib`呢？仅仅是为了获取`mocha.js`。好吧！其他文件都可以删除了。现在是这样的：
```bash
.
|-- index.html
|-- Makefile
|-- package.json
|-- karma.conf.js
|-- lib
|   |-- require.js
|   |-- mocha.js
|-- src
|   |-- app.js
|   |-- main.js
|-- test
    |-- appSpec.js
    |-- test-main.js

```
###4、断言库-chai
```bash
$ npm install karma-chai -D
```
把`node_modules`下的chai.js拷贝到lib下。
chai直接在Object扩展断言，详细接口见这里[chai]。
###5、配置
karma配置文件
* `karma.conf.js` &mdash; Karma配置文件
`karma`配置文件，重点介绍几个属性，其他默认就可以：
```javascript
basePath 基础路径
frameworks 使用框架，这里使用mocha和requirejs
files 这个很重要，karma框架启动要加载的文件和监视的文件，可以是字符串或者模式匹配的对应
```
配置如下：
```javascript
config.set({
    basePath: '',
    frameworks: ['mocha', 'requirejs'],
    files: [
        {pattern: 'lib/**/*.js', included: false},
        {pattern: 'src/**/*.js', included: false},
        {pattern: 'test/**/*Test.js', included: false},
        'test/test-main.js'
    ],
    exclude: [
        'src/main.js'
    ],
    preprocessors: {
    },
    // possible values: 'dots', 'progress'
    reporters: ['progress'],
    port: 9876,
    colors: true,
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
```
`Requir.js`配置文件：
* `test-main.js` &mdash; Require.js测试配置文件
配置如下：
```javascript
require.config({
  baseUrl: '/base',
  paths: {
      'chai': 'lib/chai',
      'mocha': 'lib/mocha'
  },
  deps: allTestFiles,
  callback: window.__karma__.start
});
```
###6、启动测试
fibonacci.js：
```javascript
define(function () {
    function fibonacci(n) {
        if (n === 1) {
            return 1;
        }
        if (n === 0) {
            return 0;
        }
        return fibonacci(n - 1) + fibonacci(n - 2);
    }

    return fibonacci;
});
```
fibonacciTest.js
```javascript
define(['src/fibonacci', 'mocha', 'chai'], function (fb, mocha, chai) {
    var should = chai.should();
    describe('test fibonacci', function () {
        it('should equal 55 when n === 10', function () {
            fb(10).should.equal(55);
        });
    });
});
```
index.html
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Karma example setup with Require.js</title>
  </head>

  <body>
  </body>
  <script src="lib/require.js"></script>
  <script type="text/javascript">
  requirejs.config({
    baseUrl: '.',
    paths: {
        'chai': 'lib/chai',
        'mocha': 'lib/mocha'
    }
  });
  require(['src/main']);
  </script>
</html>
```
在`Makefile`文件中新增如下代码：
```bash
start:
    ./node_modules/karma/bin/karma start
```
运行：
```bash
make start
```
chrom启动了，命令行中多了一行：
```bash
Chrome 41.0.2272 (Mac OS X 10.10.2): Executed 1 of 1 SUCCESS (0.004 secs / 0.001 secs)
```
我们再测试一下失败的场景。我们在fibonacciTest.js增加一条case:
```javascript
it('should equal 55 when n === 9', function () {
    fb(9).should.equal(55);
});
```
保存之后立即触发测试，命令行现在显示的应该是下面这样的：
![](https://github.com/hanyangecho/karma-mocha-requriejs-phantomjs/blob/master/img/106.pic.jpg)

####TDD/BDD
既然是TDD，抑或BDD，我们就让测试先行。
fibonacci 函数的几个要求:
```
* 当 n === 0 时，返回 0；n === 1时，返回 1;
* n > 1 时，返回 `fibonacci(n) === fibonacci(n-1) + fibonacci(n-2)`，如 `fibonacci(10) === 55`;
* n 也不可小于 0，否则抛错，因为没意义。
* n 不为数字时，抛错。
```
根据上述要求增加如下测试用例：
```javascript
define(['src/fibonacci', 'mocha', 'chai'], function (fb, mocha, chai) {
    var should = chai.should();
    describe('test fibonacci', function () {
        it('should equal 55 when n === 10', function () {
            fb(10).should.equal(55);
        });

        it('should equal 0 when n === 0', function () {
            fb(0).should.equal(0);
        });

        it('should equal 1 when n === 1', function () {
            fb(1).should.equal(1);
        });

        it('should throw when n < 0', function () {
            (function () {
                fb(-1);
            }).should.throw('n should >= 0');
        });

        it('should throw when n isnt Number', function () {
            (function () {
                fb('hr');
            }).should.throw('n should be a Number');
        });
    });
});
```
发现有两个失败的case。那就修改一下`fibonacci.js`，让所有的测试通过。
```javascript
define(function () {
    function fibonacci(n) {
        if (typeof n !== 'number') {
            throw new Error('n should be a Number');
        }
        if (n < 0) {
            throw new Error('n should >= 0');
        }
        if (n > 10) {
            throw new Error('n should <= 10');
        }
        if (n === 0) {
            return 0;
        }
        if (n == 1) {
            return 1;
        }
        return fibonacci(n-1) + fibonacci(n-2);
    };

    return fibonacci;
});
```
好吧！所有测试好像又都通过了。是不是该结束了？
###7、phantomjs
我就不想启动浏览器，就像在命令行中查看。每次提交代码就可以在命令行中查看到所有测试运行结果。好吧！那就继续。
```bash
npm install mocha-phantomjs -D
```
```
PhantomJS是一个使用JavaScript或CoffeeScript可编程无界面的Webkit，它够快，且原生支持Dom、CSS、selector、JSON、Canvas以及SVG等，因此对于前端开发人员而言入门门槛较低。而且还支持常见的测试套件，如Jasmine、QUnit、Mocha等等。
```
index.html修改为：
```javascript
require(['src/main', 'mocha'], function (app) {
    console.log(window.mocha);
    window.mocha.setup('bdd');
    require(['test/main'], function () {
        console.log(window.mochaPhantomJS);
        if (window.mochaPhantomJS) {
          window.mochaPhantomJS.run();
        } else {
          window.mocha.run();
        }
    });
});
```
修改`Makefile`增加如下内容：
```bash
test:
    ./node_modules/.bin/mocha-phantomjs index.html
```
运行一下：
```bash
make test
```
结果如下：
![](https://github.com/hanyangecho/karma-mocha-requriejs-phantomjs/blob/master/img/108.pic.jpg)
###7、istanbul
现在看一下代码覆盖率，`istanbul`在`karma`中叫`karma-coverage`
```bash
npm install karma-coverage -D
```
修改`karma.conf.js`:
```javascript
// 覆盖src下所有js文件
preprocessors: {
    'src/**/*.js': 'coverage'
},
// 报告目录在coverage下，html格式
coverageReporter: {
    type: 'html',
    dir: 'coverage/'
},
reporters: ['progress', 'coverage']
```
配置`Makefile`：
```bash
open: 
    open ./coverage/Chrome\ 41.0.2272\ \(Mac\ OS\ X\ 10.10.2\)/index.html
```
打开覆盖率页面：
```bash
make open
```
![](https://github.com/hanyangecho/karma-mocha-requriejs-phantomjs/blob/master/img/111.pic.jpg)

好了。全部结束。

[chai]:http://chaijs.com/api/bdd/
[Require.js]: http://requirejs.org/
[npm]:http://javascript.ruanyifeng.com/nodejs/npm.html
[make]:http://www.ruanyifeng.com/blog/2015/02/make.html
[Makefile]:http://blog.csdn.net/haoel/article/details/2886

