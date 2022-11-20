
<h1>vue-element-plus-admin</h1>

# 开发说明
正常开发即可，增删查改的表格页面可以使用VAD-CLI生成代码

# VAD-CLI相关说明

vad-cli是一个代码生成器，专门生成可供修改的代码，增加开发效率，避免复读无用代码。

## 安装

dart环境/pub：有时候只有安装dart才有pub包管理（而不是仅仅安装flutter就可以）

你需要
```
brew install dart
```

安装vad-cli:
```bash
git clone https://github.com/mjl0602/vad-cli.git
cd vad-cli
bash install.sh
```

## 使用

```bash
# 创建config文件
$ vad config 
# 创建各个模板文件 会创建一个admin.json作为例子
$ vad init -m vue3 
```

```bash
# 生成代码
$ vad build -m vue3 -d admin
```


