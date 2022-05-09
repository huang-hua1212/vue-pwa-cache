# 參考 https://israynotarray.com/vue/20200214/1055437216/
#!/usr/bin/env sh

# 發生錯誤時執行終止指令
set -e

# 打包編譯
npm run build

# 移動到打包資料夾下，若你有調整的話打包後的資料夾請務必調整
cd dist



# 部署到自定義網域
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 部署到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
# 以這個專案來講就要改成這樣以下這樣，下面是走 ssh 模式
# git push -f git@github.com:huang-hua1212/VueSpringClass_vuecli_version1.git master:gh-pages
# 除此之外，也可以改走 HTTPS 模式
#master: 現正之節點; gh-pages:新增之節點
git push -f https://github.com/huang-hua1212/node-spring-class_mid.git master:gh-pages

cd -