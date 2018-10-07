const fs = require('fs');

// fs.open('test.html', 'w', (err, fd) => {
//     fs.writeFile(fd, '嗨嗨嗨哈哈哈~', 'utf8',(err)=>{
//         if (err) throw err;
//         fs.closefd;
//         console.logfd;
//     });
// });


// const f1 = () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(resolve, 1000, 'f1-okok');
//     });
// }
// const f2 = (str) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(resolve, 1000, `f2--${str}`);
//     });
// }
// const fn = () => {
//     f1()
//         .then((str) => {
//             console.log(str);
//             // return str;
//             return f2(str);
//         })
//         .then((str) => {
//             console.log(str);
//         });
// }
// // fn();

const openFn = (file, type) => {
    return new Promise((resolv, reject) => {
        fs.open(file, type, (err, fd) => {
            if (err) {
                reject();
            } else {
                resolv(fd);
            }
        });
    });
}
const writeFn = (fd, str) => {
    return new Promise((resolv, reject) => {
        fs.writeFile(fd, str, 'utf8', (err) => {
            // if (err) throw err;
            if (err) {
                reject();
            } else {
                resolv(fd);
            }
        });
    });
}
const rfRun = () => {
    openFn('test.html', 'w')
        .then(fd => {
            // writeFn(fd, 'hi promise async await');
            // return fd;
            return writeFn(fd, 'hi~ promise, async, await.');
        })
        .then(fd => {
            fs.close(fd);
        });
}
rfRun();