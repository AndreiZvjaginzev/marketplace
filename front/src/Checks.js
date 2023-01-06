let checks =[
    {
        triggers:['email', 'password', 'name', 'text'],
        minValue: 3,
        f:function (value){
            this.msg = `Минимальная длина поля ${this.minValue} символа`;
            return (value.length < this.minValue)
                        ? {result: false, msg: this.msg}
                        : {result: true};
        },
        msg:""
    },
    {
        triggers:['email'],
        f:function (value){
            var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            
            return (!reg.test(value))
                        ? {result: false, msg: this.msg}
                        : {result: true};
        },
        msg: "Не корректный email"
    },
    {
        triggers:['password', 'name'],
        maxValue: 7,
        f:function(value){
            this.msg = `Максимальная длина поля ${this.maxValue} символов`;
            return (value.length  > this.maxValue)
                        ? {result: false, msg: this.msg}
                        : {result: true};
        },
        msg:""
    },
    {
        triggers:['text'],
        maxValue: 1200,
        f:function(value){
            this.msg = `Максимальная длина поля ${this.maxValue} символов`;
            return (value.length  > this.maxValue)
                        ? {result: false, msg: this.msg}
                        : {result: true};
        },
        msg:""
    },
    {
        triggers:['file'],
        fileType: 'jpeg',
        f:function(value){
            this.msg = `Тип файла должен быть ${this.fileType}`;
            return (value.type !== 'image/'+this.fileType)
                        ? {result: false, msg: this.msg}
                        : {result: true};
        },
        msg:""
    }
];


export default checks;
