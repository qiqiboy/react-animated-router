# react-router-nested-animation-transitions

react 路由切换动画，支持嵌套路由 (nested routers)。

### 如何使用

`PageAnimation`是一个标准的 React 组件，将它放入你的项目中，然后在需要支持动画的地方，使用`PageAnimation`替换你的`Switch`组件即可。

```javascript
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Route, Redirect, Switch, BrowserRouter } from 'react-router-dom';
import PageAnimation from 'components/PageAnimation'; //我们的PageAnimation组件

import Login from 'modules/Login';
import Signup from 'modules/Signup';

class App extends Component {
    render() {
        /** 你的代码如此，使用下方代替，即直接使用 pageAnimation 替换掉Switch
         * return (
         *  <Switch>
         *       <Route path="/login" component={Login} />
         *       <Route path="/signup" component={Signup} />
         *       <Redirect to="/login" />
         *   </Switch>
         * );
         **/

        return (
            <PageAnimation>
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Redirect to="/login" />
            </PageAnimation>
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
