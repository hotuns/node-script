#!/usr/bin / env node

// 批量重命名目录下文件
// 如果要作为执行脚本启动, chmod 755 xxxx ,给个权限就可以

const readline = require('readline')
const fs = require('fs')
const path = require('path')
const util = require('./util')


let dir_path = './'  //文件夹地址
let ext = 'txt'  //后缀名

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})



/**
 * 批量修改后缀名
 * @param {String} dir 路径
 * @param {String} ext 扩展名
 */
const reName = (dir, ext) => {
    const dir_path = path.resolve(dir)
    const fileList = fs.readdirSync(dir_path)
    for (let i = 0; i < fileList.length; i++) {
        let file = fileList[i]
        file = path.join(dir, file)
        if (util.isFile(file)) {
            let parsed = path.parse(file)
            let newFileName = parsed.name + ext
            try {
                fs.renameSync(file, path.join(parsed.dir, newFileName))
                console.log(`${file} ========> ${path.join(parsed.dir, newFileName)}`);
            } catch (error) {
                throw (error)
            }
        }
    }
    console.log('done')
}


rl.question(`请输入文件夹地址: `, res1 => {
    console.log(`文件夹地址是: ${res1}!`)
    dir_path = res1

    rl.question(`要将后缀名都改成什么: `, res2 => {
        if (res2.startsWith('.')) {
            ext = res2
        } else {
            ext = '.' + res2
        }


        rl.question(`是否把 ${dir_path} 下的全部文件的后缀都改成 ${ext} yes(y) or no(n) : `, res3 => {
            if (res3 == 'yes' || res3 == 'y') {
                reName(dir_path, ext)

                rl.close()
            } else if (res3 == 'no' || res3 == 'n') {
                console.log('exit')
                rl.close()
            }
        })
    })
})


