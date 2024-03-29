class _LazyMan {
    name: string;
    tasks: Function[];
    constructor(name: string) {
        this.name = name;
        this.tasks = [
            () => {
                console.log(`this is ${name}! `);
                this.next();
            },
        ];

        setTimeout(() => {
            this.next();
        });
    }

    next() {
        if (this.tasks.length > 0) {
            const task = this.tasks.shift();
            task && task();
        }
    }

    eat(food: string) {
        const task = () => {
            console.log(`${this.name} eat ${food}`);
            this.next();
        };
        this.tasks.push(task);
        return this;
    }

    sleep(time: number) {
        const task = () => {
            setTimeout(() => {
                console.log("wake up after " + time * 1000);
                this.next();
            }, time * 1000);
        };
        this.tasks.push(task);
        return this;
    }

    sleepFirst(time: number) {
        const task = () => {
            setTimeout(() => {
                console.log("wake up after " + time * 1000);
                this.next();
            }, time * 1000);
        };
        this.tasks.unshift(task);
        return this;
    }
}

const LazyMan2 = function (name: string) {
    return new _LazyMan(name);
};

LazyMan2("pp")
    .eat("apple")
    .sleepFirst(2)
    .eat("banana")
    .sleep(3)
    .eat("grape")
    .sleep(1);

/**
 * @description lazy man
 * @author 双越老师
 */

class LazyMan {
    private name: string;
    private tasks: Function[] = []; // 任务列表

    constructor(name: string) {
        this.name = name;

        setTimeout(() => {
            this.next();
        });
    }

    private next() {
        const task = this.tasks.shift(); // 取出当前 tasks 的第一个任务
        if (task) task();
    }

    eat(food: string) {
        const task = () => {
            console.info(`${this.name} eat ${food}`);
            this.next(); // 立刻执行下一个任务
        };
        this.tasks.push(task);

        return this; // 链式调用
    }

    sleep(seconds: number) {
        const task = () => {
            console.info(`${this.name} 开始睡觉`);
            setTimeout(() => {
                console.info(
                    `${this.name} 已经睡完了 ${seconds}s，开始执行下一个任务`
                );
                this.next(); // xx 秒之后再执行下一个任务
            }, seconds * 1000);
        };
        this.tasks.push(task);

        return this; // 链式调用
    }
}

const me = new LazyMan("双越");
me.eat("苹果")
    .eat("香蕉")
    .sleep(2)
    .eat("葡萄")
    .eat("西瓜")
    .sleep(2)
    .eat("橘子");
