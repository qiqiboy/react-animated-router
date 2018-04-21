# react-animated-router

react 路由切换动画，支持嵌套路由 (nested routers)。

### 如何使用

`AnimatedRouter`是一个标准的 React 组件，将它放入你的项目中，然后在需要支持动画的地方，使用`AnimatedRouter`替换你
的`Switch`组件即可。

| 属性          |     类型     | 描述                                                                                                                                                                      |
| ------------- | :----------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| className     | 字符串，可选 | 如果传入 className 则会添加到动画节点所在容器节点上                                                                                                                       |
| transitionKey | 字符串，可选 | 即每个页面节点需要的 key 值，如果不传则会使用当前页面地址的 pathname。<br/>该属性可以用于处理路由页面中还有子路由时的情况，用来避免子路由切换会导致父级页面也一块被重载。 |

> 例如，可以对父级路由使用AnimatedRouter时定义使用父级路由path当作key: transitionKey={this.props.location.pathname.split('/').slice(0, 2).join('/')}

```javascript
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Route, Redirect, Switch, BrowserRouter } from 'react-router-dom';
import AnimatedRouter from 'react-animated-router'; //我们的AnimatedRouter组件

import Login from 'modules/Login';
import Signup from 'modules/Signup';

class App extends Component {
    render() {
        /** 假如你的代码如此，则可直接使用最下方代码代替，即直接使用 AnimatedRouter 替换掉Switch
         * return (
         *  <Switch>
         *       <Route path="/login" component={Login} />
         *       <Route path="/signup" component={Signup} />
         *       <Redirect to="/login" />
         *   </Switch>
         * );
         **/

        return (
            <AnimatedRouter>
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Redirect to="/login" />
            </AnimatedRouter>
        );
    }
}

render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.querySelector('#root')
);
```

更多说明以及我在探索路由动画应用中所遇到的坑，可以阅读我的[博客文章](http://www.qiqiboy.com/post/111)。
