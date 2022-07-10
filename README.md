### Project setup
```
npm install
```

### Lints and fixes files
```
npm run lint
```

### Compiles and minifies for production
```
npm run build
```

### Compiles and hot-reloads for development
```
npm run serve
```


## Docker + Jenkins
![image](https://user-images.githubusercontent.com/52047119/178133039-e0bbcb5b-c4be-4acd-b9d9-3fbd1893a9e9.png)

### Prepare
* Docker: Docker version 20.10.12
* VMware
* Ubuntu: version 20.04
* node: version 14.20
* vue: version @vue/cli 5.0.8

### Pull image
```
docker pull jenkins/jenkins:jdk11
```

### Start container
```
docker run -u root  \
    -d \
    -p 9999:8080  \
    -p 50000:50000  \
    -v /var/jenkins_home:/var/jenkins_home \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v /usr/bin/docker:/usr/bin/docker \
    -v /etc/hosts:/etc/hosts \
    -v /app/maven/apache-maven-3.8.6:/app/maven/apache-maven-3.8.6 \
    -v /root/.m2:/root/.m2 \
    -e TZ='Asia/Shanghai' \
    --name dp-jenkins \
    jenkins/jenkins:jdk11
```


### Open up website
```
localhost:80
```
