# frontend

> A Vue.js project
>npm run dev로 렌더링..? 컴파일 가능

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

#color
> #225B95 : 진한파랑
> #9CBADF : 연한파랑
> #E6F1FC : 흰 회색
> #FFCA55 : 노랑
> #FF6D00 : 주황

#eventbus
this.$EventBus.$emit('add_a','add all subject');

 created(){
                this.$EventBus.$on('add_a',function(text){
                    console.log(text);
                })
                
            }
#send by http
this.$http.post('/api/login', {
    id :  this.$session.get('name')
                }).then((response) => {
                    if (response.status === 200 ) {}
                }, function (err) {
         
                })


