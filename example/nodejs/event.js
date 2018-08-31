const EventEmitter = require('events');

class MyEmitter extends EventEmitter { }

// 绑定事件
function bind() {
    const e = new MyEmitter();
    // 绑定事件
    e.on('eventOn', a => {
        console.log(a);
    });
    e.emit('eventOn', `on event 1`);
    e.emit('eventOn', `on event 2`);
    // on event 1
    // on event 2

    // 同on
    e.addListener('eventAdd', a => {
        console.log(a);
    });
    e.emit('eventAdd', `add event 1`);
    e.emit('eventAdd', `add event 2`);
    // on event 1
    // on event 2

    // 只触发一次
    e.once('eventOnce', a => {
        console.log(a);
    });
    e.emit('eventOnce', `once event 1`);
    e.emit('eventOnce', `once event 2`);
    // once event 1

}
// bind();


// 监听error事件
function error() {
    const e = new MyEmitter();
    e.on('error', err => {
        console.error(err.message)
    })
    e.on('event', () => {
        e.emit('error', new Error('报错哒'));
    });
    e.emit('event');

    // 报错哒
}
// error();

// newListener事件会监听所有的绑定事件，传入事件名和事件handle，
// 在回调函数中, 一个监听器的名字如果和已有监听器名称相同, 则在被插入到EventEmitter实例的内部监听器数组
// 官网说该监听器会被添加到其它同名监听器的前面。 但是测试结果 绑定bar在newListener前，打印结果A在b之前
function newListener() {
    const e = new MyEmitter();
    e.on('bar', () => {
        console.log('bar: A');
    })
    e.once('newListener', (event, listen) => {
        e.on('foo', () => {
            console.log('添加到foo监听器前: C');
        });
        e.on('bar', () => {
            console.log('添加到bar监听器后: B');
        });
    });
    e.on('foo', () => {
        console.log('foo: A');
    });
    e.emit('bar');
    e.emit('foo');

    // bar: A
    // 添加到bar监听器前: B
    // 添加到foo监听器前: B
    // 添加到foo监听器前: C
    // foo: A

}
// newListener();

// 移除指定的事件句柄函数
function removeListener() {
    const e = new MyEmitter();
    let i = 0;
    function listenOne() {
        console.log(`我监听了event事件 ${++i}`);
    }
    e.on('event', listenOne);
    e.emit('event');
    e.removeListener('event', listenOne);
    e.emit('event');

    // 我监听了event事件 1
}
// removeListener();

// 移除指定事件名的所有句柄
function removeAllListeners() {
    const e = new MyEmitter();
    e.on('event', () => console.log('1'));
    e.on('event', () => console.log('2'));
    e.on('event', () => console.log('3'));
    e.removeAllListeners('event');
    e.emit('event');
    // 

    function e1() { console.log('e1') }
    function e2() { console.log('e2') }
    e.on('event1', e1);
    e.on('event1', e2);
    // removeAllListeners 无视句柄参数
    e.removeAllListeners('event1', e1);
    e.emit('event1');
    // 

    // 一旦一个事件被触发，所有绑定到它的监听器都会按顺序依次触发。 
    // 这意味着，在事件触发后、最后一个监听器完成执行前，任何 removeListener() 或 removeAllListeners() 调用都不会从 emit() 中移除它们。 
    // 随后的事件会像预期的那样发生。
    function e3() {
        console.log('e3')
        // 已经开始执行监听器句柄了， 所以移除事件无效
        e.removeListener('event2', e4);
    }
    function e4() { console.log('e4') };

    e.on('event2', e3);
    e.on('event2', e4);
    e.emit('event2');
    // e3
    // e4
}
// removeAllListeners();

// 每个事件默认可以注册最多 10 个监听器
// 可通过 e.getMaxListeners() 和 e.setMaxListeners()来获取查看实例的监听器数量
// 超过数量回抛出警告
function defaultMaxListeners() {
    const e1 = new MyEmitter();
    console.log(e1.getMaxListeners());
    // 10

    MyEmitter.defaultMaxListeners = 2;
    const e2 = new MyEmitter();
    console.log(e2.getMaxListeners());
    // 2

    e2.on('event', () => {
        console.log('event', 1);
    })
    e2.on('event', () => {
        console.log('event', 2);
    })
    e2.on('event', () => {
        console.log('event', 3);
    });
    e2.emit('event');
    // event 1
    // event 2
    // event 3
    // (node:4087) Warning: Possible EventEmitter memory leak detected. 3 event listeners added. Use emitter.setMaxListeners() to increase limit
}
// defaultMaxListeners();


// 获取注册监听器的事件，以数组形式返回
function eventNames() {
    const e = new MyEmitter();
    e.on('event1', () => console.log('1'));
    e.on('event2', () => console.log('2'));
    const sym = Symbol('event3');
    e.on(sym, () => console.log('3'));
    console.log(e.eventNames());
    // [ 'event1', 'event2', Symbol(event3) ]
}
// eventNames();

// 返回正在监听名为 eventName 的事件的监听器的数量。
function listenerCount() {
    const e = new MyEmitter();
    e.on('event1', () => console.log('1'));
    e.on('event1', () => console.log('2'));
    e.on('event2', () => console.log('3'));
    console.log(e.listenerCount('event1'));
    console.log(e.listenerCount('event2'));
    // 2
    // 1
}
// listenerCount();

// 返回名为 eventName 的事件的监听器数组的副本。
function listeners() {
    const e1 = new MyEmitter();
    e1.on('event', () => console.log('1'));
    console.log(e1.listeners('event'));
    // [ [Function] ]

    const e2 = new MyEmitter();
    e2.on('event', function event() { console.log('1') });
    console.log(e2.listeners('event'));
    // [ [Function: event] ]
}
// listeners();


// 添加一个新的句柄在相同事件名的句柄数组的最前面
function prependListener() {
    const e = new MyEmitter();
    e.on('event', () => console.log('1'));
    e.on('event', () => console.log('2'));
    e.prependListener('event', () => console.log('3'));
    e.emit('event');
    // 3
    // 1
    // 2

    e.once('event2', () => console.log('2-1'));
    e.prependOnceListener('event2', () => console.log('2-2'));
    e.emit('event2');
    // 2-2
    // 2-1
}
// prependListener();

// 返回一个监听 eventName 事件的句柄数组的拷贝，包括任何被包装的事件(例如由.once()创建的事件)。
function rawListeners() {
    const e = new MyEmitter();
    e.on('event', function e1() { console.log('1') });
    e.once('event', function e2() { console.log('2') });
    let raws = e.rawListeners('event');
    console.log(raws);
    // [ [Function: e1],
    //   { [Function: bound onceWrapper] listener: [Function: e2] } ]
    e.emit('event');
    raws[1].listener();
    // 1
    // 2
    // 2
}
rawListeners();