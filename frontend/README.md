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
> #E6F1FC : 팝업창 컬러 연한 하늘색;

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
                }).then((response) => {s
                    if (response.status === 200 ) {}
                }, function (err) {
         
                })


#사용중인 event bus 
>this.$EventBus.$emit('ttname',this.ttlists[0].ttname);//처음 show페이지 열었을때 이벤트 버스 default로 첫번째 시간표의 이름을 보냄
>this.$EventBus.$emit('new_tt',userInput);//새로운 시간표 추가될 show 페이지에서 이름 받아오기
> //원본데이터를 timetable_m에 넘김 : 데이터베이스에 업데이트하기 쉽게 하려고
    this.$EventBus.$emit('raw_courses', this.search[key])
