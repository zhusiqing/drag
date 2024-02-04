# drag

让元素支持拖拽移动

## 安装

```bash
# npm
npm i drag-utils-simple
# yarn
yarn add drag-utils-simple
# pnpm
pnpm add drag-utils-simple
```

## 用法

```javascript
import Drag from 'drag-utils-simple';
const div = document.createElement('div');
div.innerHTML = 'move element';
new Drag(div);
```

## 配置参数

#### options?.top | options?.left : string

设置元素的初始位置，默认为元素当前位置

```javascript
import Drag from 'drag-utils-simple';
const div = document.createElement('div');
div.innerHTML = 'move element';
new Drag(div, {
  top: '100px',
  left: '100px'
});
```

#### options?.zIndex : number

设置元素的层级（fixed），默认为99

```javascript
import Drag from 'drag-utils-simple';
const div = document.createElement('div');
div.innerHTML = 'move element';
new Drag(div, {
  top: '100px',
  left: '100px',
  zIndex: 9999
});
```

#### options?.onClick : Function

设置元素的点击事件

```javascript
import Drag from 'drag-utils-simple';
const div = document.createElement('div');
div.innerHTML = 'move element';
new Drag(div, {
  top: '100px',
  left: '100px',
  zIndex: 9999,
  onClick: (e) => {
    console.log(e)
  }
});
```

## 只读属性

#### el

当前绑定元素

#### options : OptionsType

当前配置

```ts
interface OptionsType {
  top?: string;
  left?: string;
  zIndex?: number;
  onClick?: Function;
}
```

#### env : 'mobile' | 'pc'

当前环境

## 方法

#### reset

重置为初始状态

**示例**

```javascript
import Drag from 'drag-utils-simple';
const div = document.createElement('div');
div.innerHTML = 'move element';
const drag = new Drag(div, {
  top: '100px',
  left: '100px',
  zIndex: 9999,
  onClick: (e) => {
    console.log(e)
  }
});
setTimeout(() => {
  drag.reset();
}, 3000);
```

#### destroy

销毁当前元素绑定的相关拖拽事件和点击事件

**示例**

```javascript
import Drag from 'drag-utils-simple';
const div = document.createElement('div');
div.innerHTML = 'move element';
const drag = new Drag(div, {
  top: '100px',
  left: '100px',
  zIndex: 9999,
  onClick: (e) => {
    console.log(e)
  }
});
setTimeout(() => {
  drag.destroy();
}, 3000);
```

#### register

重新注册当前元素的相关拖拽事件和点击事件

> 常常用于destroy()后

**示例**

```javascript
import Drag from 'drag-utils-simple';
const div = document.createElement('div');
div.innerHTML = 'move element';
const drag = new Drag(div, {
  top: '100px',
  left: '100px',
  zIndex: 9999,
  onClick: (e) => {
    console.log(e)
  }
});
setTimeout(() => {
  drag.destroy();
  setTimeout(() => {
    drag.register();
  }, 1000);
}, 3000);
```
