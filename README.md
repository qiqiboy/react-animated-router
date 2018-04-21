# react-animated-router

react 路由切换动画，支持嵌套路由 (nested routers)。

### 安装

使用默认的切换效果（300ms 的左右滑动切换），可以直接通过 npm 安装：

```bash
npm install react-animated-router --save
```

如果想要自定义切换效果，可以 fork 本项目，然后自行修改动画时间和效果

### 如何使用

`AnimatedRouter`是一个标准的 React 组件，将它放入你的项目中，然后在需要支持动画的地方，使用`AnimatedRouter`替换你
的`Switch`组件即可。

| 属性          |              类型               | 描述                                                                                                                                                                      |
| ------------- | :-----------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| prefix        | 字符串，默认值`animated-router` | 应用到 CSSTransition 组件的 classNames 前缀。如果要在同一个项目中使用不同的动画，可以通过设置前缀来定义不同的动画。关于如何自定义动画，请查看下方说明                     |
| timeout       |           数字，可选            | 动画持续时间，可以不传，默认为监听 transitionend 时间来判断动画结束。如果有动画异常，可以尝试设置改值，需要注意的是，该值应该与动画样式中定义的过渡时间一致               |
| className     |          字符串，可选           | 如果传入 className 则会添加到动画节点所在容器节点上                                                                                                                       |
| transitionKey |          字符串，可选           | 即每个页面节点需要的 key 值，如果不传则会使用当前页面地址的 pathname。<br/>该属性可以用于处理路由页面中还有子路由时的情况，用来避免子路由切换会导致父级页面也一块被重载。 |

> 例如，可以对父级路由使用 AnimatedRouter 时定义使用父级路由 path 当作 key:
> transitionKey={this.props.location.pathname.split('/').slice(0, 2).join('/')}

```javascript
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Route, Redirect, Switch, BrowserRouter } from 'react-router-dom';
import AnimatedRouter from 'react-animated-router'; //导入我们的的AnimatedRouter组件
import 'react-animated-router/animate.css'; //导入默认的切换动画样式，如果需要其它切换样式，可以导入自己的动画样式定义文件

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

### 自定义动画

如果不希望使用左右滑入动画，则可以自定义自己的路由动画。可以将默认的 animated.scss 复制进自己的项目，然后修改不同阶段的样式值即可。

页面分为前进和后退，两者分别会应用不同的 classNames 到`react-transition-group`的[CSSTransition](http://reactcommunity.org/react-transition-group/css-transition)组件。关于 classNames 的更多用法，请参考官方文档。

默认的 classNames 如下，如果你设置了 prefix，则名称会变为 `{prefix}-forward` / `{prefix}-backward`。

| classNames               |        类型        |
| ------------------------ | :----------------: |
| animated-router-forward  | 页面前进时动画效果 |
| animated-router-backward | 页面后退时动画效果 |

---

更多说明以及我在探索路由动画应用中所遇到的坑，可以阅读我的[博客文章](http://www.qiqiboy.com/post/111)。
