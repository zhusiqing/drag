# interface-bridge

字段适配器，解决前后端接口之间字段映射问题。

## 安装

```bash
# npm
npm i interface-bridge
# yarn
yarn add interface-bridge
# pnpm
pnpm add interface-bridge
```

## 用法

```javascript
import InterfaceBridge from 'interface-bridge';
const map = {
  frontendField: 'backendField',
  left: 'right'
}

const bridge = new InterfaceBridge(map, {
  // 默认为false, 设置未true后将过滤掉非映射关系中的字段
  isExact: false
})
interface HandleDataType {
  backendField: string;
  right: number;
}
bridge.pickData<HandleDataType>({
  frontendField: '123',
  left: 321
})
/*
{
  backendField: "123"
  right: 321
}
*/
```

## 配置参数

#### options.isExact: boolean

默认为false, 设置为true后将过滤掉非映射关系中的字段

```javascript
import InterfaceBridge from 'interface-bridge';
const map = {
  frontendField: 'backendField',
  left: 'right'
}

const bridge = new InterfaceBridge(map, {
  // 默认为false, 设置未true后将过滤掉非映射关系中的字段
  isExact: true
})
interface HandleDataType {
  backendField: string;
  right: number;
  test?: number
}
bridge.pickData<HandleDataType>({
  frontendField: '123',
  left: 321,
  test: 123
})
/*
{
  backendField: "123",
  right: 321
}
*/
const bridge = new InterfaceBridge(map, {
  isExact: false
})
bridge.pickData<HandleDataType>({
  frontendField: '123',
  left: 321,
  test: 123
})
/*
{
  backendField: "123",
  right: 321,
  test: 123
}
*/
```

## 方法

#### omitData\<T\>(data, keys): T

将前端的数据转换成后端要的数据

|参数名|类型|必选|说明|
|:---- |:--   |:---|:----- |
|data |object| 是 | 第几页，默认 1 |
|keys |string[]| 否 | 过滤掉的数据，注意是转换后的数据的key值 |

> 返回值: `object` 转换后的数据

**示例**

```javascript
import InterfaceBridge from 'interface-bridge';
const map = {
  frontendField: 'backendField',
  left: 'right',
  abc: 'ABC'
}

const bridge = new InterfaceBridge(map)

bridge.omitData({
  frontendField: '123',
  left: 321
})
/*
{
  backendField: "123",
  right: 321,
  ABC: undefined
}
*/
bridge.omitData({
  frontendField: '123',
  left: 321
}, ['ABC'])
/*
{
  backendField: "123",
  right: 321
}
*/
```

#### omitReverseData\<T\>(data, keys): T

将后端的数据转换成前端要的数据

|参数名|类型|必选|说明|
|:---- |:--   |:---|:----- |
|data |object| 是 | 第几页，默认 1 |
|keys |string[]| 否 | 过滤掉的数据，注意是转换后的数据的key值 |

> 返回值: `object` 转换后的数据

**示例**

```javascript
import InterfaceBridge from 'interface-bridge';
const map = {
  frontendField: 'backendField',
  left: 'right',
  abc: 'ABC'
}

const bridge = new InterfaceBridge(map)

bridge.omitReverseData({
  backendField: '123',
  right: 321
})
/*
{
  frontendField: "123",
  left: 321,
  abc: undefined
}
*/
bridge.omitReverseData({
  backendField: '123',
  right: 321
}, ['abc'])
/*
{
  frontendField: "123"
  left: 321
}
*/
```

#### pickData\<T\>(data, keys): T

将前端的数据转换成后端要的数据

|参数名|类型|必选|说明|
|:---- |:--   |:---|:----- |
|data |object| 是 | 第几页，默认 1 |
|keys |string[]| 否 | 需要的数据，注意是转换后的数据的key值 |

> 返回值: `object` 转换后的数据

**示例**

```javascript
import InterfaceBridge from 'interface-bridge';
const map = {
  frontendField: 'backendField',
  left: 'right',
  abc: 'ABC'
}

const bridge = new InterfaceBridge(map)

bridge.pickData({
  frontendField: '123',
  left: 321
})
/*
{
  ABC: undefined,
  backendField: "123",
  right: 321
}
*/
bridge.pickData({
  frontendField: '123',
  left: 321
}, ['backendField'])
/*
{
  backendField: "123"
}
*/
```

#### pickReverseData\<T\>(data, keys): T

将后端的数据转换成前端要的数据

|参数名|类型|必选|说明|
|:---- |:--   |:---|:----- |
|data |object| 是 | 第几页，默认 1 |
|keys |string[]| 否 | 需要的数据，注意是转换后的数据的key值 |

> 返回值: `object` 转换后的数据

**示例**

```javascript
import InterfaceBridge from 'interface-bridge';
const map = {
  frontendField: 'backendField',
  left: 'right',
  abc: 'ABC'
}

const bridge = new InterfaceBridge(map)

bridge.pickReverseData({
  backendField: '123',
  right: 321
})
/*
{
  abc: undefined,
  frontendField: "123",
  left: 321
}
*/
bridge.omitReverseData({
  backendField: '123',
  right: 321
}, ['frontendField'])
/*
{
  frontendField: "123"
}
*/
```
